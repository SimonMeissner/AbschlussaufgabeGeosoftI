

// Initialize the map and set coordinates and zoom
var map = L.map('sight_form_mapid').setView([51.96, 7.63], 13);

// Add tile layer with map from OpenStreetMap
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Initialize and add feature group for drawn items
var drawnItems = L.featureGroup().addTo(map);

// Initialize and add the Leaflet Draw tool
var drawControl = new L.Control.Draw({
    draw: {      // disable all Draw tools except for marker and polygon
        circlemarker: false,
        circle: false,
        polyline: false,
        rectangle: false
    },
    edit: {
        featureGroup: drawnItems
    }
}).addTo(map);


// Display the drawn items:
map.on('draw:created', function(e) {
    // Each time a feature is created, it's added to the over arching feature group
    drawnItems.addLayer(e.layer);
    // Converting drawn items to GeoJSON
    var polygon = drawnItems.toGeoJSON();  //polygon can also be a point (=only one pair of coordinates in array)
    console.log(JSON.stringify(polygon));
});
