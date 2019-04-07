// ###############################
// STICKY NAVBAR
// ###############################
// When the user scrolls the page, execute myFunction 
// window.onscroll = function stickyNavbar();

// // Get the navbar
// var navbar = document.getElementById('navbar');

// // Get the offset position of the navbar
// var sticky = navbar.offsetTop;

// // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function stickyNavbar() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky");
//   }
// };

// ###############################
// BUILD RADAR CHART WITH CHARTS.JS
// ###############################
function buildRadar() {
// ####################
// radar numero 1
// ####################
  var ctx = document.getElementById('radar1').getContext('2d');
  var radarChart1 = new Chart(ctx, {
    type: 'radar',

    data: {
      labels: ['Cancer','Heart Disease', 'Stroke', 'Respiratory', 'Accidents'],
      datasets: [{
          label: 'Males',
          backgroundColor: 'rgba(18,94,227,.5)',
          borderColor: 'rgba(18,94,227, .5)',
          pointBackgroundColor:'rgba(18,94,227, .5)', 
          pointRadius: 1,
          data: [22.46561055745661, 24.229162974374354, 4.238978791472963, 5.2165841865368785, 7.417644840106701]
      }, {
          label: 'Femles',
          backgroundColor: 'rgba(72, 209, 204,.5)',
          borderColor: 'rgba(72, 209, 204,.5)',
          pointBackgroundColor:'rgba(72, 209, 204,.5)',
          pointRadius: 1,
          data: [21.091105716123568, 22.02314474068052, 6.1596843077877015, 6.067652167332496, 4.2790062970001665]
        }
      ]
    },

    options: {
      responsive: true,
      maintainAspectRadio: true,
      scale: hide=false,
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
        display: true,
        text: 'Female vs. Male',
        fontSize: 16
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

// ####################
// radar numero 2 
// ####################
var ctx = document.getElementById('radar2').getContext('2d');
var radarChart1 = new Chart(ctx, {
  type: 'radar',

  data: {
    labels: ['Cancer','Heart Disease', 'Stroke', 'Respiratory', 'Accidents'],
    datasets: [{
        label: 'Urban',
        backgroundColor: 'rgba(235, 45, 31,.5)',
        borderColor: 'rgba(235, 45, 31,.5)',
        pointBackgroundColor:'rgba(235, 45, 31,.5)',
        pointRadius: 1,
        data: [22, 7, 19, 6, 21]
    }, {
        label: 'Rural',
        backgroundColor: 'rgba(72, 209, 204,.5)',
        borderColor: 'rgba(72, 209, 204,.5)',
        pointBackgroundColor: 'rgba(72, 209, 204,.5)',
        pointRadius: 1,
        data: [21, 11, 6, 9, 4]
      }
    ]
  },

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
      display: true,
      text: 'Urban vs Rural Living',
      fontSize: 16
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

// ####################
// radar numero 3
// ####################
var ctx = document.getElementById('radar3').getContext('2d');
var radarChart1 = new Chart(ctx, {
  type: 'radar',

  data: {
    labels: ['Cancer','Heart Disease', 'Stroke', 'Respiratory', 'Accidents'],
    datasets: [{
        label: 'In Poverty',
        backgroundColor: 'rgba(105,105,105,.5)',
        borderColor: 'rgba(105,105,105, .5)',
        pointBackgroundColor:'rgba(105,105,105, .5)',
        pointRadius: 1,
        data: [33, 24, 11, 22, 9]
    }, {
        label: 'Not in Poverty',
        backgroundColor: 'rgba(235, 45, 31,.5)',
        borderColor: 'rgba(235, 45, 31,.5)',
        pointBackgroundColor: 'rgba(235, 45, 31,.5)',
        pointRadius: 1,
        data: [5, 6, 6, 4, 3]
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
      display: true,
      text: 'Above vs. Below the Poverty Line',
      fontSize: 16
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