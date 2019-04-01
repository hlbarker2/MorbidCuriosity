Plotly.d3.csv("merged_topmortality.csv", function(err, rows) {
  function unpack(rows, key) {
    return rows.map(function(row) {
      return row[key];
    });
  }
  var allCountyNames = unpack(rows, "County"),
    allHouseholdComp = unpack(rows, "RPL_THEME2"),
    allPoverty = unpack(rows, "MP_POV"),
    allUnemployment = unpack(rows, "MP_UNEMP");

  function makePlotly(x, y) {
    var plotDiv = document.getElementById("plot");
    var traces = [
      {
        x: allCountyNames,
        y: allHouseholdComp,
        type: "bar"
      }
    ];

    Plotly.newPlot(plot, traces, { title: "Counties with Highest Mortality" });
  }
  makePlotly();

  function updatePlotly(newx, newy) {
    const BAR = document.getElementById("plot");

    // Note the extra brackets around 'newx' and 'newy'
    Plotly.restyle(BAR, "x", [newx]);
    Plotly.restyle(BAR, "y", [newy]);
  }
function getData(dataset) {

    // Initialize empty arrays to contain our axes
    var x = [];
    var y = [];

        // Fill the x and y arrays as a function of the selected dataset
    switch (dataset) {
        case "dataset1":
            x = [allCountyNames];
            y = [allHouseholdComp];
            break;
        case "dataset2":
            x = [allCountyNames];
            y = [allPoverty]
            break;
        case "dataset3":
            x = [allCountyNames];
            y = [allUnemployment];
            break;
        default:
            x = [allCountyNames];
            y = [allHouseholdComp];
            break;
        };
        updatePlotly(x, y)
    };
});
