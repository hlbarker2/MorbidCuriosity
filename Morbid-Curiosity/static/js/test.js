// build out all the gauge charts

function buildMetadata() {
  var zipCode = d3.select("#zipcode").node()
    ? d3.select("#zipcode").node().value
    : 22201;
  console.log({ zipCode });

  d3.json(`/userData/${zipCode}`)
    .then(data => {
      // buildGauge(data[0].LifeExpectancy);
      buildEduGauge(data[0].NoHighSchoolDiploma);
      buildIncomeGauge(data[0].Per_Capita_Income);
      // buildPovertyGauge(data[0].Poverty);
      buildDisabilityGauge(data[0].Disability)
    })
    .catch(err => {
      console.error(err);
      alert(`You have entered an invalid zip code. Please try again.`);
    });
  // clear any existing metadata
  // zipCode.html("");
}

// Initialize the dashboard
buildMetadata();
