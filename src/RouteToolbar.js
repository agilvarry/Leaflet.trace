import "./Draw.Route";
import "./Draw.RouteSelect";
import "leaflet-toolbar";
import "./leaflet-draw-toolbar/leaflet.draw-toolbar.js";
import "./leaflet-draw-toolbar/leaflet.draw-toolbar.css"

//i need to re-do this because it's just a copy of the draw-toolbar class + 1 thing
L.Toolbar2.Action.RouteCancel = L.Toolbar2.DrawAction.Cancel.extend({
  initialize: function () {
    disableSelect(); //diable select on draw button here because this is the first place where it's alrady initalized
    L.Toolbar2.DrawAction.Cancel.prototype.initialize.call(this);
  },

});
const line = `<svg fill="#000000" width="800px" height="800px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
<title>line-chart</title>
<path d="M23.36 9.32c-1.32 0-2.36 1.080-2.36 2.36 0 0.28 0.040 0.56 0.12 0.8l-4.8 4.080c-0.32-0.2-0.72-0.28-1.16-0.28s-0.88 0.12-1.24 0.36l-2.72-2.2c0.080-0.24 0.12-0.44 0.12-0.72 0-1.32-1.080-2.36-2.36-2.36-1.32 0-2.36 1.080-2.36 2.36 0 0.36 0.080 0.68 0.2 0.96l-3.44 3.44c-0.28-0.12-0.64-0.2-0.96-0.2-1.32 0-2.36 1.080-2.36 2.36 0 1.32 1.080 2.36 2.36 2.36s2.36-1.080 2.36-2.36c0-0.36-0.080-0.68-0.2-0.96l3.44-3.44c0.28 0.12 0.64 0.2 0.96 0.2 0.44 0 0.88-0.12 1.24-0.36l2.76 2.12c-0.080 0.24-0.080 0.44-0.080 0.72 0 1.32 1.080 2.36 2.36 2.36s2.36-1.080 2.36-2.36c0-0.28-0.040-0.56-0.12-0.8l4.8-4.080c0.32 0.2 0.72 0.28 1.16 0.28 1.32 0 2.36-1.080 2.36-2.36-0.040-1.2-1.16-2.28-2.44-2.28zM2.36 21c-0.36 0-0.68-0.32-0.68-0.68 0-0.4 0.32-0.68 0.68-0.68s0.68 0.32 0.68 0.68c0 0.36-0.28 0.68-0.68 0.68zM8.24 13.76c0-0.4 0.32-0.68 0.68-0.68s0.68 0.32 0.68 0.68-0.32 0.68-0.68 0.68c-0.36 0-0.68-0.32-0.68-0.68zM15.2 19.28c-0.4 0-0.68-0.32-0.68-0.68s0.32-0.68 0.68-0.68 0.68 0.32 0.68 0.68c-0.040 0.4-0.28 0.68-0.68 0.68zM23.36 12.36c-0.36 0-0.68-0.32-0.68-0.68 0-0.4 0.32-0.68 0.68-0.68 0.4 0 0.68 0.32 0.68 0.68 0 0.4-0.32 0.68-0.68 0.68z"></path>
</svg>`

L.Toolbar2.DrawAction.Route = L.Toolbar2.DrawAction.fromHandler(
  L.Draw.Route,
  {
    className: "leaflet-draw-draw-polyline",
    tooltip: L.drawLocal.draw.toolbar.buttons.polyline,
  },
  new L.Toolbar2({ actions: [L.Toolbar2.Action.RouteCancel] })
).extend({
  options: {
    toolbarIcon: {
      className: "draw-route",
      html: line,
      tooltip: "Draw a route",
    },
  },
});

L.Toolbar2.DrawAction.SelectRoute = L.Toolbar2.DrawAction.fromHandler(
  L.Draw.RouteSelect,
  {
    className: "leaflet-draw-draw-rectangle",
    tooltip: L.drawLocal.draw.toolbar.buttons.rectangle,
  },
  new L.Toolbar2({ actions: [L.Toolbar2.DrawAction.Cancel] })
).extend({
  options: {
    toolbarIcon: {
      html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="" /</svg>`,
      tooltip: "Select a Route",
    },
  },
});

L.Toolbar2.DrawAction.RemoveSelect = L.Toolbar2.Action.extend({
  options: {
    toolbarIcon: {
      html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="" /</svg>`,
      tooltip: "Un-select the Route",
    },
  },
  initialize: function (map, drawing) {
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



export const DrawRouteToolbar = L.Toolbar2.Control.extend({
  options: {
    actions: [
      L.Toolbar2.DrawAction.SelectRoute,
      L.Toolbar2.DrawAction.RemoveSelect,
      L.Toolbar2.DrawAction.Route,
      L.Toolbar2.DrawAction.measureToGeom,
    ],
  },
});

const disableSelect = () => {
  const button = document.getElementsByClassName("draw-route")[0];

  // disable button
  button.onClick = "preventEventDefault(); return false";
  button.className = "draw-route leaflet-toolbar-icon draw-control-disabled";
};

export const disableSelectGeom = (disable) => {
  const button = document.getElementsByClassName("measure-to-geom")[0];
  if (disable) {
    // disable button
    button.onClick = "preventEventDefault(); return false";
    button.className =
      "measure-to-geom leaflet-toolbar-icon draw-control-disabled";
  } else {
    button.onClick = null;
    button.className = "measure-to-geom leaflet-toolbar-icon";
  }
};
