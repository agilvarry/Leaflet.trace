const map = L.map("map").setView([40.758701, -111.876183], 13);

const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const baseLayers = {
  OpenStreetMap: osm,
};

let udotRoutes = L.geoJSON().addTo(map);
const drawnItems = new L.featureGroup().addTo(map);
L.esri.featureLayer({
  url: "https://maps.udot.utah.gov/randh/rest/services/PrimaryRoutes/MapServer/0",
  useCors: true
})
  .query()
  .returnM(true)
  .run(function (error, featureCollection, response) {
    if (error) {
      console.log(error);
      return;
    }

    const geoJSONFeatureCollection = {
      type: "FeatureCollection",
      features: [],
      selectable: true,
    };

    featureCollection.features.forEach((feature) => {
      geoJSONFeatureCollection.features.push(feature);
    });
    udotRoutes.addData(geoJSONFeatureCollection);
    udotRoutes.options.selectable = true;
  });

const overlays = {
  "Routes": udotRoutes,
  "Drawn Items": drawnItems,
};

L.control.layers(baseLayers, overlays).addTo(map);

new L.Toolbar2.Trace({
  position: "topleft",
}).addTo(map);


new L.Control.Draw({
  draw: false,
  edit: {
    featureGroup: drawnItems,
  },
}).addTo(map);


/**
 * Listeners
 *
 */


//listens for when a feature is drawn
map.on("draw:created", (e) => {
  if (e.layerType !== "select") {
    drawnItems.addLayer(e.layer);
  } 
});