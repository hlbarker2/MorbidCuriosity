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
          backgroundColor: 'rgba(18,94,227,.6)',
          borderColor: 'rgba(18,94,227, .6)',
          data: [10, 5, 8, 20, 30, 45]
      }, {
          label: 'Femles',
          backgroundColor: 'rgba(235, 45, 31,.6)',
          borderColor: 'rgba(235, 45, 31,.6)',
          data: [22, 15, 2, 15, 40, 18]
        }
      ]
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
      },
      tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                    label += ': ';
                }
                label += Math.round(tooltipItem.yLabel * 100) / 100;
                return label;
            }
        }
    }
  }
});
}

buildRadar();