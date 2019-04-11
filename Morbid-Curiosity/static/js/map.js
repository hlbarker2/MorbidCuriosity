// Creating map object
var map = L.map("heatmap", {
  center: [38, -96],
  zoomSnap: 0.1,
  zoom: 4.7
});

var API_KEY = "pk.eyJ1IjoiY3ZlcmdhcmE5MyIsImEiOiJjanRsbzFoZXkwN21oNDNvMTZkNzhna2FqIn0.jXOLJQHUdkF-gfAVEcwtlA";

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 10,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(map);

var geojson;

function buildMap() {
  d3.json('/data').then((data) => {
    L.geoJson(data, {style: {
      // Border color
      color: "#fff",
      weight: 0,
      fillOpacity: 0
    }}).addTo(map);
  var selected_disease = document.getElementById('disease_type').value;
  var selected_pop = document.getElementById('pop_size').value;
  var selected_spend = document.getElementById('med_spend').value;
  var popup = selected_disease.replace(/_/g, " ");
  var newfeatures = data.features.filter(function(row) {
    if((row.properties.Population > parseInt(selected_pop)) && parseInt((row.properties["Total per enrollee (age, sex, race, price adjusted)"]).replace(/,/g, '')) > parseInt(selected_spend)) {
      return true
    } else {
      return false;}})
  var newdata ={
    "type": "FeatureCollection", 
    "features": newfeatures
  }
  geojson = L.choropleth(newdata, {

    // Define what  property in the features to use
    valueProperty: selected_disease,

    // Set color scale
    scale: ["#fdba9f", "#eb2d1f"],

    // Number of breaks in step range
    steps: 15,

    // q for quartile, e for equidistant, k for k-means
    style: {
      // Border color
      color: "#fff",
      weight: .2,
      fillOpacity: 0.8},
  onEachFeature: function(feature, layer) {
    layer.bindPopup("<h4>" + feature.properties.LOCATION +
    `</h4><hr><p> <b> ${popup}: ` + parseFloat(feature.properties[selected_disease]).toFixed(3) + "</b></p>", {
      autoPan: false});
    layer.on('mouseover', function (e) {
      this.openPopup(autoPan=false)});
    layer.on('mouseout', function (e) {
      this.closePopup()});
    }}).addTo(map)
  })};
  function rebuildMap() {
    geojson.clearLayers();
    buildMap();
  };
  buildMap();