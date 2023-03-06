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
      (markersLength >= 2 && !this.options.allowIntersection && this._poly.newLatLngIntersects(latlng)) || !latlng) {
      this._showErrorTooltip();
      return;
    } else if (this._errorShown) {
      this._hideErrorTooltip();
    } else {

      //get the line slice from the start point and current point,
      //generate all points needed to draw line
      const stop = turf.point([this.almostLatLng.lng, this.almostLatLng.lat]);
      const latlngs = this._latlngToArray(this.closest.getLatLngs());
      const line = turf.lineString(latlngs)
      const slice = turf.lineSlice(this.start, stop, line);
      const latLngs= slice.geometry.coordinates.map(ll => L.latLng(ll[1], ll[0])); 

      this._markers = latLngs.map((e) => this._createMarker(e)); //create new marker list, which is added to the map
      this._poly.setLatLngs(latLngs); //set the points of the line

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
    if (!this._clickHandled && !this._touchHandled && !this._disableMarkers && this.almostLatLng != false) {
      this._map.dragging.disable();
      this._onMouseMove(e);
      this._clickHandled = true;
      this._disableNewMarkers();
      this.lineStart = true;
      this.closest = this._setClosest();
      this.start = turf.point([this.almostLatLng.lng, this.almostLatLng.lat]);
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

 /**
   * TODO: there is some mysterious logic in the origial _endPoint from Draw.Polyline regarding
   * drag Check Ditance and window.devicePixelRatio that I haven't taken the trouble to understand
   * if there are issues down the line that could be the cause 
   **/
 _endPoint: function (_clientX, _clientY, _e) {
  if (this._mouseDownOrigin) {
    this._finishShape();
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
  _updateRunningMeasure: function (_latlng, _added) {
    this._measurementRunningTotal = 0;
    if (this._markers.length > 1) {    
      // Calculate the length of the line from the existing markers
      for (let i = 1; i < this._markers.length; i++){
        this._measurementRunningTotal += this._map.distance(this._markers[i-1].getLatLng(), this._markers[i].getLatLng()) * (this.options.factor || 1);
      }
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
    this.options.showArea = false
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
  _enableSelect: function () {
    const button = document.getElementsByClassName("leaflet-draw-draw-trace")[0];
    if(button){
      button.className = "leaflet-draw-draw-trace-active";
    }

  },
  removeHooks: function () {
    L.Draw.Rectangle.prototype.removeHooks.call(this);
    delete this.selected;
    this._map.off(L.Draw.Event.CREATED, this._created, this);
  },
  _latlngToArray: function (lls) {
    if (Array.isArray(lls)) return lls.map((ll) => this._latlngToArray(ll));
    else return [lls.lng, lls.lat];
  },

  _created: function (e) {
    //create turfjs compatible feature from drawn rectangle
    const latlngs = this._latlngToArray(e.layer.getLatLngs());
    latlngs[0].push(latlngs[0][0]); //add first pair to back to satisfy turf.js

    const selectPoly = turf.polygon(latlngs);
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
        const intersect = turf.booleanIntersects(rect, line);
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
      return turf.lineString(latlngs);
    } else if (lineType == "MultiLineString") {
      return turf.multiLineString(latlngs);
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
    this._enableSelect();
  },
});

/**
 * @class L.Draw.Unselect
 * @aka Draw.Unselect
 */
L.Draw.Unselect = L.Handler.extend({
  statics: {
    TYPE: "unselect",
  },
	// @method initialize(): void
	initialize: function (map, options) {
		this._map = map;
    this.type = L.Draw.Unselect.TYPE;
		L.setOptions(this, options);

		var version = L.version.split('.');
		//If Version is >= 1.2.0
		if (parseInt(version[0], 10) === 1 && parseInt(version[1], 10) >= 2) {
			L.Draw.Unselect.include(L.Evented.prototype);
		} else {
			L.Draw.Unselect.include(L.Mixin.Events);
		}
	},
  disableSelect: function(){
    const button = document.getElementsByClassName("leaflet-draw-draw-trace-active")[0];
    if(button){
      button.className = "leaflet-draw-draw-trace";
    }
  },
  unselect: function(){
    if (this.selected) {
      this._map.almostOver.removeLayer(this.selected);
      this._map.removeLayer(this.selected);
      this.disableSelect();
    }
  },
	// @method addHooks(): void
	// Add's event listeners to this handler
	addHooks: function () {
    if(this._map){
      let s;
      this._map.eachLayer(function (layer) {
        if (layer.options.name && layer.options.name == "selected") {
          s = layer;
        }
      });
      this.selected = s;
    }
    this.unselect()
	},

	// @method removeHooks(): void
	// Removes event listeners from this handler
	removeHooks: function () {
		if (this._map) {
			delete this.selected;
		}
	},
});

/**
 * @class L.TraceToolbar
 */
L.TraceToolbar = L.Toolbar.extend({
  statics: {
		TYPE: 'trace'
	},
  options: {
    select: {},
    unselect: {},
    trace: {}
  },
  initialize: function (options) {
		// Ensure that the options are merged correctly since L.extend is only shallow
		for (var type in this.options) {
			if (this.options.hasOwnProperty(type)) {
				if (options[type]) {
					options[type] = L.extend({}, this.options[type], options[type]);
				}
			}
		}

		this._toolbarClass = 'leaflet-draw-draw';
		L.Toolbar.prototype.initialize.call(this, options);
	},

  getModeHandlers: function (map) {
		return [
      {
        enabled: true,
        handler: new L.Draw.Select(map),
        title: "Select a line to trace",
      },
      {
        enabled: true,
        handler: new L.Draw.Unselect(map),
        title: "Remove line selection",
      },
      {
        enabled: true,
        handler: new L.Draw.Trace(map),
        title: "Trace a line",
      },
		];
	},
  getActions: function (handler) {
		return [
			{
        enabled: handler.type == 'unselect' ? false : true,
				title: L.drawLocal.draw.toolbar.actions.title,
				text: L.drawLocal.draw.toolbar.actions.text,
				callback: this.disable,
				context: this
			}
		];
	},
});


/**
 * @class L.Control.Trace
 */
L.Control.Trace = L.Control.Draw.extend({
  initialize: function (options) {
		if (L.version < '0.7') {
			throw new Error('Leaflet.draw 0.2.3+ requires Leaflet 0.7.0+. Download latest from https://github.com/Leaflet/Leaflet/');
		}

		L.Control.prototype.initialize.call(this, options);

		var toolbar;

		this._toolbars = {};
    if (L.TraceToolbar && this.options.trace) {
      
      toolbar = new L.TraceToolbar(this.options.draw);

      this._toolbars[L.TraceToolbar.TYPE] = toolbar;

      // Listen for when toolbar is enabled
      this._toolbars[L.TraceToolbar.TYPE].on('enable', this._toolbarEnabled, this);
    }

		// Initialize toolbars
		if (L.DrawToolbar && this.options.draw) {
			toolbar = new L.DrawToolbar(this.options.draw);

			this._toolbars[L.DrawToolbar.TYPE] = toolbar;

			// Listen for when toolbar is enabled
			this._toolbars[L.DrawToolbar.TYPE].on('enable', this._toolbarEnabled, this);
		}

		if (L.EditToolbar && this.options.edit) {
			toolbar = new L.EditToolbar(this.options.edit);

			this._toolbars[L.EditToolbar.TYPE] = toolbar;

			// Listen for when toolbar is enabled
			this._toolbars[L.EditToolbar.TYPE].on('enable', this._toolbarEnabled, this);
		}
		L.toolbar = this; //set global var for editing the toolbar
	},
})
