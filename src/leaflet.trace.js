import "./Leaflet.AlmostOver/src/leaflet.almostover.js";
import "./leaflet-draw-toolbar/leaflet.draw-toolbar.js";
import "./leaflet-draw-toolbar/leaflet.draw-toolbar.css";
import {line, select, unselect, select2} from './icons'
import {
  polygon as turfPoly,
  lineString as turfLineString,
  multiLineString as turfMultiLineString,
} from "@turf/helpers";

import booleanIntersects from "@turf/boolean-intersects";

/**
 * @class L.Draw.Trace
 * @aka Draw.Trace
 * @inherits L.Draw.Trace
 */
L.Draw.Trace = L.Draw.Polyline.extend({
  statics: {
    TYPE: "trace",
  },
  //TODO i only want to edit shapeOptions, the rest need not be copied over
  options: {
    allowIntersection: true,
    repeatMode: false,
    drawError: {
      color: "#b00b00",
      timeout: 2500,
    },
    icon: new L.DivIcon({
      iconSize: new L.Point(8, 8),
      className: "leaflet-div-icon leaflet-editing-icon",
    }),
    touchIcon: new L.DivIcon({
      iconSize: new L.Point(20, 20),
      className: "leaflet-div-icon leaflet-editing-icon leaflet-touch-icon",
    }),
    guidelineDistance: 20,
    maxGuideLineLength: 4000,
    shapeOptions: {
      stroke: true,
      color: "red",
      weight: 4,
      opacity: 0.5,
      fill: false,
      clickable: true,
    },
    metric: true, // Whether to use the metric measurement system or imperial
    feet: true, // When not metric, to use feet instead of yards for display.
    nautic: false, // When not metric, not feet use nautic mile for display
    zIndexOffset: 2000, // This should be > than the highest z-index any map layers
    factor: 1, // To change distance calculation
    maxPoints: 0, // Once this number of points are placed, finish shape
  },
  // @method initialize(): void
  initialize: function (map, options) {
    L.Draw.Polyline.prototype.initialize.call(this, map, options);
    this.type = L.Draw.Trace.TYPE;
    this.options.drawError.message = "You must draw over the selected line.";
    //TODO: Not sure if this ill interfere with other polyline drawing
  },

  addHooks: function () {
    L.Draw.Polyline.prototype.addHooks.call(this);
    this.almostLatLng = false;

    this._map
      .on("almost:move", this._almostMove, this)
      .on("almost:out", this._almostOut, this);

    //TODO: sort how to store layer id and select more nicely here
    let s;
    this._map.eachLayer(function (layer) {
      if (layer.options.name && layer.options.name == "selected") {
        s = layer;
      }
    });
    this.selected = s;
    this.lineType = s.options.lineType;
    if (this.lineType == "MultiLineString") {
      this.getSegments(s);
    }
  },
  getSegments: function (s) {
    this.segments = s.getLatLngs().map((ll) => L.polyline(ll));
  },
  removeHooks: function () {
    L.Draw.Polygon.prototype.removeHooks.call(this);
    delete this.selected;
    delete this.almostLatLng;
    delete this.startRatio;
    delete this.linestart;
    delete this._clickHandled;
    delete this._disableMarkers;
    delete this.segments;
    delete this.closest;
    delete this.lineType;
    this._map
      .off("almost:move", this._almostMove, this)
      .off("almost:out", this._almostOut, this);
  },
  _almostOut: function (e) {
    this.almostLatLng = false;
  },
  _almostMove: function (e) {
    this.almostLatLng = e.latlng;
  },
  // @method addVertex(): void
  // Add a vertex to the end of the polyline
  addVertex: function (latlng) {
    const markersLength = this._markers.length;

    // markersLength must be greater than or equal to 2 before intersections can occur && must have latlng from drawing along selected
    if (
      (markersLength >= 2 &&
        !this.options.allowIntersection &&
        this._poly.newLatLngIntersects(latlng)) ||
      !latlng
    ) {
      this._showErrorTooltip();
      return;
    } else if (this._errorShown) {
      this._hideErrorTooltip();
    } else {
      //get the line ratio of the current point, and generate all points needed to draw line
      const endRatio = L.GeometryUtil.locateOnLine(
        this._map,
        this.closest,
        this.almostLatLng
      );
      const extraction = L.GeometryUtil.extract(
        this._map,
        this.closest,
        this.startRatio,
        endRatio
      );

      this._markers = extraction.map((e) => this._createMarker(e)); //create new marker list, which is added to the map
      this._poly.setLatLngs(extraction); //set the points of the line

      if (this._poly.getLatLngs().length === 2) {
        this._map.addLayer(this._poly);
      }

      this._vertexChanged(latlng, true);
    }
  },
  _onMouseMove: function (e) {
    L.Draw.Polyline.prototype._onMouseMove.call(this, e);
    //add a vertex on mouse move if slready drawing started
    if (this.lineStart) {
      this.addVertex(this.almostLatLng);
    }
  },
  _onMouseDown: function (e) {
    if (
      !this._clickHandled &&
      !this._touchHandled &&
      !this._disableMarkers &&
      this.almostLatLng != false
    ) {
      this._map.dragging.disable();
      this._onMouseMove(e);
      this._clickHandled = true;
      this._disableNewMarkers();
      this.lineStart = true;
      this.closest = this._setClosest();
      this.startRatio = L.GeometryUtil.locateOnLine(
        this._map,
        this.closest,
        this.almostLatLng
      );
      this._startPoint.call(this, this.almostLatLng.lng, this.almostLatLng.lat);
    }
  },
  _latlngToArray: function (lls) {
    if (Array.isArray(lls)) return lls.map((ll) => this._latlngToArray(ll));
    else return [lls.lng, lls.lat];
  },
  _setClosest: function () {
    if (this.lineType == "LineString") {
      return this.selected;
    } else {
      return L.GeometryUtil.closestLayer(
        this._map,
        this.segments,
        this.almostLatLng
      ).layer;
    }
  },

  _onMouseUp: function (e) {
    L.Draw.Polyline.prototype._onMouseUp.call(this, e);
    this._map.dragging.enable();
    this.lineStart = false;
  },

  //TODO: this function is an absolute mess and i need to address it
  _endPoint: function (e) {
    if (this._mouseDownOrigin) {
      this.addVertex(e.latlng);
      this._finishShape();
      //TODO: I disabled all of this and kept the parts of the code that allow the line to end
      // I need to spend more time looking at this to make sure there isn't something here I need, especially in regards to touch scree stuff

      // if (this._mouseDownOrigin) {
      // 	var dragCheckDistance = L.point(clientX, clientY)
      // 		.distanceTo(this._mouseDownOrigin);
      // 	var lastPtDistance = this._calculateFinishDistance(e.latlng);
      // 	if (this.options.maxPoints > 1 && this.options.maxPoints == this._markers.length + 1) {
      // 		this.addVertex(e.latlng);
      // 		this._finishShape();
      // 	} else if (lastPtDistance < 10 && L.Browser.touch) { //TODO: need to keep this in some form for touch screens???
      // 		this._finishShape();
      // 	} else if (Math.abs(dragCheckDistance) < 9 * (window.devicePixelRatio || 1)) {
      // 		this.addVertex(e.latlng);
      // 	}
      // 	this._enableNewMarkers(); // after a short pause, enable new markers
      // }
      this._enableNewMarkers(); // after a short pause, enable new markers
    }
    this._mouseDownOrigin = null;
  },
  _createMarker: function (latlng) {
    var marker = new L.Marker(latlng, {
      icon: this.options.icon,
      zIndexOffset: this.options.zIndexOffset * 2,
    });
    return marker;
  },
  _updateRunningMeasure: function (latlng, added) {
    var markersLength = this._markers.length,
      previousMarkerIndex,
      distance;

    if (this._markers.length === 1) {
      this._measurementRunningTotal = 0;
    } else {
      previousMarkerIndex = markersLength - (added ? 2 : 1);

      // Calculate the distance based on the version
      if (L.GeometryUtil.isVersion07x()) {
        distance =
          latlng.distanceTo(this._markers[previousMarkerIndex].getLatLng()) *
          (this.options.factor || 1);
      } else {
        distance =
          this._map.distance(
            latlng,
            this._markers[previousMarkerIndex].getLatLng()
          ) * (this.options.factor || 1);
      }

      this._measurementRunningTotal += distance * (added ? 1 : -1);
    }
  },
});

