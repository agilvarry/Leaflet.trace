# Leaflet.Trace

This plugin is an extension for Leaflet.Draw that includes a new set of tools which allow the user to select a line and trace along it.

It requires [Leaflet.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil/), [Leaflet.AlmostOver](https://github.com/makinacorpus/Leaflet.AlmostOver), [Leaflet.Draw](https://github.com/Leaflet/Leaflet.draw) and [@turf/turf](https://github.com/Turfjs/turf).


## Demo
Play with it [here](https://agilvarry.github.io/Leaflet.trace/)

## Install
To include it in your app using a cdn add the following to the top of your html
```js
<link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw-src.css" />
<script src="https://unpkg.com/leaflet-geometryutil@0.10.1/src/leaflet.geometryutil.js"></script>
<script src="https://unpkg.com/leaflet-almostover@1.0.1/src/leaflet.almostover.js"></script>
<script src="https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.js"></script> 
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet-trace@0.1.6/dist/leaflet.trace.css" />
<script type="module" src="https://unpkg.com/leaflet-trace@0.1.6/dist/leaflet.trace.js"></script>
```
npm instructions coming soon...

## Usage
Leaflet.Trace mainly extends L.Control.Draw to add a new set of 3 tools that work together to allow users to tract along a selected line. 

It is initalized similarly to L.Control.Draw, with the addition of a trace option.

```javascript

new L.Control.Trace({
  trace: true,
  draw: {
    marker: false,
    circlemarker: false,
  },
  edit: {
    featureGroup: drawnItems,
  },
}).addTo(map);

```

