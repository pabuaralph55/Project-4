const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');
const backSpace = document.querySelector('.backSpace');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display value is 0, replace it, if not add number to display value
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  // If operator pressed, don't add decimal
  if (awaitingNextValue) return;
  // If no decimal, add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Operations Functions
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

// Calculate first and second values depending on operator
const operate= {

  '/': (firstNumber, secondNumber) => divide(firstNumber, secondNumber),

  '*': (firstNumber, secondNumber) => multiply(firstNumber, secondNumber),

  '+': (firstNumber, secondNumber) => add(firstNumber, secondNumber),

  '-': (firstNumber, secondNumber) => subtract(firstNumber, secondNumber),

  '=': (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = operate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

function bckSpace(){
  calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -1)
  if(calculatorDisplay.textContent === ""){calculatorDisplay.textContent = '0';}
}

// Add Event Listeners for numbers, operators, decimal
for(let i = 0; i < inputBtns.length; i++){
  inputBtns[i].addEventListener('click', function(){
    calculator(inputBtns[i].value);
  });
}

// Reset all values, display
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

// Clear Event Listener
clearBtn.addEventListener('click', resetAll);

// Back Space Event Listener
backSpace.addEventListener('click', bckSpace);

//Keyboard Support
document.addEventListener('keypress',(e) => calculator(e.key));
document.addEventListener('keydown', function(event) {
  const key = event.key; 
  if (key === "Backspace") {
      bckSpace();
  }
  if (key === "Escape") {
    resetAll();
  }
  if (key === "Enter") {
    useOperator('=');
  }
});

function calculator(key){
  switch(key){
    case '0':
      sendNumberValue(key);
      break;
    case '1':
      sendNumberValue(key);
      break;
    case '2':
      sendNumberValue(key);
      break;  
    case '3':
      sendNumberValue(key);
      break;
    case '4':
      sendNumberValue(key);
      break;
    case '5':
      sendNumberValue(key);
      break; 
    case '6':
      sendNumberValue(key);
      break;
    case '7':
      sendNumberValue(key);
      break;
    case '8':
      sendNumberValue(key);
      break; 
    case '9':
      sendNumberValue(key);
      break;  
    case '+':
      useOperator(key);
      break;
    case '*':
      useOperator(key);
      break;
    case '/':
      useOperator(key);
      break; 
    case '-':
      useOperator(key);
      break;  
    case '=':
      useOperator(key);
      break;  
    case '.':
      addDecimal();
      break; 
    default:
  }
}