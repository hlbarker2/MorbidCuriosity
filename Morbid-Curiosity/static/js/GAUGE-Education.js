var g3

function buildEduGauge(NoHighSchoolDiploma) {

  var level = (NoHighSchoolDiploma) / 60 * 180;
  // console.log(level);

  if (!g3) {

    g3 = new JustGage({
      id: 'edu-gauge',
      value: NoHighSchoolDiploma,
      min: 0,
      max: 60,
      symbol: '%',
      pointer: false,
      label: "No High School Diploma",
      pointerOptions: {
        toplength: -15,
        bottomlength: 10,
        bottomwidth: 5,
        color: '#125EE3',
        stroke: '#125EE3',
        stroke_width: 1,
        stroke_linecap: 'round'
      },
      gaugeWidthScale: 0.6,
      counter: true,
      relativeGaugeSize: true,
      levelColors: ["#48d1cc"]
    });
  }
  else g3.refresh(NoHighSchoolDiploma);

};