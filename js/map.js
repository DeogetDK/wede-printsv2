// ============================================================
// WEDE PRINTS: Interactive branch map (Leaflet + OpenStreetMap)
// ============================================================

// Branch details (coordinates are approximate for the fictional addresses)
var branches = {
  cbd:  { name: 'WEDE PRINTS: Pretoria CBD',  address: '123 Printing Avenue, Pretoria CBD', coords: [-25.7461, 28.1881] },
  east: { name: 'WEDE PRINTS: Pretoria East', address: '47 Ink Road, Menlyn',               coords: [-25.7826, 28.2760] }
};

// Create the map, centred between the two branches
var map = L.map('map', { scrollWheelZoom: false }).setView([-25.765, 28.23], 12);

// Add the OpenStreetMap tile layer (attribution is required by OSM)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker with a popup for each branch
var markers = {};
Object.keys(branches).forEach(function (key) {
  var b = branches[key];
  markers[key] = L.marker(b.coords).addTo(map)
    .bindPopup('<strong>' + b.name + '</strong><br>' + b.address);
});

// Buttons fly the map to a branch and open its popup
document.getElementById('show-cbd').addEventListener('click', function () {
  map.flyTo(branches.cbd.coords, 15);
  markers.cbd.openPopup();
});

document.getElementById('show-east').addEventListener('click', function () {
  map.flyTo(branches.east.coords, 15);
  markers.east.openPopup();
});