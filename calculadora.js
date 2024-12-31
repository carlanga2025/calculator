// Seleccionar los elementos necesarios
const screen = document.querySelector(".screen p");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let previousInput = "";
let operator = null;

// Función para actualizar la pantalla
function updateScreen(value) {
  screen.textContent = value;
}

// Función para manejar los clics de los botones
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const btnClass = button.classList;

    // Limpiar pantalla (AC)
    if (btnClass.contains("ac")) {
      currentInput = "0";
      previousInput = "";
      operator = null;
      updateScreen(currentInput);
      return;
    }

    // Cambiar signo (+/-)
    if (btnClass.contains("plus-minus")) {
      currentInput = (parseFloat(currentInput) * -1).toString();
      updateScreen(currentInput);
      return;
    }

    // Porcentaje
    if (btnClass.contains("percent")) {
      if (!currentInput || isNaN(parseFloat(currentInput))) {
        currentInput = "0"; // Manejar casos inválidos
      } else {
        // Si hay un operador previo, aplicar el porcentaje al número base
        if (previousInput && operator) {
          currentInput = (parseFloat(previousInput) * (parseFloat(currentInput) / 100)).toString();
        } else {
          // Si no hay operador previo, simplemente convertir el número actual en porcentaje
          currentInput = (parseFloat(currentInput) / 100).toString();
        }
      }
      updateScreen(currentInput);
      return;
    }
    
    

    // Operadores (+, -, *, /)
    if (btnClass.contains("plus") || btnClass.contains("minus") || btnClass.contains("multiply") || btnClass.contains("division")) {
      if (operator && previousInput) {
        currentInput = calculate();
        updateScreen(currentInput);
      }
      operator = button.textContent;
      previousInput = currentInput;
      currentInput = "";
      return;
    }

    // Igual (=)
    if (btnClass.contains("equals")) {
      if (operator && previousInput) {
        currentInput = calculate();
        updateScreen(currentInput);
        operator = null;
        previousInput = "";
      }
      return;
    }

    // Punto decimal
    if (btnClass.contains("quote")) {
      if (!currentInput.includes(".")) {
        currentInput += ".";
        updateScreen(currentInput);
      }
      return;
    }

    // Números
    if (btnClass.contains("zero") || btnClass.contains("one") || btnClass.contains("two") || btnClass.contains("three") ||
        btnClass.contains("four") || btnClass.contains("five") || btnClass.contains("six") ||
        btnClass.contains("seven") || btnClass.contains("eight") || btnClass.contains("nine")) {
      const number = button.textContent;
      currentInput = currentInput === "0" ? number : currentInput + number;
      updateScreen(currentInput);
    }
  });
});

// Función para realizar cálculos
function calculate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  switch (operator) {
    case "+":
      return (num1 + num2).toString();
    case "-":
      return (num1 - num2).toString();
    case "x":
      return (num1 * num2).toString();
    case "/":
      return num2 !== 0 ? (num1 / num2).toString() : "Error";
    default:
      return currentInput;
  }
}
