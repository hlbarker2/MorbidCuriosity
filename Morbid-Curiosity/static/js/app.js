// ###############################
// GET METADATA
// ###############################


// ###############################
// BUILD USA HEAT MAP WITH LEAFLET
// ###############################


// ###############################
// BUILD BAR CHARTS WITH PLOTLY
// ###############################


// ###############################
// BUILD RADAR CHART WITH CHARTS.JS
// ###############################

var ctx = document.getElementById('radar').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'radar',

    // The data for our dataset
    data: {
        labels: ['Cancer','Heart Disease','Diabetes', 'Stroke', 'Accidents', 'Influenza'],
        datasets: [{
            label: 'Males',
            backgroundColor: 'rgba(18,94,227,.5)',
            borderColor: 'rgb(18,94,227)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});

// ###############################
// INITIALIZE FOR THE HEAT MAP
// ###############################
// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select("#selDataset");

//   // Use the list of sample names to populate the select options
//   d3.json("/names").then((sampleNames) => {
//     sampleNames.forEach((sample) => {
//       selector
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//     });

//     // Use the first sample from the list to build the initial plots
//     const firstSample = sampleNames[0];
//     buildCharts(firstSample);
//     buildMetaData(firstSample);
//   });
// }

// function optionChanged(newSample) {
//   // Fetch new data each time a new sample is selected  
//   buildCharts(newSample);
//   buildMetaData(newSample);
// }

// // Initialize the dashboard
// init();