
const map = L.map("map").setView([40.758701, -111.876183], 13);
console.log("hi")
const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

new L.Toolbar2.Trace({
  position: "topleft",
}).addTo(map);
