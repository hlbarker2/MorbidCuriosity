// build out all the gauge charts

function buildMetadata() {
  var zipCode = d3.select("#zipcode").node()
    ? d3.select("#zipcode").node().value
    : 22201;
  //console.log({ zipCode });

  d3.json(`/userData/${zipCode}`)
    .then(data => {
      buildEduGauge(data[0].NoHighSchoolDiploma);
      compareEducation(data[0].NoHighSchoolDiploma);
      buildIncomeGauge(data[0].Per_Capita_Income);
      compareIncome(data[0].Per_Capita_Income);
      buildLifeExpectancyGauge(data[0].LifeExpectancy);
      compareLifeExpectancy(data[0].LifeExpectancy);
    })
    .catch(err => {
      //console.error(err);
      Swal.fire({
        title: "Try Again!",
        text: "No zip code (or we don't have the data for it)!",
        imageUrl:
          "https://thumbs.gfycat.com/RemorsefulSharpFowl-size_restricted.gif",
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: "Custom image",
        animation: false,
        backdrop: `rgba(0,0,123,0.4)`
      });
    });
  // }
}

// Initialize the dashboard
buildMetadata();
