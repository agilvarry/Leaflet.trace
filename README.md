# Leaflet.Trace

This plugin is an extension for Leaflet.Draw that includes a new set of tools which allow the user to select a line and trace along it.

It requires [Leaflet.Draw](https://github.com/Leaflet/Leaflet.draw) and [@turf/turf](https://github.com/Turfjs/turf). It also includes code based on [Leaflet.AlmostOver](https://github.com/makinacorpus/Leaflet.AlmostOver) and [Leaflet.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil/), altered to fit the needs of this plugin.

## Demo
Play with it [here](https://agilvarry.github.io/Leaflet.trace/)

## Install
To include it in your app using a cdn add the following to the top of your html
```js
<link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw-src.css" />
<script src="https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.js"></script> 
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet-trace@0.1.6/dist/leaflet.trace.css" />
<script type="module" src="https://unpkg.com/leaflet-trace@0.1.6/dist/leaflet.trace.js"></script>
```
If you install using npm adding this to your html should do the trick:

```js
<link rel="stylesheet" type="text/css" href="../node_modules/leaflet/dist/leaflet.css"/>
<script src="../node_modules/leaflet-draw/dist/leaflet.draw.js"></script>
<script src="../node_modules/@turf/turf/turf.min.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="../node_modules/leaflet-trace/dist/leaflet.trace.css"/>
<script src="../node_modules/leaflet-trace/dist/leaflet.trace.js"></script>
```

## Usage
Leaflet.Trace mainly extends L.Control.Draw to add a new set of 3 tools that work together to allow users to tract along a selected line. 

It is initalized similarly to L.Control.Draw, with the addition of a trace option.

# Example:
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

Leaflet.Trace works with [L.geoJSON](https://leafletjs.com/reference.html#geojson) layers that contain a [FeatureCollection](https://www.rfc-editor.org/rfc/rfc7946#section-3.3) made up of [LineString](https://www.rfc-editor.org/rfc/rfc7946#section-3.1.4) and [MultiLineString](https://www.rfc-editor.org/rfc/rfc7946#section-3.1.4) features.

For Leaflet.Trace to be able to detect your L.geoJSON you need to give it an attribute of "trace" set to "true".

# Example:
```js
const lines = L.geoJSON(featureCollection).addTo(map);

lines.trace = true;
```

