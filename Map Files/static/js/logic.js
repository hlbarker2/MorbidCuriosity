// Creating map object
var map = L.map("map", {
  center: [38, -96],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 10,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(map);

var geojson;

  // Grabbing our GeoJSON data..
d3.json('us.geo.json', function(data) {
  // Creating a GeoJSON layer with the retrieved data
  geojson = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "Cancer_Deaths",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },
  onEachFeature: function(feature, layer) {
    layer.bindPopup("<h4>" + feature.properties.LOCATION +
    "</h4><hr><p> <b> Cancer Deaths: " + feature.properties.Cancer_Deaths + "</b></p>", {
      autoPan: false});
    layer.on('mouseover', function (e) {
      this.openPopup(autoPan=false)});
    layer.on('mouseout', function (e) {
      this.closePopup()});
  }}).addTo(map)
  })

var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var limits = geojson.options.limits;
  var colors = geojson.options.colors;
  var labels = [];

  // Add min & max
  var legendInfo = "<h1>Cancer Deaths/h1>" +
    "<div class=\"labels\">" +
      "<div class=\"min\">" + limits[0] + "</div>" +
      "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    "</div>";

  div.innerHTML = legendInfo;

  limits.forEach(function(limit, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  });

  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};

// Adding legend to the map
legend.addTo(map);