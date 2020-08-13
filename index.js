// ADD comments into the code
// write a summary into the Readme. on GitHub
// to be able to explain how the calculator works
// diagrams.net (drawio) if time, build a flow chart

const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    // Do something
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    //replace the displayed number with clicked number
    const previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }

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

    if (action === "decimal") {
      //   console.log("decimal key!");

      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (previousKeyType === "operator") {
        display.textContent = "0.";
      }

      calculator.dataset.previousKeyType = "decimal";
    }

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

// Perform calculation and return calculated value
//let’s say the user clicks the subtract operator.
// After they click the subtract operator, we set firstValue to n1.
// We set also operator to subtract.
const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === "add") return firstNum + secondNum;
  if (operator === "subtract") return firstNum - secondNum;
  if (operator === "multiply") return firstNum * secondNum;
  if (operator === "divide") return firstNum / secondNum;
};
