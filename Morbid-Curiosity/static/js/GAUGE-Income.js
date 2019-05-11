function buildIncomeGauge(income) {

  var level = (((income/1000) - 5)/ (65 - 5)) * 180;
  // level = level.toLocaleString();
  // income = income.toLocaleString();
    // console.log(level);

    var g = new JustGage({
      id: 'income-gauge',
      value: income,
      min: 0,
      max: 70000,
      symbol: '$',
      pointer: true,
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
      relativeGaugeSize: true
    });
};