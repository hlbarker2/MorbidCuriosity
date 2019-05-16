// ################################
// BUILD RADAR CHART WITH CHARTS.JS
// ################################

function buildRadar() {

  var url = `/genderData`;
  d3.json(url).then((data) => {

    var diseaseType = Object.values(data.Cause_of_Death);
    var deathRate = Object.values(data.Percent);

    // var data = [
    //   {
    //   type: 'scatterpolar',
    //   r: [39, 28, 8, 7, 28, 39],
    //   theta: ['A','B','C', 'D', 'E', 'A'],
    //   fill: 'toself',
    //   name: 'Females'
    //   },
    //   {
    //   type: 'scatterpolar',
    //   r: [1.5, 10, 39, 31, 15, 1.5],
    //   theta: ['A','B','C', 'D', 'E', 'A'],
    //   fill: 'toself',
    //   name: 'Males'
    //   }
    // ];
    
    // var layout = {
    //   polar: {
    //     radialaxis: {
    //       visible: true,
    //       range: [0, 50]
    //     }
    //   },
    //   color: "#000000",
    //   showlegend: false
    // };
    // console.log(data);
    
    // var radar = document.getElementById('radar');

    // Plotly.plot(radar, data, layout);

    var ctx = document.getElementById('radar').getContext('2d');
    var radarChart1 = new Chart(ctx, {
      type: 'radar',
      data: {
        labels:[diseaseType[0], diseaseType[1], diseaseType[2], diseaseType[3], diseaseType[4]],
        fontSize: 16,
        datasets: [{
          label: 'Females',
          fontSize: 16,
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: 'rgb(18,94,227)',
          borderWidth: 4,
          pointBackgroundColor:'rgb(18,94,227)',    
          pointRadius: 1,
          data: [deathRate[0], deathRate[1], deathRate[2], deathRate[3], deathRate[4]]
        }, {
          label: 'Males',
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: 'rgb(72, 209, 204)',
          borderWidth: 4,
          pointBackgroundColor:'rgb(72, 209, 204)',
          pointRadius: 1,
          data: [deathRate[5], deathRate[6], deathRate[7], deathRate[8], deathRate[9]]
          }
        ]
      },
      options: {
        pointLabelFontSize: 30,
        pointLabels: {
          display: true,
          pointLabelFontSize: 30,
          fontSize: 20,
          fontColor: "#696969",
        },
        responsive: true,
        maintainAspectRadio: true,
        pointLabelFontSize: 20,
        legend: {
          display: true,
          position: 'bottom',
          fontSize: 20,
          labels: {
            fontColor: 'rgb(0, 0, 0)'
          }
        },
        xAxes: [{
          ticks:{
            fontColor : "#696969",
            fontSize : 20
          }}],
        title: {
          display: true,
          text: 'Gender Disparity in Mortality Rates',
          fontSize: 22,
          fontColor : "#696969"
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
  });
};

// ################################
// BUILD BAR CHART WITH CHARTS.JS
// ################################
function buildBar() {
  var url = `/denseData`;
  d3.json(url).then((data) => {
    console.log(data)

    var diseaseType = Object.values(data.Cause_of_Death);
    var deathRate = Object.values(data.Rate_per_100k);
    var densityType = Object.values(data.Density);

    // build chart
    var ctx = document.getElementById('barGraph').getContext('2d');
    var radarChart1 = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: [densityType[0], densityType[6], densityType[12], densityType[18], densityType[24], densityType[30]],
        datasets: [{
          label: 'Mortality Rate per 100K',
          backgroundColor: 'rgba(235, 45, 31,.9)',
          borderColor: 'rgb(235, 45, 31)',
          borderWidth: 0,
          pointBackgroundColor:'rgb(235, 45, 31)',
          pointRadius: 1,
          data: [deathRate[36], deathRate[37], deathRate[38], deathRate[39], deathRate[40], deathRate[41]],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRadio: true,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks:{
              min : 0,
              stepSize : 300,
              fontColor : "#696969",
              fontSize : 16
            },
            gridLines:{
              color: "#DCDCDC",
              lineWidth : 1,
              zeroLineColor :"#C0C0C0",
              zeroLineWidth : 1
            },
            scaleLabel: {
              display: true,
              labelString: 'Population',
              fontColor : "#696969",
              fontStyle: 'bold',
              fontSize: 16
            },
            stacked: true,
          }],
          xAxes: [{
            ticks:{
              fontColor : "#696969",
              fontSize : 16
            },
            gridLines:{
              color: "#C0C0C0",
              lineWidth: 0
            },
            scaleLabel: {
              display: true,
              labelString: 'Mortality Rate per 100K People',
              fontColor : "#696969",
              fontStyle: 'bold',
              fontSize: 16
            },
          }]
        },
        title: {
          display: true,
          text: 'Mortality Rate in Urban vs. Rural Living',
          fontSize: 22,
          fontColor : "#696969",
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || '';
              if (label) {
                  label += ': ';
              }
              label += Math.round(tooltipItem.xLabel * 100) / 100;
              return label;
            }
          }
        }
      }
    });
  });
};

buildRadar();
buildBar();
