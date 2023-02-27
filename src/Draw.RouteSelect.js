
import {
  polygon as turfPoly,
  lineString as turfLineString,
  multiLineString as turfMultiLineString,
} from "@turf/helpers";

import booleanIntersects from "@turf/boolean-intersects";
/**
 * @class L.Draw.Select
 * @aka Draw.Select
 * @inherits L.Draw.Rectangle
 */
L.Draw.RouteSelect = L.Draw.Rectangle.extend({
  statics: {
    TYPE: "select",
  },
  //   query: L.esri.query({
  //     //TODO: see if there's a way to get this url from the map ??
  //     url: "https://maps.udot.utah.gov/randh/rest/services/PrimaryRoutes/MapServer/0",
  //   }),

  initialize: function (map, options) {
    // Save the type so super can fire, need to do this as cannot do this.TYPE :(
    L.Draw.Rectangle.prototype.initialize.call(this, map, options);
    this._map = map;
    this._initialLabelText = "Click and drag to select a route.";

    this.type = L.Draw.RouteSelect.TYPE;
  },

  // @method addHooks(): void
  // Add listener hooks to this handler.
  addHooks: function () {
    L.Draw.Rectangle.prototype.addHooks.call(this);
    this.queryURL =
      "https://maps.udot.utah.gov/randh/rest/services/PrimaryRoutes/MapServer/0";

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
    const button = document.getElementsByClassName("draw-route")[0];
    button.onClick = null;
    button.className = "draw-route leaflet-toolbar-icon";
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
