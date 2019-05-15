window.onload = function () {
  document.getElementById("enterZip").click();
}

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

d3.json('/data').then(function(response) {
  window.data = response
  console.log(data)
  buildMap(window.data)
});

var pop_slider = new Slider('#pop_slide', {
});
var spend_slider = new Slider('#spend_slide', {
});

pop_slider.on('change', rebuildMap)
spend_slider.on('change', rebuildMap)

var legend;

function buildMap(data) {
  L.geoJson(data, {style: {
      // Border color
      color: "#fff",
      weight: 0,
      fillOpacity: 0
    }}).addTo(map);
  var selected_disease = document.getElementById('disease_type').value;
  var selected_pop_low = pop_slider.getValue()[0];
  var selected_pop_high = pop_slider.getValue()[1];
  var selected_spend_low = spend_slider.getValue()[0];
  var selected_spend_high = spend_slider.getValue()[1];
  if (selected_disease == "LowerResp_Death_Rate"){
    var popup = "Respiratory Disease Death Rate";
  } else if (selected_disease == "Heart_Death_Rate"){
    var popup = "Heart Disease Death Rate";
  }
  else {
    var popup = selected_disease.replace(/_/g, " ");
  }
  var newfeatures = data.features.filter(function(row) {
    if((row.properties.Population >= parseInt(selected_pop_low)) && 
    (row.properties.Population <= parseInt(selected_pop_high)) && 
    (parseInt((row.properties["Total per enrollee (age, sex, race, price adjusted)"])) >= parseInt(selected_spend_low)) &&
    (parseInt((row.properties["Total per enrollee (age, sex, race, price adjusted)"])) <= parseInt(selected_spend_high))
    ) {
      return true
    } else {
      return false;}})
  var newdata ={
    "type": "FeatureCollection", 
    "features": newfeatures
  }
  if (selected_disease == "Life Expectancy"){
    geojson = L.choropleth(newdata, {

      // Define what  property in the features to use
      valueProperty: selected_disease,
  
      // Set color scale
      scale: ["#eb2d1f", "#fdba9f"],
  
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
      var legend = L.control({ position: "bottomleft" });
      legend.onAdd = function() {
        var elements = document.getElementsByClassName("info legend leaflet-control");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
        var div = L.DomUtil.create("div", "info legend");
        var limits = geojson.options.limits;
        var colors = geojson.options.colors;
        var labels = [];
  
        // Add min & max
        var legendInfo = `<h4>${popup}</h4>` +
          "<div align=\"center\" class=\"p\">" + "(Years)" + "</div>" +
          "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0].toFixed(3) + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1].toFixed(3) + "</div>" +
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
      }
  else {
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
    var legend = L.control({ position: "bottomleft" });
    legend.onAdd = function() {
      var elements = document.getElementsByClassName("info legend leaflet-control");
      while(elements.length > 0){
          elements[0].parentNode.removeChild(elements[0]);
      }
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];

      // Add min & max
      var legendInfo = `<h4>${popup}</h4>` +
      "<div align=\"center\" class=\"p\">" + "(Deaths per 1,000)" + "</div>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0].toFixed(3) + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1].toFixed(3) + "</div>" +
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
  }};
  function rebuildMap() {
    geojson.clearLayers();
    buildMap(window.data);
  };
