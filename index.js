// take an HTML element and assign it to a declared variable
const calculator = document.querySelector(".calculator");
// variable for ALL keys (numbers, operators, decimal, clear, equal)
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

// add action, what happens when the user presses any key (numbers, operators, decimal, clear, equal)
keys.addEventListener("click", (e) => {
  // condition - what happens if the user presses a key and the key is a HTML button
  // currently, there are buttons only in the .calculator__keys class, thus no ELSE statement
  if (e.target.matches("button")) {
    // constant variables declared
    // constant variable for any ONE key currently clicked, then gets the text content of the key
    const key = e.target;
    const keyContent = key.textContent;
    // constant variable for any of the ACTION keys only (not for numbers)
    const action = key.dataset.action;

    // constant variable, gets the text content of the calculator display
    const displayedNum = display.textContent;

    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    //replace the displayed number with clicked number
    const previousKeyType = calculator.dataset.previousKeyType;

    // condition - the pressed key doesn't have any data-action attr.
    // (what is supposed to happen if the user clicks on a number)
    if (!action) {
      if (
        // if the currently displayed number is 0 or
        displayedNum === "0" ||
        // or if the previously clicked key was an operator (+, -, *, /)
        previousKeyType === "operator" ||
        // or if the previously clicked key was an equal element (=)
        previousKeyType === "calculate"
        // then display the clicked number/the calculated result (replace the previously displayed number)
      ) {
        display.textContent = keyContent;
      } else {
        // otherwise append/add the clicked number to the already displayed number (e.g. 6, 5 => 65)
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }

    // condition-what happens, if the pressed key has data-action called add,subtract,multiply,or divide
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      // data entering the calculation
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue && operator && previousKeyType !== "operator") {
        // execute the calculation with below parameters
        display.textContent = calculate(firstValue, operator, secondValue);
      }

      // changes the color of the action key when it is pressed
      key.classList.add("is-depressed");

      // Add custom attribute to tell if the previous key is an operator key
      calculator.dataset.previousKeyType = "operator";

      calculator.dataset.firstValue = displayedNum;
      //get the operator to be used in calculation
      calculator.dataset.operator = action;
    }

    // condition-what happens, if the pressed key has data-action called decimal
    if (action === "decimal") {
      // if the input doesn't contain a dot already, then add it
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (previousKeyType === "operator") {
        // if the input starts with a dot then assume 0 at the start
        display.textContent = "0.";
      }

      calculator.dataset.previousKeyType = "decimal";
    }

    // condition-what happens, if the pressed key has data-action called clear
    if (action === "clear") {
      // if the text of the clear button is "AC" (type string) , clear all inputs
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        // change the text of the clear button back to "AC" (from "CE")
        key.textContent = "AC";
      }

      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
    }

    // after user clicks on any key, change the TEXT of the clear button from AC to CE
    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }

    // condition-what happens, if the pressed key has data-action called calculate (i.e. equal operator)
    // retreive previous input and current input then execute the calculation with these parameters
    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;

      //the second number
      const secondValue = displayedNum;

      // calculate
      display.textContent = calculate(firstValue, operator, secondValue);
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});

// Perform CALCULATION and return calculated value
const calculate = (n1, operator, n2) => {
  // n1 is the first entered number converted from a string to a decimal number
  // n2 is the second entered number converted from a string to a decimal number
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  // if the n1 string is not a number then return error
  if (isNaN(firstNum)) {
    return "Error";
  }
  // if the n2 string is not a number then return error
  if (isNaN(secondNum)) {
    return "Error";
  }
  let result;
  // if the user presses + symbol, addition of the numbers will be perfomed
  if (operator === "add") result = firstNum + secondNum;
  // if the user presses - symbol, subtraction of the numbers will be perfomed
  if (operator === "subtract") result = firstNum - secondNum;
  // if the user presses * symbol, multiplication of the numbers will be perfomed
  if (operator === "multiply") result = firstNum * secondNum;
  // if the user presses / symbol, division of the numbers will be perfomed
  if (operator === "divide") result = firstNum / secondNum;

  // if the result of the mathematical operation is not a number
  // or is not a finite number, return error
  if (isNaN(result) || !isFinite(result)) {
    return "Error";
  }
  return result;
};
