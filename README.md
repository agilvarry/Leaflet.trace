# Leaflet.Trace

This plugin is an extension for Leaflet.Draw that includes a new set of tools which allow the user to select a line and trace along it.

It requires [Leaflet.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil/), [Leaflet.AlmostOver](https://github.com/makinacorpus/Leaflet.AlmostOver) and [Leaflet.Draw](https://github.com/Leaflet/Leaflet.draw).

It was bundled with [@turf/boolean-intersects and @turf/helpers](https://github.com/Turfjs/turf) using [webpack](https://webpack.js.org/).

## Demo
Play with it [here](https://agilvarry.github.io/Leaflet.trace/)
## Usage

Leaflet.Trace mainly extends L.Control.Draw to add a new set of 3 tools that work together to allow users to tract alone selected line. 

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

