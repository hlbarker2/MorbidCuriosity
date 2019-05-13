function buildGauge(LifeExpectancy) {

    var level = (LifeExpectancy - 60)/(90-60) * 180
    console.log(level)

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

        var data = [
            {
                type: "scatter",
                x: [0],
                y: [0],
                marker: { size: 12, color: "000000" },
                showlegend: false,
                text: LifeExpectancy,
                hoverinfo: "text"
            },
            {
                values: [50 / 6, 50 / 6, 50 / 6, 50 / 6, 50 / 6, 50 / 6, 50],
                rotation: 90,
                text: ["85-90", "80-85", "75-80", "70-75", "65-70", "60-65", ""],
                textinfo: "text",
                textposition: "inside",
                marker: {
                    colors: [
                        "rgb(72, 209, 204)",
                        "rgba(72, 209, 204, .85)",
                        "rgba(72, 209, 204, .7)",
                        "rgba(72, 209, 204, .5)",
                        "rgba(72, 209, 204, .3)",
                        "rgba(72, 209, 204, .15)",
                        "rgba(255, 255, 255, 0)"
                    ]
                },
                labels: ["85-90", "80-85", "75-80", "70-75", "65-70", "60-65", ""],
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
            title: "Life Expectancy",
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

        var GAUGE = document.getElementById("gauge");
        Plotly.newPlot(GAUGE, data, layout);
    };