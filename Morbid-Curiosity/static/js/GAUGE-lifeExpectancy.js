var g2
function buildLifeExpectancyGauge(life) {

  if (!g2) {

    g2 = new JustGage({
      id: "life-gauge",
      value: life,
      min: 60,
      max: 90,
      symbol: " yrs",
      pointer: true,
      decimals: 2,
      label: "Life Expectancy",
      pointerOptions: {
        toplength: -15,
        bottomlength: 10,
        bottomwidth: 5,
        color: "#EB2D1F",
        stroke: "#ffffff",
        stroke_width: 1,
        stroke_linecap: "round"
      },
      gaugeWidthScale: 0.6,
      counter: true,
      relativeGaugeSize: true
    });

  } else g2.refresh(life);

    };

