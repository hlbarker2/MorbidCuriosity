function buildEduGauge(NoHighSchoolDiploma) {

  var level = (NoHighSchoolDiploma) / 60 * 180;
  console.log(level);

  var g = new JustGage({
    id: 'edu-gauge',
    value: NoHighSchoolDiploma,
    min: 0,
    max: 60,
    symbol: '%',
    pointer: false,
    label: "% Without High School Diploma",
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
    relativeGaugeSize: true
  });
};