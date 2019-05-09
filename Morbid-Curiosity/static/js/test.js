/**  function buildMetadata(zipCode) {
    console.log({zipCode})
    d3.json(`/userData/${zipCode}`).then(data => {
        // Use d3 to select the panel with id of `#sample-metadata`
        //var PANEL = d3.select("#sample-metadata");

        // Use `.html("") to clear any existing metadata
        //PANEL.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        //Object.entries(data).forEach(([key, value]) => {
            //PANEL.append("h6").text(`${key}: ${value}`);
        //});

        // BONUS: Build the Gauge Chart
        buildGauge(data.Life_Expectancy);
    });
}

// buildMetadata()

//Listener on enter
//take away submit
//call buildgauge - using value of input

function init(zipCode) {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#enterZip");

    // Use the list of sample names to populate the select options
    d3.json(`/userData/${zipCode}`).then((sampleZip) => {
        sampleZip.forEach((code) => {
            selector
                .append("option")
                .text(code)
                .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        const firstSample = sampleZip[0];
        //buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    //buildCharts(newSample);
    buildMetadata(newSample);
}

// Initialize the dashboard
init();*/

function buildMetadata() {
  var zipCode = d3.select("#zipcode").node()
    ? d3.select("#zipcode").node().value
    : 22201;
  console.log({ zipCode });
  // try {
  d3.json(`/userData/${zipCode}`)
    .then(data => {
      buildGauge(data[0].LifeExpectancy);
      buildEduGauge(data[0].NoHighSchoolDiploma);
      buildIncomeGauge(data[0].Per_Capita_Income);
      buildPovertyGauge(data[0].Poverty);
      buildDisabilityGauge(data[0].Disability)
    })
    .catch(err => {
      console.error(err);
      alert(`You have entered an invalid zip code. Please try again.`);
    });
  // }

}

// Initialize the dashboard
buildMetadata();
