
// Initialize the map and set coordinates and zoom
var map = L.map('sight_list_mapid').setView([51.96, 7.63], 13);

// Add tile layer with map from OpenStreetMap
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);


window.onload = function() {
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/cityguide/api/sight');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {

        console.log(xhr.responseText)
        //L.geoJSON(JSON.parse(xhr.responseText)).addTo(map);
      }
    };
    xhr.send();
  }