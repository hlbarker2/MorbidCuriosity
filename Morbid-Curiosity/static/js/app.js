// ###############################
// GET METADATA
// ###############################

function buildMetaData(sample) {
  var url1 = `/metadata/${sample}`;

  d3.json(url1).then(function(sampleData) {
    // console.log(sampleData);

  // Reference to Panel element for sample metadata
  var PANEL = d3.select("#sample-metadata");

  // clear any existing metadata
  PANEL.html("");

  // Use `Object.entries` to add each key and value pair to the panel
  // Using d3 to append new tags for each key-value in the metadata.
  Object.entries(sampleData).forEach(([key, value]) => {
    PANEL.append('p').text(`${key}: ${value}`);
  })
})
}

// ###############################
// BONUS: Build the Gauge Chart
// ###############################
function buildGauge(wfreq) {

   // Enter the washing frequency between 0 and 180
   var level = parseFloat(wfreq) * 20;

  // Trig to calc meter point
  var degrees = 180 - level, radius = 0.75;
  var radians = (degrees * Math.PI) / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path: https://plot.ly/javascript/gauge-charts/
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  var gaugeData = [
    { 
      type: 'scatter',
      x: [0], 
      y:[0],
      marker: {size: 12, color:'#404040'},
      showlegend: false,
      name: 'W-Frequency',
      text: level,
      hoverinfo: 'text+name'
    },
    { 
      values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
      rotation: 90,
      text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      textinfo: 'text',
      textposition:'inside',
      marker: {
        colors: [
          '#DB2C11',
          '#F2402C',
          '#FF5D4B',
          '#FF6F61', 
          '#F58376',
          '#FA8B7F',
          '#FDAB9B',
          '#FCC1B6',
          '#EADEDB',
          'rgba(0,0,0,0)'
        ]
      },
      labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      hoverinfo: "label",
      hole: .5,
      type: 'pie',
      showlegend: false
    }
  ];

  var gaugeLayout = {
    shapes:[
      {
        type: 'path',
        path: path,
        fillcolor: '#404040',
        line: {
          color: '#404040'
        }
      }
    ],
    title: `Belly Button Cleaning Frequency<br><i>Scrubs Per Week</i>`,
    height: 500,
    width: 500,
    xaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]},
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  };

  Plotly.plot('gauge', gaugeData, gaugeLayout);
  }


// ###############################
// BUILD PIE AND BUBBLE CHARTS
// ###############################

function buildCharts(sample) {

  // Use `d3.json` to fetch the sample data for the plots
  var url2 = `/samples/${sample}`;
  
  d3.json(url2).then(function(sampleData) {
    // console.log(sampleData);

    const otu_ids = sampleData.otu_ids;
    const otu_labels = sampleData.otu_labels;
    const sample_values = sampleData.sample_values;

    // Build a pie chart with the sample data
    // Use slice() to grab the top 10 sample_values, otu_ids, and labels (10 each).

    var pieTrace = {
      type: "pie",
      name: "Pie Chart",
      values: sample_values.slice(0,10),
      labels: otu_ids.slice(0,10),
      hovertext: otu_labels.slice(0,10),
      hoverinfo: 'hovertext',
      marker: {
        colors: [  
          '#BC70A4', 
          '#BFD641',
          '#FCC1B6',
          '#005960',
          '#CE5B78',
          '#FF6F61',
          '#C62168',
          '#2E4A62',
          '#006E6D',
          '#00A591'
        ],
      }
    };

    var pieData = [pieTrace];

    var pieLayout = {
      title: "Content Biodiversity",
      height: 500,
      width: 500,
      showlegend: false,
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)'
    };

    // clear any existing metadata
    // var PIE = d3.select("pie").html("");

    Plotly.plot("pie", pieData, pieLayout);

    // Build a Bubble Chart using the sample data
    var bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: [[0, '#68BDC3'], [0.25, '#4CA6AC'], [0.45, '#338F95'], [0.65, '#227F86'], [0.85, '#005960'], [1, '#01454A']],
        type: 'heatmap',
        showscale: false
      }
    };

    var bubbleData = [bubbleTrace];

    var bubbleLayout = {
      // title: "Bubble Chart",
      xaxis: {
        title: "OTU ID"
      },
      showlegend: false,
      height: 500,
      width: 800,
    };

    Plotly.plot("bubble", bubbleData, bubbleLayout)
  });
};



// ###############################
// INITIALIZE
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