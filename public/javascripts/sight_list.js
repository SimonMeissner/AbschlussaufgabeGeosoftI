
// Initialize the map and set coordinates and zoom
var map = L.map('sight_list_mapid').setView([51.96, 7.63], 13);

// Add tile layer with map from OpenStreetMap
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var DataLayer = L.geoJSON().addTo(map);

//render all Sights on the map with popup at the first point of the polygon containing metadata
window.onload = function() {
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/cityguide/api/sight');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200 && xhr.readyState == 4) {
        var data = JSON.parse(xhr.responseText);
        
        for(i=0;i < data.length; i++) {
          
          DataLayer.addData(data[i])
          //console.log(data[i].features[0].geometry.coordinates[0][0])

          //marker at first point of polygon with switched lat and long
          var marker = L.marker([data[i].features[0].geometry.coordinates[0][0][1],data[i].features[0].geometry.coordinates[0][0][0]])

          var textform = 'Name: ' + data[i].features[0].properties.name +
                         '<br>Link: ' + data[i].features[0].properties.link +
                         '<br>Description: ' + data[i].features[0].properties.description

          marker.bindPopup(textform).openPopup().addTo(map) 



        }
      }
    };
    xhr.send();
  }

//function to check if link is wikipedia page and if so display first few lines of the article
function getInfo (link) {
    $(function () {
      $.ajax({
        type: 'GET',
        url:  `https://www.mediawiki.org/w/api.php?action=query&origin=https://en.wikipedia.org`,
        success:  function(data) {
          
        }
      })
    })
}

//Eventlistener for show Busstop button
document.getElementById("showbusstop").addEventListener("click", function() {
  
  $(function () {
    $.ajax({
      type: 'GET',
      url:  `https://rest.busradar.conterra.de/prod/haltestellen`,
      success:  function(data) {
        //normally only adding the busstop closest to the marked sight...
        for(i=0;i < data.features.length; i++) {


          var lat = data.features[i].geometry.coordinates[0]
          var lon = data.features[i].geometry.coordinates[1]
          var marker = L.marker([lon, lat])

          var textform = 'Name: ' + data.features[i].properties.lbez 
          

          marker.bindPopup(textform).openPopup().addTo(map)

        }
      }
    })
  })

})