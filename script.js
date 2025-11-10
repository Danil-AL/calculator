const display = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let previousInput = "";
let operation = null;
let resetScreen = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function appendNumber(number) {
  if (currentInput === "0" && number === "0") return;

  if (currentInput === "0") {
    currentInput = number;
  } else {
    currentInput += number;
  }
}

function appendDecimal() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
}

function chooseOperation(op) {
  if (operation !== null && !resetScreen) calculate();
  previousInput = currentInput;
  operation = op;
  resetScreen = true;
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "÷":
      if (current === 0) {
        alert("Деление на ноль!");
        return;
      }
      result = prev / current;
      break;
    case "×":
      result = prev * current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operation = null;
  resetScreen = false;
}

function clearAll() {
  currentInput = "0";
  previousInput = "";
  operation = null;
  resetScreen = false;
}

function changeSign() {
  currentInput = (parseFloat(currentInput) * -1).toString();
}

function calculatePercent() {
  currentInput = (parseFloat(currentInput) / 100).toString();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const content = button.textContent;

    if (action === "number") {
      if (resetScreen) {
        currentInput = "";
        resetScreen = false;
      }
      appendNumber(content);
    } else if (action === "decimal") {
      appendDecimal();
    } else if (action === "operator") {
      chooseOperation(content);
    } else if (action === "calculate") {
      calculate();
    } else if (action === "clear") {
      clearAll();
    } else if (action === "sign") {
      changeSign();
    } else if (action === "percent") {
      calculatePercent();
    }

    updateDisplay();
  });
});

// Инициализация
updateDisplay();
