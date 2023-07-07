/**
 * @class L.Draw.Trace
 * @aka Draw.Trace
 * @inherits L.Draw.Trace
 */ 

L.Draw.Trace = L.Draw.Polyline.extend({
  statics: {
    TYPE: "trace",
  },
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
  },

  addHooks: function () {
  this.mapContainer = document.getElementById(this._map._container.id);

  
    L.Draw.Polyline.prototype.addHooks.call(this);
    this.almostLatLng = false;

    this._map
      .on("almost:move almost:touchstart", this._almostMove, this)
      .on("almost:out", this._almostOut, this)
      .on("touchend touchcancel", this._onTouchEnd, this)
    this.mapContainer
      .addEventListener("mouseleave", ()=>{this._onMouseLeave(this)})
     
  
  },

  removeHooks: function () {
    L.Draw.Polygon.prototype.removeHooks.call(this);
    delete this.almostLatLng;
    delete this.linestart;
    delete this._clickHandled;
    delete this._touchHandled;
    delete this._disableMarkers;
    delete this.closest;
    this._map
      .off("almost:move almost:touchstart", this._almostMove, this)
      .off("almost:out", this._almostOut, this)
      .off("touchend touchcancel", this._onTouchEnd, this)
      
    this.mapContainer
      .removeEventListener("mouseleave", ()=>{this._onMouseLeave(this)})
    delete this.mapContainer;
  },
  _almostOut: function (_e) {
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
      const slice = turf.lineSlice(this.start, stop, this.closest);
      const latLngs = slice.geometry.coordinates.map(ll => L.latLng(ll[1], ll[0])); 

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
    //add a vertex on mouse move if already drawing started
    if (this.lineStart) {
      this.addVertex(this.almostLatLng);
    }
  },
  _onMouseDown: function (e) {
    if (!this._clickHandled && !this._touchHandled && !this._disableMarkers && this.almostLatLng != false) {
      this._onMouseMove(e);
      this._clickHandled = true;
      this.startDraw()
    }
  },
  _latlngToArray: function (lls) {
    if (Array.isArray(lls)) return lls.map((ll) => this._latlngToArray(ll));
    else return [lls.lng, lls.lat];
  },

  startDraw: function() {
    this._map.dragging.disable();
    this._disableNewMarkers();
    this.lineStart = true;
  
    this.start = turf.point([this.almostLatLng.lng, this.almostLatLng.lat]);
    this.closest = this._map.almostOver.getClosest(this.almostLatLng).closestLine;
    this._startPoint.call(this, this.almostLatLng.lng, this.almostLatLng.lat);
  },
  
  _onMouseUp: function (e) {
    L.Draw.Polyline.prototype._onMouseUp.call(this, e);

    this._map.dragging.enable();
    this.lineStart = false;
  },
  _onMouseLeave: function (trace){
    trace._endPoint.call(trace);
    trace._map.dragging.enable();
    trace.lineStart = false;
  },

  _onTouchMove: function (e) {
    console.log(e)
    const newPos = this._map.mouseEventToLayerPoint(e.originalEvent.touches[0]);
		const	latlng = this._map.layerPointToLatLng(newPos);

    this._currentLatLng = latlng;
    this._updateTooltip(latlng);
    this._updateGuide(newPos);
    L.DomEvent.preventDefault(e.originalEvent);
		
    if (this.lineStart) {
      this.addVertex(this.almostLatLng);
    }
		
  },

  _onTouchEnd: function(e){
    //TODO: see mouseup
    this._map.dragging.enable();
    this.lineStart = false;
  },

  _onTouch: function (e) {
		const originalEvent = e.originalEvent;
		if (originalEvent.touches && originalEvent.touches[0] && !this._clickHandled && !this._touchHandled && !this._disableMarkers && this.almostLatLng != false) {
      this._touchHandled = true;
      this._onTouchMove(e)
			this.startDraw()
		}
		this._clickHandled = null;
	},

  _getTooltipText: function () {
		var showLength = this.options.showLength,
			labelText, distanceStr;
		if (this._markers.length === 0) {
			labelText = {
				text: L.drawLocal.draw.handlers.polyline.tooltip.start
			};
		} else {
			distanceStr = showLength ? this._getMeasurementString() : '';

			if (this._markers.length === 1) {
				labelText = {
					text: L.drawLocal.draw.handlers.polyline.tooltip.cont,
					subtext: distanceStr
				};
			} else {
				labelText = {
					text: "Drag mouse to draw line, release to end",
					subtext: distanceStr
				};
			}
		}
		return labelText;
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
 * @class L.Draw.TraceMarker
 * @aka Draw.TraceMarker
 * @inherits L.Draw.Marker
 */
L.Draw.TraceMarker = L.Draw.CircleMarker.extend({
  
  addHooks: function () {
    L.Draw.Marker.prototype.addHooks.call(this);
    this.almostLatLng = false;
    this._initialLabelText = this.options.farText;
    this._map
      .on("almost:move", this._almostMove, this)
      .on("almost:out", this._almostOut, this)
    },
  
    removeHooks: function () {
      L.Draw.Marker.prototype.removeHooks.call(this);
      delete this.almostLatLng;
      
      this._map
        .off("almost:move", this._almostMove, this)
        .off("almost:out", this._almostOut, this)
    },
    _almostOut: function (_e) {
      this._initialLabelText = this.options.farText;
      this.almostLatLng = false;
    },
    _almostMove: function (e) {
     
      this._initialLabelText = this.options.nearText;
      this.almostLatLng = e.latlng;
    }, 
    _onMouseMove: function (e) {
      L.Draw.CircleMarker.prototype._onMouseMove.call(this, e);
			this.almostLatLng && this._marker.setLatLng(this.almostLatLng);
	}
}) 

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
    let s;
    this._map.eachLayer(function (layer) {
      if (layer.options.selected) {
        s = layer;
      }
    });
    this.selected = s;
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
  _makePointSelect: function (latlng) {
    const point = turf.point([latlng.lng, latlng.lat])
    const buffer = turf.buffer(point, 0.025, {units: 'kilometers'})
    const bbox = turf.bbox(buffer);
    return turf.bboxPolygon(bbox);
  },

  _rectangleToPoly: function(latlngs) {
    const lls = this._latlngToArray(latlngs)
    lls[0].push(lls[0][0]); //add first pair to back to satisfy turf.js
    return turf.polygon(lls);
  },

  _created: function (e) {
    //create turfjs compatible feature from drawn rectangle
    const selectPoly = this._rectangleToPoly(e.layer.getLatLngs());
    // const latlngs = this._latlngToArray(e.layer.getLatLngs());
    // latlngs[0].push(latlngs[0][0]); //add first pair to back to satisfy turf.js

    // const selectPoly = turf.polygon(latlngs);
    //search map for a selectable layer
    this._map.eachLayer((layer) => {
      if (layer.trace) {
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
      selected: true,
      lineType: selected.feature.geometry.type,
      properties: properties,
    }).addTo(this._map);
    this._map.addLayer(this.selected);
    this._map.almostOver.addLayer(this.selected);
    this._enableSelect();
  },

  _onMouseUp: function (_e) {
    //this is if we click and unclick without moving the mouse, may trigger if we click a line
    if (!this._shape) { 
      const bbox = this._makePointSelect(this._startLatLng).bbox
      this._shape = new L.Rectangle(new L.LatLngBounds(L.latLng(bbox[1], bbox[0]), L.latLng(bbox[3], bbox[2])));
      L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, this._shape);
    }
    L.Draw.SimpleShape.prototype._onMouseUp.call(this);
  },
});

