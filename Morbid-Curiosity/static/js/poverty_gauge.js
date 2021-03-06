function buildPovertyGauge(poverty) {
  var level = (poverty / 50) * 180;
  console.log(level);

  // Trig to calc meter point
  var degrees = 180 - level;
  var radius = 0.5;
  var radians = (degrees * Math.PI) / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
  var mainPath = "M -.0 -0.05 L .0 0.05 L ";
  var pathX = String(x);
  var space = " ";
  var pathY = String(y);
  var pathEnd = " Z";
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  var poverty_data = [
    {
      type: "scatter",
      x: [0],
      y: [0],
      marker: { size: 12, color: "000000" },
      showlegend: false,
      text: poverty,
      hoverinfo: "text"
    },
    {
      values: [50 / 6, 50 / 6, 50 / 6, 50 / 6, 50 / 6, 50 / 6, 50],
      rotation: 90,
      text: ["50-60%", "40-50%", "30-40%", "20-30%", "10-20%", "0-10%", ""],
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: [
          "rgb(235, 45, 31)",
          "rgba(235, 45, 31, .9)",
          "rgba(235, 45, 31, .7)",
          "rgba(235, 45, 31, .5)",
          "rgba(235, 45, 31, .3)",
          "rgba(235, 45, 31, .1)",
          "rgba(255, 255, 255, 0)"
        ]
      },
      labels: ["50-60%", "40-50%", "30-40%", "20-30%", "10-20%", "0-10%", ""],
      hoverinfo: "label",
      hole: 0.5,
      type: "pie",
      showlegend: false
    }
  ];

  var layout = {
    shapes: [
      {
        type: "path",
        path: path,
        fillcolor: "000000",
        line: {
          color: "000000"
        }
      }
    ],
    title: "Percent Below Poverty Level",
    height: 400,
    width: 400,
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }
  };

  var poverty_GAUGE = document.getElementById("poverty_gauge");
  Plotly.newPlot(poverty_GAUGE, poverty_data, layout)
}