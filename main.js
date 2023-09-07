const input = document.getElementById('input'); // input/output button
const numberButtons = document.querySelectorAll('.numbers div'); // number buttons
const operatorButtons = document.querySelectorAll('.operator div'); // operator buttons
const resultButton = document.getElementById('result'); // equal button
const clearButton = document.getElementById('clear'); // clear button
let resultDisplayed = false; // flag to keep an eye on what output is displayed

// Function to handle number button clicks
function handleNumberClick(e) {
  if (input.innerHTML == 0) {
    input.innerText = ''
  }
  
  let currentString = input.innerHTML;
  let lastChar = currentString[currentString.length - 1];

  if (resultDisplayed === false || (resultDisplayed === true && /[+\-×÷]/.test(lastChar))) {
    input.innerHTML += e.target.innerHTML;
    resultDisplayed = false;
  } else {
    input.innerHTML = e.target.innerHTML;
    resultDisplayed = false;
  }
}

// Function to handle operator button clicks
function handleOperatorClick(e) {
  let currentString = input.innerHTML;
  let lastChar = currentString[currentString.length - 1];

  if (/[\+\-×÷]/.test(lastChar)) {
    input.innerHTML = currentString.slice(0, -1) + e.target.innerHTML;
  } else if (currentString.length === 0) {
    alert("Enter a number first");
  } else {
    input.innerHTML += e.target.innerHTML;
  }
}

// Function to evaluate the expression
function evaluateExpression() {
  let inputString = input.innerHTML;
  let numbers = inputString.split(/[\+\-×÷]/g);
  let operators = inputString.replace(/[0-9]|\./g, "").split("");

  for (let operator of ['÷', '×', '-', '+']) {
    while (operators.includes(operator)) {
      let index = operators.indexOf(operator);
      let result;
      switch (operator) {
        case '÷':
          result = parseFloat(numbers[index]) / parseFloat(numbers[index + 1]);
          break;
        case '×':
          result = parseFloat(numbers[index]) * parseFloat(numbers[index + 1]);
          break;
        case '-':
          result = parseFloat(numbers[index]) - parseFloat(numbers[index + 1]);
          break;
        case '+':
          result = parseFloat(numbers[index]) + parseFloat(numbers[index + 1]);
          break;
      }
      numbers.splice(index, 2, result);
      operators.splice(index, 1);
    }
  }

  input.innerHTML = numbers[0];
  resultDisplayed = true;
}

// Event listeners for number buttons
numberButtons.forEach(button => {
  button.addEventListener("click", handleNumberClick);
});

// Event listeners for operator buttons
operatorButtons.forEach(button => {
  button.addEventListener("click", handleOperatorClick);
});

// Event listener for the equal button
resultButton.addEventListener("click", evaluateExpression);

// Event listener for the clear button
clearButton.addEventListener("click", function() {
  input.innerHTML = "0";
});
