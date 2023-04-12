import React from 'react'
import './Calculator.css'

// Very similar to vanilla JS calculator app, except updated work with React State Management
function Calculator() {

    // use React state management to track the calculator object
    const [calculator, setCalculator] = React.useState({
        displayValue: "0",
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null
    })

    // same function from vanilla JS
    function calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
          case "+":
            return firstOperand + secondOperand;
          case "-":
            return firstOperand - secondOperand;
          case "*":
            return firstOperand * secondOperand;
          case "/":
            return firstOperand / secondOperand;
      
          default:
            console.log("incorrect operator !!");
            break;
        }
        return secondOperand;
    }

    // update all modifications to calculator using setCalculator
    // Added modifications at end of function to the last two setCalculator calls so that the function only calls setCalculator
    // once per execution
    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculator;
      
        const inputValue = parseFloat(displayValue);
        console.log(`HERE ${inputValue}`);
      
        if (operator && calculator.waitingForSecondOperand) {
          calculator.operator = nextOperator;
          setCalculator({
            ...calculator,
            operator: nextOperator
          });
          console.log(calculator);
          return;
        }
      
        if (firstOperand == null && !isNaN(inputValue)) {
        // modified setCalculator
          setCalculator({
            ...calculator,
            firstOperand: inputValue,
            waitingForSecondOperand: true,
            operator: nextOperator
          });
        } else if (operator) {
          console.log(`inside computations`);
          const result = calculate(firstOperand, inputValue, operator);
          console.log(`result is ${result}`);
      
        // modified set Calculator
          setCalculator({
            ...calculator,
            displayValue: `${parseFloat(result.toFixed(7))}`,
            firstOperand: result,
            waitingForSecondOperand: true,
            operator: nextOperator
          });
        }
    }

    // similar to original inputDecimal except using setCalculator
    function inputDecimal(dot) {
        if (calculator.waitingForSecondOperand === true) {
          setCalculator({
            ...calculator,
            displayValue: "0.",
            waitingForSecondOperand: false
          });
          return;
        }
      
        if (!calculator.displayValue.includes(dot)) {
          setCalculator((prevCalculator) => {
            return {
                ...prevCalculator,
                displayValue: prevCalculator.displayValue + dot
            }
          });
        }
    }

    // reset all elements of calculator using setCalculator
    function resetCalculator() {
        setCalculator({
            ...calculator,
            displayValue: "0",
            firstOperand: null,
            waitingForSecondOperand: false,
            operator: null
        });
        console.log(calculator);
    }

    function inputDigit(digit) {
        const { displayValue, waitingForSecondOperand } = calculator;
        console.log(displayValue)
      
        if (waitingForSecondOperand === true) {
          setCalculator({
            ...calculator,
            displayValue: digit,
            waitingForSecondOperand: false
          });
        } else {
            // Since the digit needs to be appended, use a callback function which gives access to the previous state of calculator
            setCalculator((prevCalculator) => {
                return {
                    ...prevCalculator,
                    displayValue: prevCalculator.displayValue === "0" ? digit : prevCalculator.displayValue + digit
                }
            })
        }
    }

    // replaced an event listener with a function called pressedKey that is pointed to in the onClick in JSX on calculator-keys
    // removed updateCalculator function since React handles this automatically
    function pressedKey(e) {
        const { target } = e;
        const { value } = target;
        if (!target.matches("button")) {
            return;
        }

        switch (value) {
            case "+":
            case "-":
            case "*":
            case "/":
            case "=":
            handleOperator(value);
            break;
            case ".":
            inputDecimal(value);
            break;
            case "all-clear":
            resetCalculator();
            break;
            default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
        }
    }

    // JSX is very similar to original calculator app, except that class is replaced by className
    // onclick={pressedKey} is added to replace the eventListener that was originally used on this element
  return (
    <div className="calculator">
      {/* <!-- calculator screen. disabled attribute prevents users from typing--> */}
      <input type="text" className="calculator-screen" value={calculator.displayValue} disabled />

      {/* <!-- wrapper for calculator keys --> */}
      <div className="calculator-keys" onClick={pressedKey}>
        {/* <!-- buttons for operators + - * / --> */}
        <button type="button" className="operator" value="+">+</button>
        <button type="button" className="operator" value="-">-</button>
        <button type="button" className="operator" value="*">&times;</button>
        <button type="button" className="operator" value="/">&divide;</button>

        {/* <!-- Number buttons top most row left to right--> */}
        <button type="button" value="7">7</button>
        <button type="button" value="8">8</button>
        <button type="button" value="9">9</button>

        {/* <!-- Number buttons middle row left to right --> */}
        <button type="button" value="4">4</button>
        <button type="button" value="5">5</button>
        <button type="button" value="6">6</button>

        {/* <!-- Number buttons lower row left to right --> */}
        <button type="button" value="1">1</button>
        <button type="button" value="2">2</button>
        <button type="button" value="3">3</button>

        {/* <!-- rest of the numbers and utilities --> */}
        <button type="button" value="0">0</button>
        <button type="button" className="decimal" value=".">.</button>
        <button type="button" className="all-clear" value="all-clear">AC</button>
        <button type="button" className="operator" id="equal-sign" value="=">
          =
        </button>
      </div>
    </div>
  )
}

export default Calculator