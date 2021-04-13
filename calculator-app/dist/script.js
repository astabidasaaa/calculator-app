import React, {
useState,
useEffect,
useReducer } from
"https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

const initialVal = {
  input: "",
  result: "0",
  lastValue: "0",
  lastClicked: "" };


function CalculatorApp() {
  const [inputState, setInputState] = useState(initialVal.input),
  [resultState, setResultState] = useState(initialVal.result),
  [lastClickedState, setLastClickedState] = useState(initialVal.lastClicked),
  [lastValueState, setLastValueState] = useState(initialVal.lastValue),
  handleInput = inputState,
  handleResult = resultState;

  const isOperator = /[*/+-]/,
  endsWithOperator = /[*+-/]$/,
  endsWithNegativeSign = /\d[*/+-]{1}-$/,
  equalSign = "=";

  const maxDigitWarning = () => {
    setResultState("Digit Limit Met");
    setLastValueState(resultState);
    setTimeout(() => setResultState(lastValueState), 1000);
  };

  const handleClear = e => {
    setInputState(initialVal.input);
    setResultState(initialVal.result);
    setLastValueState(initialVal.lastValue);
    setLastClickedState(e.target.value);
  };

  const handleOperator = e => {
    if (!resultState.includes("Limit")) {
      const value = e.target.value;
      setResultState(value);
      setLastClickedState(e.target.value);
      if (lastClickedState === equalSign) {
        setInputState(lastValueState + value);
      } else if (!endsWithOperator.test(inputState)) {
        setLastValueState(inputState);
        setInputState(inputState + value);
      } else if (!endsWithNegativeSign.test(inputState)) {
        setInputState(
        (endsWithNegativeSign.test(inputState + value) ?
        inputState :
        lastValueState) + value);

      } else if (value !== "-") {
        setInputState(lastValueState + value);
      }
    }
  };

  const handleNumber = e => {
    if (!resultState.includes("Limit")) {
      setLastClickedState(e.target.value);

      const value = e.target.value;
      if (resultState.length > 21) {
        maxDigitWarning();
      } else if (lastClickedState === equalSign) {
        setResultState(value);
        setInputState(value !== "0" ? value : "");
      } else {
        setResultState(
        resultState === "0" || isOperator.test(resultState) ?
        value :
        resultState + value);

        setLastValueState(
        resultState === "0" || isOperator.test(resultState) ?
        value :
        resultState + value);

        setInputState(
        resultState === "0" && value === "0" ?
        inputState === "" ?
        value :
        inputState :
        /([^.0-9]0|^0)$/.test(inputState) ?
        inputState.slice(0, -1) + value :
        inputState + value);

      }
    }
  };

  const handleDecimal = e => {
    if (lastClickedState === equalSign) {
      setResultState("0.");
      setInputState("0.");
      setLastClickedState(e.target.value);
    } else if (!resultState.includes(".") && !resultState.includes("Limit")) {
      setLastClickedState(e.target.value);
      if (resultState.length > 21) {
        maxDigitWarning();
      } else if (
      endsWithOperator.test(inputState) ||
      resultState === "0" && inputState === "")
      {
        setResultState("0.");
        setInputState(inputState + "0.");
      } else {
        setResultState(inputState.match(/(-?\d+\.?\d*)$/)[0] + ".");
        setInputState(inputState + ".");
      }
    }
  };

  const handleEqual = e => {
    if (!resultState.includes("Limit")) {
      if (lastClickedState !== equalSign) {
        let expression = inputState;
        while (endsWithOperator.test(expression)) {
          expression = expression.slice(0, -1);
        }
        expression = expression.replace("--", "+0+0+0+0+0+0+");
        let answer =
        Math.round(1000000000000 * eval(expression)) / 1000000000000;

        setResultState(answer.toString());
        setInputState(expression.replace("+0+0+0+0+0+0+", "‑-") + "=" + answer);
        setLastValueState(answer);
        setLastClickedState(e.target.value);
      }
    }
  };

  return /*#__PURE__*/ (
    // <div className="w-screen mx-auto h-screen bg-gray-100 flex flex-col items-center justify-center">
    React.createElement("div", { className: "calculator-display flex flex-col items-center justify-center" }, /*#__PURE__*/
    React.createElement("div", { className: "screen" }, /*#__PURE__*/
    React.createElement(Input, { inputs: handleInput }), /*#__PURE__*/
    React.createElement(Result, { results: handleResult })), /*#__PURE__*/

    React.createElement(Buttons, {
      clears: handleClear,
      operators: handleOperator,
      numbers: handleNumber,
      decimals: handleDecimal,
      equals: handleEqual }), /*#__PURE__*/

    React.createElement("div", { id: "author" }, /*#__PURE__*/
    React.createElement("p", null, "by",
    " ", /*#__PURE__*/
    React.createElement("a", { href: "https://sngkr.netlify.app/", target: "_blank" }, "Sangkara"))))





    // </div>
  );
}

