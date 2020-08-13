// ADD comments into the code
// write a summary into the Readme. on GitHub
// to be able to explain how the calculator works
// diagrams.net (drawio) if time, build a flow chart

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
      //   console.log("operator key!");
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      // Note: It's sufficient to check for firstValue and operator because secondValue always exists
      if (firstValue && operator && previousKeyType !== "operator") {
        display.textContent = calculate(firstValue, operator, secondValue);
      }

      // changes the color of the action key when it is pressed
      key.classList.add("is-depressed");

      // Add custom attribute to tell if the previous key is an operator key
      calculator.dataset.previousKeyType = "operator";

      //To get the operator
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;

      // Do nothing if string has a dot
      //   if (!displayedNum.includes(".")) {
      //     display.textContent = displayedNum + ".";
      //   }
    }

    // condition-what happens, if the pressed key has data-action called decimal
    if (action === "decimal") {
      //   console.log("decimal key!");

      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (previousKeyType === "operator") {
        display.textContent = "0.";
      }

      calculator.dataset.previousKeyType = "decimal";
    }

    // condition-what happens, if the pressed key has data-action called clear
    if (action === "clear") {
      //   console.log("clear key!");
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }

      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
    }

    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }

    // condition-what happens, if the pressed key has data-action called calculate (i.e. equal operator)
    if (action === "calculate") {
      //   console.log("equal key!");
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;

      //the second number
      const secondValue = displayedNum;

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
  // if the user presses + symbol, addition of the numbers will be perfomed
  if (operator === "add") return firstNum + secondNum;
  // if the user presses - symbol, subtraction of the numbers will be perfomed
  if (operator === "subtract") return firstNum - secondNum;
  // if the user presses * symbol, multiplication of the numbers will be perfomed
  if (operator === "multiply") return firstNum * secondNum;
  // if the user presses / symbol, division of the numbers will be perfomed
  if (operator === "divide") return firstNum / secondNum;
};
