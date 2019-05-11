// build out all the gauge charts

function buildMetadata() {

  var elements = document.getElementsByClassName("flexbox");
    while(elements.length > 0){
      elements[0].parentNode.innherHTML="";
  }

  var zipCode = d3.select("#zipcode").node()
    ? d3.select("#zipcode").node().value
    : 22201;
  console.log({ zipCode });

  d3.json(`/userData/${zipCode}`)
    .then(data => {
      buildEduGauge(data[0].NoHighSchoolDiploma);
      buildIncomeGauge(data[0].Per_Capita_Income);
      buildDisabilityGauge(data[0].Disability)
    })
    .catch(err => {
      console.error(err);
      alert(`You have entered an invalid zip code. Please try again.`);
    });
}

// Initialize the dashboard
buildMetadata();