/**
 * @event draw:unselect: String
 *
 * The type of edit this is. One of: `edit`
 *
 * Triggered when the user starts edit mode by clicking the edit tool button.
 */

L.Draw.Event.UNSELECT = 'draw:unselect';
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
      this._map.fire(L.Draw.Event.UNSELECT);
    }
  },
  enable: function () {
    if (this._enabled) {
      return;
    }

    L.Handler.prototype.enable.call(this);

    this.fire("enabled", { handler: this.type });
  },

  // @method disable(): void
  disable: function () {
    if (!this._enabled) {
      return;
    }
    L.Handler.prototype.disable.call(this);
    this.fire("disabled", { handler: this.type });
  },
	// @method addHooks(): void
	// Add's event listeners to this handler
	addHooks: function () {
    if(this._map){
      let s;
      this._map.eachLayer(function (layer) {
        if (layer.options.selected) {
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
      {
        enabled: true,
        handler: new L.Draw.TraceMarker(map),
        title: "Draw a CircleMarker that can snap to a selected line",
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
});

L.Map.mergeOptions({
  // @option almostOver: Boolean = true
  // Set it to false to disable this plugin
  almostOver: true,
  // @option almostDistance: Number = 25
  // Tolerance in pixels
  almostDistance: 25,   // pixels
  // @option almostSamplingPeriod: Number = 50
  // To reduce the 'mousemove' event frequency. In milliseconds
  almostSamplingPeriod: 50,  // ms
  // @option almostOnMouseMove Boolean = true
  // Set it to false to disable track 'mousemove' events and improve performance
  // if AlmostOver is only need for 'click' events.
  almostOnMouseMove: true,
});


L.Handler.AlmostOver = L.Handler.extend({

  includes: L.Evented || L.Mixin.Events,

  initialize: function (map) {
      this._map = map;
      this._layers = [];
      this._previous = null;
      this._marker = null;
      this._buffer = 0;

      // Reduce 'mousemove' event frequency
      this.__mouseMoveSampling = (function () {
          let timer = new Date();
          return function (e) {
              let date = new Date(),
                  filtered = (date - timer) < this._map.options.almostSamplingPeriod;
              if (filtered || this._layers.length === 0) {
                  return;  // Ignore movement
              }
              timer = date;
              this._map.fire('mousemovesample', {latlng: e.latlng});
          };
      })();
  },

  addHooks: function () {
      if (this._map.options.almostOnMouseMove) {
          this._map.on('mousemove touchmove', this.__mouseMoveSampling, this);
          this._map.on('mousemovesample', this._onMouseMove, this);
          
      }
      this._map.on('click dblclick touchstart', this._onMouseClick, this);

      function computeBuffer() {
          this._buffer = this._map.layerPointToLatLng([0, 0]).lat -
                         this._map.layerPointToLatLng([this._map.options.almostDistance,
                                                       this._map.options.almostDistance]).lat;
      }
      this._map.on('viewreset zoomend', computeBuffer, this);
      this._map.whenReady(computeBuffer, this);
  },

  removeHooks: function () {
      this._map.off('mousemovesample');
      this._map.off('mousemove touchmove', this.__mouseMoveSampling, this);
      this._map.off('click dblclick touchstart', this._onMouseClick, this);
  },

  addLayer: function (layer) {
      if (typeof layer.eachLayer == 'function') {
          layer.eachLayer(function (l) {
              this.addLayer(l);
          }, this);
      }
      else {
          if (typeof this.indexLayer == 'function') {
              this.indexLayer(layer);
          }
          this._layers.push(layer);
      }
  },

  removeLayer: function (layer) {
      if (typeof layer.eachLayer == 'function') {
          layer.eachLayer(function (l) {
              this.removeLayer(l);
          }, this);
      }
      else {
          if (typeof this.unindexLayer == 'function') {
              this.unindexLayer(layer);
          }
          var index = this._layers.indexOf(layer);
          if (0 <= index) {
              this._layers.splice(index, 1);
          }
      }
      this._previous = null;
  },
  getClosest: function (latlng) {
      let distance = this._map.options.almostDistance;
      if (this._layers.length > 0){
        const res = this._getClosest(latlng);
        if (this.distance(latlng, res.latlng) <= distance ){
          return res;
        }
      }
      
      
      return null;
  },
  /** 
   *   Shortcut function for planar distance between two {L.LatLng} at current zoom.
   *   Originally in L.GeometryUtil
   *   
   *   @param {L.LatLng} latlngA geographical point A
   *   @param {L.LatLng} latlngB geographical point B
   *   @returns {Number} planar distance
   */
  distance: function (latlngA, latlngB) {
      return this._map.latLngToLayerPoint(latlngA).distanceTo(this._map.latLngToLayerPoint(latlngB));
  },

  _getClosest: function(latlng) {
      const point = turf.point([latlng.lng, latlng.lat])
      let dist = Infinity;
      let closestLine;
      let closeLayer;
      let closestPointOnLine;
      this._layers.forEach(layer => {
          const lineType = layer.options.lineType;
          let lls = this._latlngToArray(layer.getLatLngs());
          
          if (lineType == "LineString") {
              lls = [lls]
          }

          lls.forEach(coords => {
              const line = turf.lineString(coords);
              
              const nearPoint = turf.nearestPointOnLine(line, point);
              if (nearPoint.properties.dist < dist){
                  dist = nearPoint.properties.dist;
                  closestLine = line;
                  closeLayer = layer;
                  closestPointOnLine = nearPoint;
              }       
          });
      });
      return {
          layer: closeLayer,
          latlng: L.latLng(closestPointOnLine.geometry.coordinates[1], closestPointOnLine.geometry.coordinates[0]),
          closestLine: closestLine,
          pointOnLine: closestPointOnLine
      }
    },
    _latlngToArray: function (lls) {
      if (Array.isArray(lls)) return lls.map((ll) => this._latlngToArray(ll));
      else return [lls.lng, lls.lat];
    },

  _onMouseMove: function (e) {
    console.log(e)
      var closest = this.getClosest(e.latlng);
      if (closest) {
         
          if (!this._previous) {
              this._map.fire('almost:over', {layer: closest.layer,
                                             latlng: closest.latlng});
          }
          else if (L.stamp(this._previous.layer) != L.stamp(closest.layer)) {
              this._map.fire('almost:out', {layer: this._previous.layer});
              this._map.fire('almost:over', {layer: closest.layer,
                                             latlng: closest.latlng});
          }

          this._map.fire('almost:move', {layer: closest.layer,
                                         latlng: closest.latlng});
      }
      else {
          if (this._previous) {
              this._map.fire('almost:out', {layer: this._previous.layer});
          }
      }
      this._previous = closest;
  },

  _onMouseClick: function (e) {
      var closest = this.getClosest(e.latlng);
      if (closest) {
          this._map.fire('almost:' + e.type, {layer: closest.layer, latlng: closest.latlng});
      }
  },
});

if (L.LayerIndexMixin !== undefined) {
  L.Handler.AlmostOver.include(L.LayerIndexMixin);
}

L.Map.addInitHook('addHandler', 'almostOver', L.Handler.AlmostOver);