/**
 * @class L.Draw.Select
 * @aka Draw.Select
 * @inherits L.Draw.Rectangle
 */
L.Draw.Select = L.Draw.Rectangle.extend({
  statics: {
    TYPE: "select",
  },

  initialize: function (map, options) {
    // Save the type so super can fire, need to do this as cannot do this.TYPE :(
    L.Draw.Rectangle.prototype.initialize.call(this, map, options);
    this._map = map;
    this._initialLabelText = "Click and drag to select a line.";

    this.type = L.Draw.Select.TYPE;
  },

  // @method addHooks(): void
  // Add listener hooks to this handler.
  addHooks: function () {
    L.Draw.Rectangle.prototype.addHooks.call(this);
    //TODO: make more elegant if i can
    let s;
    this._map.eachLayer(function (layer) {
      if (layer.options.name && layer.options.name == "selected") {
        s = layer;
      }
    });
    this.selected = s;

    // this.selectedItem = new L.FeatureGroup().addTo(this._map);
    this._map.on(L.Draw.Event.CREATED, this._created, this);
  },
  enableSelect: function () {
    const button = document.getElementsByClassName("trace-line")[0];
    button.onClick = null;
    button.className = "trace-line leaflet-toolbar-icon";
  },

  removeHooks: function () {
    L.Draw.Rectangle.prototype.removeHooks.call(this);
    delete this.selected;
    this._map.off(L.Draw.Event.CREATED, this._created, this);
  },
  _latlngToArray: function (lls) {
    if (Array.isArray(lls)) return lls.map((ll) => this._latlngToArray(ll));
    else return [lls.lng, lls.lat];
    // });
  },

  _created: function (e) {
    //create turfjs compatible feature from drawn rectangle
    const latlngs = this._latlngToArray(e.layer.getLatLngs());
    latlngs[0].push(latlngs[0][0]); //add first pair to back to satisfy turf.js

    const selectPoly = turfPoly(latlngs);
    //search map for a selectable layer
    this._map.eachLayer((layer) => {
      if (layer.options.selectable) {
        this._manageSelect(selectPoly, layer);
      }
    });
  },

  //run query to select feature on rectangle draw
  _manageSelect: function (rect, selectable) {
    if (this.selected) {
      this._map.almostOver.removeLayer(this.selected);
      this._map.removeLayer(this.selected);
    }
    let selected;

    selectable.eachLayer((layer) => {
      let line = this._grabTurfLine(layer);

      if (line) {
        const intersect = booleanIntersects(rect, line);
        if (intersect) {
          selected = layer;
        }
      }
    });
    if (selected) {
      this._drawSelect(selected);
    }
  },
  //convert layer into a turf line type
  _grabTurfLine: function (layer) {
    const lineType = layer.feature.geometry.type;
    const latlngs = this._latlngToArray(layer.getLatLngs());
    if (lineType == "LineString") {
      return turfLineString(latlngs);
    } else if (lineType == "MultiLineString") {
      return turfMultiLineString(latlngs);
    }
    return line;
  },

  _drawSelect: function (selected) {
    let properties = {};
    if (selected.feature.properties) {
      properties = selected.feature.properties;
    }
    this.selected = L.polyline(selected.getLatLngs(), {
      weight: 4,
      color: "gold",
      name: "selected",
      lineType: selected.feature.geometry.type,
      properties: properties,
    }).addTo(this._map);
    this._map.addLayer(this.selected);
    this._map.almostOver.addLayer(this.selected);
    this.enableSelect();
  },
});

