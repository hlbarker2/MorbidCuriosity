function buildCharts() {
    d3.json(`/sviData`).then((data) => {

        var allCountyNames = Object.values(data.Location);
        var allLifeExpect = Object.values(data.Life_Expectancy);
        var allSVI = Object.values(data.RPL_THEMES);
        var allSES = Object.values(data.RPL_THEME1);
        var allHouseholdComp = Object.values(data.RPL_THEME2);
        var allMinority = Object.values(data.RPL_THEME3);
        var allTransport = Object.values(data.RPL_THEME4);
        console.log(allCountyNames);

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
            }
        ];

        console.log(data);

        Plotly.newPlot("bar", data)
})};

buildCharts();
