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

function compareLifeExpectancy(life) {

    var avg_life = 77.76;
    var difference = (life - avg_life).toFixed(2);
    var abs = Math.abs(difference);

    if (difference > 0) {
      value = "above";
    } else if (difference === 0) {
      value = "equal to";
    } else if (difference <= 0) {
      value = "below";
    }
    
  var life_string = `Your area's life expectancy is ${abs} years ${value} the national average of ${avg_life} years.`

  document.getElementById("life-text").innerHTML = life_string;
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
};
