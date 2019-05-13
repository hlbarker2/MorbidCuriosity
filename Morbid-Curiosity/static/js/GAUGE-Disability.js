var g2

function buildDisabilityGauge(Disability) {

  var level = ((Disability - 5) / 35) * 180;
    // console.log(level);

  if (!g2) {
    
    g2 = new JustGage({
      id: 'disability-gauge',
      value: Disability,
      min: 0,
      max: 30,
      symbol: '%',
      pointer: false,
      label: "Disability Level",
      pointerOptions: {
        toplength: 8,
        bottomlength: -20,
        bottomwidth: 6,
        color: '#8e8e93'
      },
      gaugeWidthScale: 0.6,
      counter: true,
      relativeGaugeSize: true,
      levelColors: ["#eb2d1f"]
    });
  }
  else g2.refresh(Disability);

};