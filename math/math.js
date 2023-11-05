function generateSingleMathQuestion(
  num1,
  num2,
  noNegatives = true,
  operations = "+,-"
) {
  const operationSymbols = operations.split(",");
  const operationSymbol =
    operationSymbols[Math.floor(Math.random() * operationSymbols.length)];

  const box = `<input type="number" class="box">`;
  let a = num1;
  let b = num2;

  // Randomly place the box in the question.
  if (Math.random() < 0.3) {
    // First operand is always bigger.
    if (noNegatives && operationSymbol == "-") {
      a = Math.max(num1, num2);
      b = Math.min(num1, num2);
    }
    return `${a} ${operationSymbol} ${b} = ${box}`;
  } else {
    // Sum is always bigger or equal to operands.
    if (noNegatives && operationSymbol == "+") {
      a = Math.min(num1, num2);
      b = Math.max(num1, num2);
    }
    if (Math.random() < 0.5) {
      return `${a} ${operationSymbol} ${box} = ${b}`;
    } else {
      return `${box} ${operationSymbol} ${a} = ${b}`;
    }
  }
}

function generateTwoMathQuestions(
  num1,
  num2,
  num3,
  num4,
  allowNegatives,
  operations
) {
  // Generate two random math questions.
  const question1 = generateSingleMathQuestion(
    num1,
    num2,
    allowNegatives,
    operations
  );
  const question2 = generateSingleMathQuestion(
    num3,
    num4,
    allowNegatives,
    operations
  );

  // Return the two math questions as a single string.
  return `
      <td>${question1}</td>
      <td>${question2}</td>
    `;
}

function generateRandomNumbersWithProbability(probability, maxNumber) {
  // Generate a random number between 0 and 1.
  const randomNumber = Math.random();

  // If the random number is less than the probability, generate a number smaller than 10.
  // Otherwise, generate a number larger than or equal to 10.
  if (randomNumber < probability) {
    return Math.floor(Math.random() * (maxNumber - 10) + 10);
  } else {
    return Math.floor(Math.random() * 10);
  }
}

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

const mathHomeworkRowsElement = document.getElementById("math-homework-rows");

function generateQuestions(
  numRows,
  operations,
  allowNegatives,
  maxNumber,
  difficulty
) {
  removeAllChildren(mathHomeworkRowsElement);

  // Generate a list of 4-tuple numbers, less than 20.
  difficulty = difficulty / 100.0;

  const numbers = [];
  for (let i = 0; i < numRows; i++) {
    const innerNumbers = [];
    for (let j = 0; j < 4; j++) {
      innerNumbers.push(
        generateRandomNumbersWithProbability(difficulty, maxNumber)
      );
    }
    numbers.push(innerNumbers);
  }

  for (let i = 0; i < numbers.length; i++) {
    const mathQuestion = generateTwoMathQuestions(
      numbers[i][0],
      numbers[i][1],
      numbers[i][2],
      numbers[i][3],
      allowNegatives,
      operations
    );
    const mathQuestionRowElement = document.createElement("tr");
    mathQuestionRowElement.innerHTML = mathQuestion;
    mathHomeworkRowsElement.appendChild(mathQuestionRowElement);
  }
}

const numRowsInput = document.getElementById("num-rows");
const operationDropdown = document.getElementById("operation-dropdown");
const allowNegativesCheckbox = document.getElementById("allow-negatives");
const maxNumberInput = document.getElementById("max-number");
const difficultySlider = document.getElementById("difficulty-slider");

operationDropdown.addEventListener("change", function () {
  // Update the difficulty of the questions based on the selected operation.
  updateDifficulty();
});

allowNegativesCheckbox.addEventListener("change", function () {
  // Update the difficulty of the questions based on whether or not negative numbers are allowed.
  updateDifficulty();
});

maxNumberInput.addEventListener("input", function () {
  // Update the difficulty of the questions based on the maximum number allowed.
  updateDifficulty();
});

difficultySlider.addEventListener("input", function () {
  // Update the difficulty of the questions based on the difficulty slider.
  updateDifficulty();
});

numRowsInput.addEventListener("input", function () {
  // Update the difficulty of the questions based on the number of rows.
  updateDifficulty();
});

function updateDifficulty() {
  const numRows = numRowsInput.value;
  const operation = operationDropdown.value;
  const allowNegatives = allowNegativesCheckbox.checked;
  const maxNumber = maxNumberInput.value;
  const difficulty = difficultySlider.value;

  const questions = generateQuestions(
    numRows,
    operation,
    allowNegatives,
    maxNumber,
    difficulty
  );
}

updateDifficulty();
