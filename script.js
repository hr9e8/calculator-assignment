//captures when the user clicks on the button
const userInput = document.querySelectorAll(".js-button");
const userDelete = document.querySelector(".js-delete-button"); 
const userSubmit = document.querySelector(".js-submit-button");

let userCalculation = [];
let calculateTotal = 0; 
let calculationSubmitted = false; 

//when button is clicked, store the value of the button in an array
userInput.forEach(function(button){
  button.addEventListener("click", function(event){
    //resets the array if user has submitted in the previous button click
    if(calculationSubmitted){
      userCalculation = [];
      calculationSubmitted = false; 
    }
    userCalculation.push(this.value);
    updateResults(userCalculation.join('')); 
  }); 
}); 

//when delete button is clicked, remove value from array
userDelete.addEventListener("click", function(event){
  userCalculation.pop();
  console.log(userCalculation);
}); 

userSubmit.addEventListener("click", function(event){
  //take all the array value and store it as a string. Convert X to *
  let calculationString = userCalculation.join('').replace(/X/g, '*');
  let validationResult = validateCalculation(calculationString);

  if (validationResult === 'Valid'){
    calculateResult(calculationString);
  } else {
    updateResults(validationResult); 
  }
  calculationSubmitted = true; 
});


function validateCalculation(expressions){
  //checking if operators are at the start or end of operations
  if(/^[+\-*/]|[-+*/]$/.test(expressions)){
    return "Error."; 
  }

  //checking if there's duplicate operators but allowing ++ & --
  if(/(?:[*/]{2,})|(?:\+{2,})|(?:-{3,})/.test(expressions)){
    return "Error."
  }

  //making sure brackets are on each side 
  let balance = 0; 
  for(let char of expressions){
    if(char === '(') balance++; 
    if(char=== ')') balance--; 
    if (balance < 0) return "Missing brackets."
  }
  if(balance !== 0) return "Missing brackets."

  return "Valid"; 
}; 

//calculate the string result
function calculateResult(calculationString){
  try{
    //Function constructor poses some security risk
    let resultFunction = new Function('return ' + calculationString);
    let result = resultFunction();
    // Update the display with the result
    updateResults(result.toString()); 
  } catch(error){
    updateResults("Error");
  }
}; 

function updateResults(userInput){
  let displayResults = document.querySelector('.js-results-output'); 
  displayResults.value = userInput;
}
