import { generateMultiAddQuestions } from "./math_add.mjs"

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
  difficulty,
  mathHomeworkRowsElement,
) {
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


const typeDropdown = document.getElementById("type-dropdown");
const operationDropdown = document.getElementById("operation-dropdown");
const numRowsInput = document.getElementById("num-rows");
const allowNegativesCheckbox = document.getElementById("allow-negatives");
const maxNumberInput = document.getElementById("max-number");
const difficultySlider = document.getElementById("difficulty-slider");

const simpleControls = document.getElementById("simple-controls")
const multiAddControls = document.getElementById("multi-add-controls")

typeDropdown.addEventListener("change", updateQuestions);
operationDropdown.addEventListener("change", updateQuestions);
allowNegativesCheckbox.addEventListener("change", updateQuestions);
maxNumberInput.addEventListener("input", updateQuestions)
difficultySlider.addEventListener("input", updateQuestions);
numRowsInput.addEventListener("input", updateQuestions);


function showControls(controls) {
  simpleControls.className = 'hidden';
  multiAddControls.className = 'hidden';
  controls.className = '';
}


function updateQuestions() {
  const numRows = numRowsInput.value;
  const type = typeDropdown.value;
  const operation = operationDropdown.value;
  const allowNegatives = allowNegativesCheckbox.checked;
  const maxNumber = maxNumberInput.value;
  const difficulty = difficultySlider.value;

  removeAllChildren(mathHomeworkRowsElement);

  switch (type) {
    case 'multi-add':
      showControls(multiAddControls);
      generateMultiAddQuestions(
        18,
        4,
        mathHomeworkRowsElement,
      );
      break;
    default:
      showControls(simpleControls);
      generateQuestions(
        numRows,
        operation,
        allowNegatives,
        maxNumber,
        difficulty,
        mathHomeworkRowsElement
      );
  }
}

updateQuestions();
