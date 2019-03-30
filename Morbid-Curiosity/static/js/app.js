// ###############################
// GET METADATA
// ###############################


// ###############################
// BUILD USA HEAT MAP
// ###############################


// ###############################
// BUILD BAR CHARTS
// ###############################


// ###############################
// BUILD RADAR CHART
// ###############################


// ###############################
// INITIALIZE FOR THE HEAT MAP
// ###############################
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildGauge(firstSample);
    buildCharts(firstSample);
    buildMetaData(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected  
  //how do I clear last sample data?
  buildGauge(newSample);
  buildCharts(newSample);
  buildMetaData(newSample);
}

// Initialize the dashboard
init();