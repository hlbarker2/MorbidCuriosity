function buildCharts() {
    d3.json(`/sviData`).then((data) => {

      var allCountyNames = Object.values(data.Location);
      var allLifeExpect = Object.values(data.Life_Expectancy);
      var allSVI = Object.values(data.RPL_THEMES);
      var allSES = Object.values(data.RPL_THEME1);
      var allHouseholdComp = Object.values(data.RPL_THEME2);
      var allMinority = Object.values(data.RPL_THEME3);
      var allTransport = Object.values(data.RPL_THEME4);
        // Build a Scatter Plot
        var data = [
            {
                x: allLifeExpect,
                y: allSVI,
                type: "scatter",
                mode: "markers",
                name: "SVI",
                text: allCountyNames,
                marker: {
                    color: "rgb(105,105,105)",
                    line: {
                        color: "black",
                        width: 1
                    }
                }
            },
            {
                x: allLifeExpect,
                y: allSES,
                type: "scatter",
                mode: "markers",
                name: "Socioeconomic",
                text: allCountyNames,
                marker: {
                    color: "rgb(18,94,227)",
                    line: {
                        color: "black",
                        width: 1
                    }
                },
                visible: false
            },
            {
                x: allLifeExpect,
                y: allHouseholdComp,
                type: "scatter",
                mode: "markers",
                name: "Household Comp",
                text: allCountyNames,
                marker: {
                    color: "rgb(235, 45, 31)",
                    line: {
                        color: "black",
                        width: 1
                    }
                },
                visible: false
            },
            {
                x: allLifeExpect,
                y: allMinority,
                type: "scatter",
                mode: "markers",
                name: "Minority Status",
                text: allCountyNames,
                marker: {
                    color: "rgb(72,209,204)",
                    line: {
                        color: "black",
                        width: 1
                    }
                },
                visible: false
            },
            {
                x: allLifeExpect,
                y: allTransport,
                type: "scatter",
                mode: "markers",
                name: "Housing/Transportation",
                text: allCountyNames,
                marker: {
                    color: "rgb(255,140,0)",
                    line: {
                        color: "black",
                        width: 1
                    }
                },
                visible: false
            }
        ];

        console.log(data);

        var frames = [
            { name: 'SVI', data: [{ x: allLifeExpect, y: allSVI }] },
            { name: 'Socioeconomic', data: [{ x: allLifeExpect, y: allSES }] },
            { name: 'Household Comp', data: [{ x: allLifeExpect, y: allHouseholdComp }] },
            { name: 'Minority Status', data: [{ x: allLifeExpect, y: allMinority }] },
            { name: 'Housing/Transportation', data: [{ x: allLifeExpect, y: allTransport }] },
        ];
        var SVI_annotations = [
            {
                visible: false
            }
        ];

        var SES_annotations = [
            {
                text:
                    "Ranking for below poverty,<br>unemployed, income and<br>no high school diploma",
                font: {
                    color: "rgb(18,94,227)"
                },
                width: 180,
                bordercolor: "black",
                bgcolor: "rgb(242, 242, 242)",
                showarrow: false,
                x: 1.0,
                y: 0.9,
                xref: "paper"
            }
        ];

        var householdComp_annotations = [
            {
                text:
                    "Ranking for aged 65 or Older, aged 17<br>or younger, civilian with a disability,<br> single-parent households",
                font: {
                    color: "rgb(235, 45, 31)"
                },
                width: 240,
                bordercolor: "black",
                bgcolor: "rgb(242, 242, 242)",
                showarrow: false,
                x: 1.0,
                y: 0.9,
                xref: "paper"
            }
        ];

        var minority_annotations = [
            {
                text: 'Ranking for minority<br>and speak English<br>"less than well"',
                font: {
                    color: "rgb(72, 209, 204)"
                },
                width: 150,
                bordercolor: "black",
                bgcolor: "rgb(242, 242, 242)",
                showarrow: false,
                x: 1.0,
                y: 0.9,
                xref: "paper"
            }
        ];

        var transport_annotations = [
            {
                text:
                    "Ranking for multi-unit structures<br>mobile homes, crowding, no<br>vehicle and group quarters",
                font: {
                    color: "rgb(255,140,0)"
                },
                width: 200,
                bordercolor: "black",
                bgcolor: "rgb(242, 242, 242)",
                showarrow: false,
                x: 1.0,
                y: 0.9,
                xref: "paper"
            }
        ];

        var updatemenus = [
            {
                buttons: [
                    {
                        args: [
                            { visible: [true, false, false, false, false] },
                            {
                                title: "Overall Vulnerability vs. Life Expectancy",
                                annotations: SVI_annotations
                            }
                        ],
                        label: "Overall Vulnerability",
                        method: "update"
                    },
                    {
                        args: [
                            { visible: [false, true, false, false, false] },
                            {
                                title: "Socioeconomic Status vs. Life Expectancy",
                                annotations: SES_annotations
                            }
                        ],
                        label: "Socioeconomic Status",
                        method: "update"
                    },
                    {
                        args: [
                            { visible: [false, false, true, false, false] },
                            {
                                title: "Household Composition & Disability vs. Life Expectancy",
                                annotations: householdComp_annotations
                            }
                        ],
                        label: "Household Composition & Disability",
                        method: "update"
                    },
                    {
                        args: [
                            { visible: [false, false, false, true, false] },
                            {
                                title: "Minority Status & Language vs. Life Expectancy",
                                annotations: minority_annotations
                            }
                        ],
                        label: "Minority Status & Language",
                        method: "update"
                    },
                    {
                        args: [
                            { visible: [false, false, false, false, true] },
                            {
                                title: "Housing & Transportation vs. Life Expectancy",
                                annotations: transport_annotations
                            }
                        ],
                        label: "Housing & Transportation",
                        method: "update"
                    }
                ],
                direction: "center",
                pad: { r: 6, t: 6 },
                showactive: true,
                type: "buttons",
                x: -0.24,
                y: 1,
                xanchor: "center",
                yanchor: "center",
                bgcolor: "rgb(242, 242, 242)"
            }
        ];

        var layout = {
            title: {
                text: "Overall Vulnerability vs. Mortality",
                font: {
                    size: 22
                },
                xref: "paper"
            },
            updatemenus: updatemenus,
            showlegend: false,
            xaxis: {
                title: {
                    text: "Life Expectancy",
                    font: {
                        size: 16,
                        color: "#7f7f7f"
                    },
                    xref: "paper"
                }
            }
        };

        console.log(data);
        Plotly.newPlot("bar", data, layout)
})};

buildCharts();

//buildCharts();

//function init() {
    // Grab a reference to the dropdown select element
    //var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    //d3.json("/names").then((sampleNames) => {
        //sampleNames.forEach((sample) => {
            //selector
                //.append("option")
                //.text(sample)
                //.property("value", sample);
        //});

        // Use the first sample from the list to build the initial plots
        //const firstSample = sampleNames[0];
        //buildCharts(firstSample);
        //buildMetadata(firstSample);
    //});
//}

//function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    //buildCharts(newSample);
    //buildMetadata(newSample);
//}

// Initialize the dashboard
//init()
