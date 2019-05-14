var g2
function buildLifeExpectancyGauge(life) {

  if (!g2) {
    
    g2 = new JustGage({
      id: 'life-gauge',
      value: life,
      min: 60,
      max: 90,
      decimals: 2,
      symbol: ' yrs',
      pointer: false,
      label: "Life Expectancy",
      gaugeWidthScale: 0.6,
      counter: true,
      relativeGaugeSize: true,
      levelColors: ["#eb2d1f"]
    });
  }
  else g2.refresh(life);

};
