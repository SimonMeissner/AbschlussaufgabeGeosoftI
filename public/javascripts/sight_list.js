
// Initialize the map and set coordinates and zoom
var map = L.map('sight_list_mapid').setView([51.96, 7.63], 13);

// Add tile layer with map from OpenStreetMap
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

