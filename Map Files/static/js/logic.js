var geojsons = []

d3.csv("DeathsFIPS.csv").then(function(data) {
  for (var i = 0; i < data.length; i++) {
    var county = data[i];
    var geojson = county.json_object
    geojsons.push({type: "Feature",
      geometry: JSON.parse(geojson)})
  }
  L.geoJSON(geojsons, {
    style: myStyle
  }).addTo(myMap);
});

console.log(geojsons)

var myMap = L.map("map", {
  center: [38, -96],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var myStyle = {
  "color": "#6495ED",
  "weight": 2.5,
  "opacity": 0.8
};