function Input({ inputs }) {
  return /*#__PURE__*/React.createElement("div", { className: "input-screen" }, inputs);
}

function Result({ results }) {
  return /*#__PURE__*/(
    React.createElement("div", { id: "display", className: "result-screen" },
    results));


}

function Buttons({ clears, operators, numbers, decimals, equals }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "buttons" }, /*#__PURE__*/
    React.createElement("button", { id: "clear", className: "btn clear-btn", value: "AC", onClick: clears }, "AC"), /*#__PURE__*/


    React.createElement("button", {
      id: "divide",
      className: "btn divide operation-btn",
      value: "/",
      onClick: operators }, "/"), /*#__PURE__*/



    React.createElement("button", {
      id: "multiply",
      className: "btn multiply operation-btn",
      value: "*",
      onClick: operators }, "*"), /*#__PURE__*/



    React.createElement("button", {
      id: "subtract",
      className: "btn subtract operation-btn",
      value: "-",
      onClick: operators }, "-"), /*#__PURE__*/



    React.createElement("button", {
      id: "add",
      className: "btn add operation-btn",
      value: "+",
      onClick: operators }, "+"), /*#__PURE__*/



    React.createElement("button", {
      id: "nine",
      className: "btn nine number-btn",
      value: "9",
      onClick: numbers }, "9"), /*#__PURE__*/



    React.createElement("button", {
      id: "eight",
      className: "btn eight number-btn",
      value: "8",
      onClick: numbers }, "8"), /*#__PURE__*/



    React.createElement("button", {
      id: "seven",
      className: "btn seven number-btn",
      value: "7",
      onClick: numbers }, "7"), /*#__PURE__*/



    React.createElement("button", {
      id: "six",
      className: "btn six number-btn",
      value: "6",
      onClick: numbers }, "6"), /*#__PURE__*/



    React.createElement("button", {
      id: "five",
      className: "btn five number-btn",
      value: "5",
      onClick: numbers }, "5"), /*#__PURE__*/



    React.createElement("button", {
      id: "four",
      className: "btn four number-btn",
      value: "4",
      onClick: numbers }, "4"), /*#__PURE__*/



    React.createElement("button", {
      id: "three",
      className: "btn three number-btn",
      value: "3",
      onClick: numbers }, "3"), /*#__PURE__*/



    React.createElement("button", {
      id: "two",
      className: "btn two number-btn",
      value: "2",
      onClick: numbers }, "2"), /*#__PURE__*/



    React.createElement("button", {
      id: "one",
      className: "btn one number-btn",
      value: "1",
      onClick: numbers }, "1"), /*#__PURE__*/



    React.createElement("button", {
      id: "zero",
      className: "btn zero number-btn",
      value: "0",
      onClick: numbers }, "0"), /*#__PURE__*/



    React.createElement("button", {
      id: "decimal",
      className: "btn decimal-btn",
      value: ".",
      onClick: decimals }, "."), /*#__PURE__*/



    React.createElement("button", { id: "equals", className: "btn equal-btn", value: "=", onClick: equals }, "=")));




}

ReactDOM.render( /*#__PURE__*/
React.createElement(React.StrictMode, null, /*#__PURE__*/
React.createElement(CalculatorApp, null)),

document.getElementById("app"));