//see if i can run disable select elsewhere
L.Toolbar2.DrawAction.CancelTrace = L.Toolbar2.DrawAction.Cancel.extend({
  initialize: function () {
    disableSelect(); //diable select on draw button here because this is the first place where it's alrady initalized
    L.Toolbar2.DrawAction.Cancel.prototype.initialize.call(this);
  },
});

L.Toolbar2.DrawAction.Trace = L.Toolbar2.DrawAction.fromHandler(
  L.Draw.Trace,
  {
    className: "leaflet-draw-draw-polyline",
    tooltip: L.drawLocal.draw.toolbar.buttons.polyline,
  },
  new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.CancelTrace] })
).extend({
  options: {
    toolbarIcon: {
      className: "trace-line",
      html: line,
      tooltip: "Draw a line",
    },
  },
});

L.Toolbar2.DrawAction.Select = L.Toolbar2.DrawAction.fromHandler(
  L.Draw.Select,
  {
    className: "leaflet-draw-draw-rectangle",
    tooltip: L.drawLocal.draw.toolbar.buttons.rectangle,
  },
  new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.Cancel] })
).extend({
  options: {
    toolbarIcon: {
      html: select,
      tooltip: "Select a line",
    },
  },
});

L.Toolbar2.DrawAction.RemoveSelect = L.Toolbar2.Action.extend({
  options: {
    toolbarIcon: {
      html: unselect,
      tooltip: "Un-select the line",
    },
  },
  initialize: function (map) {
    this._map = map;

    L.Toolbar2.Action.prototype.initialize.call(this);
  },

  addHooks: function () {
    let s;
    this._map.eachLayer(function (layer) {
      if (layer.options.name && layer.options.name == "selected") {
        s = layer;
      }
    });
    this.selected = s;

    if (this.selected) {
      this._map.almostOver.removeLayer(this.selected);
      this._map.removeLayer(this.selected);
      disableSelect();
    }
  },
});

L.Toolbar2.Trace = L.Toolbar2.Control.extend({
  options: {
    actions: [
      L.Toolbar2.DrawAction.Select,
      L.Toolbar2.DrawAction.RemoveSelect,
      L.Toolbar2.DrawAction.Trace
    ],
  },
});

const disableSelect = () => {
  const button = document.getElementsByClassName("trace-line")[0];

  // disable button
  button.onClick = "preventEventDefault(); return false";
  button.className = "trace-line leaflet-toolbar-icon draw-control-disabled";
};
