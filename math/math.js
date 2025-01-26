import { generateMultiDigitQuestions } from "./math_multi_digit.mjs"
import { generateSimpleQuestions } from "./math_simple.mjs"


function updateDates(e) {
  document.getElementById("date-output").innerText = e.target.value ?? '____________';
}

const dateInput = document.getElementById("date-input");
dateInput.onchange = updateDates;
dateInput.valueAsDate = new Date();
dateInput.dispatchEvent(new Event('change'));

const homeworkContainer = document.getElementById("math-homework-questions");

const typeDropdown = document.getElementById("type-dropdown");
const operationDropdown = document.getElementById("operation-dropdown");
const numQuestionsInput = document.getElementById("num-questions");
const allowNegativesCheckbox = document.getElementById("allow-negatives");
const maxNumberInput = document.getElementById("max-number");
const minNumberInput = document.getElementById("min-number");
const difficultySlider = document.getElementById("difficulty-slider");

const simpleControls = document.getElementById("simple-controls")
const multiDigitControls = document.getElementById("multi-digit-controls")

typeDropdown.addEventListener("change", updateQuestions);
operationDropdown.addEventListener("change", updateQuestions);
allowNegativesCheckbox.addEventListener("change", updateQuestions);
maxNumberInput.addEventListener("input", updateQuestions)
minNumberInput.addEventListener("input", updateQuestions);
difficultySlider.addEventListener("input", updateQuestions);
numQuestionsInput.addEventListener("input", updateQuestions);

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

function updateQuestions() {
  const numQuestions = numQuestionsInput.value;
  const type = typeDropdown.value;
  const operations = operationDropdown.value;
  const allowNegatives = allowNegativesCheckbox.checked;
  const maxNumber = parseInt(maxNumberInput.value);
  const minNumber = parseInt(minNumberInput.value);
  const difficulty = difficultySlider.value;

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
        minNumber,
        difficulty,
        homeworkContainer
      );
  }
}

updateQuestions();
