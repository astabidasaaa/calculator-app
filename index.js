import React, {
  useState,
  useEffect,
  useReducer
} from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

const initialVal = {
  input: "",
  result: 0
};

function CalculatorApp() {
  const [input, setInput] = useState(initialVal.input);
  const [result, setResult] = useState(initialVal.result);
  // const [answer, setAnswer] = useState("");
  const [lastClicked, setLastClicked] = useState("");

  const handleInput = input;

  const handleResult = result;

  const handleClear = (e) => {
    setInput(initialVal.input);
    setResult(initialVal.result);
  };

  const handleOperator = (e) => {
    setLastClicked(e.target.value);
    setResult(e.target.value);
    setInput(input + e.target.value);
  };

  const handleNumber = (e) => {
    // console.log(e.target.value);
    if (result === 0) {
      setResult(e.target.value);
      setInput(e.target.value);
    } else if (/\*|\/|\+|\-/g.test(result)) {
      setResult(e.target.value);
      setInput(input + e.target.value);
    } else {
      setResult(result + e.target.value);
      setInput(input + e.target.value);
    }
  };

  const handleDecimal = (e) => {
    console.log(e.target.value);
  };

  const handleEqual = (e) => {
    setLastClicked(e.target.value);
    const answer = eval(input);
    setResult(answer);
    setInput(input + e.target.value + answer);
  };

  return (
    <div className="w-screen mx-auto h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="calculator-display flex flex-col items-center justify-center">
        <div className="screen">
          <Input inputs={handleInput} />
          <Result results={handleResult} />
        </div>
        <div>
          <Buttons
            clears={handleClear}
            operators={handleOperator}
            numbers={handleNumber}
            decimals={handleDecimal}
            equals={handleEqual}
          />
        </div>
      </div>
    </div>
  );
}

function Input({ inputs }) {
  return <div className="input-screen">{inputs}</div>;
}

function Result({ results }) {
  return (
    <div id="display" className="result-screen">
      {results}
    </div>
  );
}

function Buttons({ clears, operators, numbers, decimals, equals }) {
  return (
    <div className="buttons">
      <button id="clear" className="btn clear-btn" value="AC" onClick={clears}>
        AC
      </button>
      <button
        id="divide"
        className="btn divide operation-btn"
        value="/"
        onClick={operators}
      >
        /
      </button>
      <button
        id="multiply"
        className="btn multiply operation-btn"
        value="*"
        onClick={operators}
      >
        *
      </button>
      <button
        id="subtract"
        className="btn subtract operation-btn"
        value="-"
        onClick={operators}
      >
        -
      </button>
      <button
        id="add"
        className="btn add operation-btn"
        value="+"
        onClick={operators}
      >
        +
      </button>
      <button
        id="nine"
        className="btn nine number-btn"
        value="9"
        onClick={numbers}
      >
        9
      </button>
      <button
        id="eight"
        className="btn eight number-btn"
        value="8"
        onClick={numbers}
      >
        8
      </button>
      <button
        id="seven"
        className="btn seven number-btn"
        value="7"
        onClick={numbers}
      >
        7
      </button>
      <button
        id="six"
        className="btn six number-btn"
        value="6"
        onClick={numbers}
      >
        6
      </button>
      <button
        id="five"
        className="btn five number-btn"
        value="5"
        onClick={numbers}
      >
        5
      </button>
      <button
        id="four"
        className="btn four number-btn"
        value="4"
        onClick={numbers}
      >
        4
      </button>
      <button
        id="three"
        className="btn three number-btn"
        value="3"
        onClick={numbers}
      >
        3
      </button>
      <button
        id="two"
        className="btn two number-btn"
        value="2"
        onClick={numbers}
      >
        2
      </button>
      <button
        id="one"
        className="btn one number-btn"
        value="1"
        onClick={numbers}
      >
        1
      </button>
      <button
        id="zero"
        className="btn zero number-btn"
        value="0"
        onClick={numbers}
      >
        0
      </button>
      <button
        id="decimal"
        className="btn decimal-btn"
        value="."
        onClick={decimals}
      >
        .
      </button>
      <button id="equals" className="btn equal-btn" value="=" onClick={equals}>
        =
      </button>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <CalculatorApp />
  </React.StrictMode>,
  document.getElementById("app")
);
