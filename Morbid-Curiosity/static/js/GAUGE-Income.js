var g1

function buildIncomeGauge(income) {

  var level = (((income/1000) - 5)/ (65 - 5)) * 180;
  // level = level.toLocaleString();
  // income = income.toLocaleString();
    // console.log(level);

  if (!g1) {

    g1 = new JustGage({
      id: 'income-gauge',
      value: income,
      min: 0,
      max: 70000,
      symbol: '$',
      pointer: false,
      label: "Per Capita Income",
      pointerOptions: {
        toplength: -15,
        bottomlength: 10,
        bottomwidth: 5,
        color: '#EB2D1F',
        stroke: '#ffffff',
        stroke_width: 1,
        stroke_linecap: 'round'
      },
      gaugeWidthScale: 0.6,
      counter: true,
      relativeGaugeSize: true,
      levelColors: ["#125ee3"],
      titleMinFontSize: "8px",
      titleFontColor: ["#999"],
      color: ["#125ee3"]
    });
  } 
  else g1.refresh(income);

};
