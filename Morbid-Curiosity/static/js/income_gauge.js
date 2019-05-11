function buildIncomeGauge(income) {
  var level = (((income/1000) - 5)/ (65 - 5)) * 180;
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

  var income_data = [
    {
      type: "scatter",
      x: [0],
      y: [0],
      marker: { size: 12, color: "000000" },
      showlegend: false,
      text: income,
      hoverinfo: "text"
    },
    {
      values: [50 / 6, 50 / 6, 50 / 6, 50 / 6, 50 / 6, 50 / 6, 50],
      rotation: 90,
      text: ["55-65", "45-55", "35-45", "25-35", "15-25", "5-15", ""],
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: [
          "rgba(110, 154, 22, .5)",
          "rgba(170, 202, 42, .5)",
          "rgba(202, 209, 95, .5)",
          "rgba(210, 206, 145, .5)",
          "rgba(232, 226, 202, .5)",
          "rgba(240, 230, 215, .5)",
          "rgba(255, 255, 255, 0)"
        ]
      },
      labels: ["55-65", "45-55", "35-45", "25-35", "15-25", "5-15", ""],
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
    title: "Per Capita Income (Thousands)",
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

  var income_GAUGE = document.getElementById("income_gauge");
  Plotly.newPlot(income_GAUGE, income_data, layout);
}
