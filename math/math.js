import { generateMultiDigitQuestions } from "./math_multi_digit.mjs"
import { generateSimpleQuestions } from "./math_simple.mjs"


function updateDates(e) {
  console.log(e.target.value);
  document.getElementById("date-output").innerText = e.target.value ?? '____________';
}

const dateInput = document.getElementById("date-input");
dateInput.onchange = updateDates;
dateInput.valueAsDate = new Date();

const homeworkContainer = document.getElementById("math-homework-questions");


const typeDropdown = document.getElementById("type-dropdown");
const operationDropdown = document.getElementById("operation-dropdown");
const numQuestionsInput = document.getElementById("num-questions");
const allowNegativesCheckbox = document.getElementById("allow-negatives");
const maxNumberInput = document.getElementById("max-number");
const difficultySlider = document.getElementById("difficulty-slider");
const minNumberInput = document.getElementById("min-number");

const simpleControls = document.getElementById("simple-controls")
const multiDigitControls = document.getElementById("multi-digit-controls")

typeDropdown.addEventListener("change", updateQuestions);
operationDropdown.addEventListener("change", updateQuestions);
allowNegativesCheckbox.addEventListener("change", updateQuestions);
maxNumberInput.addEventListener("input", updateQuestions)
difficultySlider.addEventListener("input", updateQuestions);
numQuestionsInput.addEventListener("input", updateQuestions);
minNumberInput.addEventListener("input", updateQuestions);

document.getElementById("regenerate").addEventListener("click", updateQuestions);

function showControls(controls) {
  simpleControls.className = 'hidden';
  multiDigitControls.className = 'hidden';
  controls.className = '';
}

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function getOptions() {
  return {
    maxNumber: parseInt(document.getElementById("max-number").value),
    minNumber: parseInt(document.getElementById("min-number").value),
    allowNegatives: document.getElementById("allow-negatives").checked,
    operations: document.getElementById("operation-dropdown").value.split(","),
    numQuestions: parseInt(document.getElementById("num-questions").value),
    difficulty: parseInt(document.getElementById("difficulty-slider").value),
  };
}

function updateQuestions() {
  const numQuestions = numQuestionsInput.value;
  const type = typeDropdown.value;
  const operations = operationDropdown.value;
  const allowNegatives = allowNegativesCheckbox.checked;
  const maxNumber = maxNumberInput.value;
  const difficulty = difficultySlider.value;
  const minNumber = minNumberInput.value;

  removeAllChildren(homeworkContainer);

  switch (type) {
    case 'multi-digit':
      showControls(multiDigitControls);
      generateMultiDigitQuestions(
        numQuestions,
        operations,
        allowNegatives,
        maxNumber,
        minNumber,
        homeworkContainer
      );
      break;
    default:
      showControls(simpleControls);
      generateSimpleQuestions(
        numQuestions,
        operations,
        allowNegatives,
        maxNumber,
        difficulty,
        minNumber,
        homeworkContainer
      );
  }
}

updateQuestions();
