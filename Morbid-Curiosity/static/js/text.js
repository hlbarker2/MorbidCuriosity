function compareIncome(income) {
    
    var avg_income = 24066
    var difference = (income - avg_income).toFixed(0);
  
    if (difference > 0)
      {value = "above";}
    if (difference === 0)
      {value = "equal to";}
    if (difference < 0)
      {value = "below";}

    var abs = Math.abs(difference).toLocaleString();
    var income_format = income.toLocaleString();
    var avg_income_format = avg_income.toLocaleString();

    var income_string = `Your area's per capita income is $${abs} ${value} the national average of $${avg_income_format}.`;
    
    document
      .getElementById("income-text")
      .innerHTML = income_string
      ;
}

function compareDisability(disability) {

  var avg_disability = 15.54;

  var difference = (((disability - avg_disability)/avg_disability) * 100).toFixed(2)
  var abs = Math.abs(difference);

  if (difference > 0) 
    {value = "above";}
  if (difference === 0) 
    {value = "equal to";}
  if (difference < 0) 
    {value = "below";}
    
  var disability_string = `Your area's population with disability is ${abs}% ${value} the national average of ${avg_disability}%.`;

  document.getElementById("disability-text").innerHTML = disability_string;
}

function compareEducation(education) {

  var avg_education = 15.01;

  var difference = (((education - avg_education)/avg_education) * 100).toFixed(2)
  var abs = Math.abs(difference);

  if (difference > 0) 
    {value = "above";}
  if (difference === 0) 
    {value = "equal to";}
  if (difference < 0) 
    {value = "below";}
    
  var edu_string = `Your area's population with no high school diploma is ${abs}% ${value} the national average of ${avg_education}%.`;

  document.getElementById("edu-text").innerHTML = edu_string;
}