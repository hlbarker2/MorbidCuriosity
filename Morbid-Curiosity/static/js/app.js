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
function buildRadar() {
  var ctx = document.getElementById('radar').getContext('2d');
  var radarChart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'radar',

    data: {
      labels: ['Cancer','Heart Disease', 'Stroke', 'Accidents', 'Influenza'],
      datasets: [{
          label: 'Males',
          backgroundColor: 'rgba(18,94,227,.7)',
          borderColor: 'rgb(18,94,227)',
          data: [10, 5, 8, 20, 30, 45]
      }]
    },

    // Configuration options go here
    options: {
      responsive: true,
      maintainAspectRadio: true,
      tooltips: {
        enable: true,
        mode: 'label'
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: 'rgb(0, 0, 0)'
        }
      },
      title: {
        display: false,
      }
    }
});
}

buildRadar();