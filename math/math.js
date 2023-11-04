function generateSingleMathQuestion(num1, num2, noNegatives = true) {
  const operationSymbols = ["+", "-"];
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

function generateTwoMathQuestions(num1, num2, num3, num4) {
  // Generate two random math questions.
  const question1 = generateSingleMathQuestion(num1, num2);
  const question2 = generateSingleMathQuestion(num3, num4);

  // Return the two math questions as a single string.
  return `
      <td>${question1}</td>
      <td>${question2}</td>
    `;
}

function generateRandomNumbersWithProbability(probability) {
  // Generate a random number between 0 and 1.
  const randomNumber = Math.random();

  // If the random number is less than the probability, generate a number smaller than 10.
  // Otherwise, generate a number larger than or equal to 10.
  if (randomNumber < probability) {
    return Math.floor(Math.random() * (15 - 10) + 10);
  } else {
    return Math.floor(Math.random() * 10);
  }
}

// Generate a list of 4-tuple numbers, less than 20.
const numRows = 20;
const difficulty = 0.3;

const numbers = [];
for (let i = 0; i < numRows; i++) {
  const innerNumbers = [];
  for (let j = 0; j < 4; j++) {
    innerNumbers.push(generateRandomNumbersWithProbability(0.3));
  }
  numbers.push(innerNumbers);
}

const mathHomeworkRowsElement = document.getElementById("math-homework-rows");

for (let i = 0; i < numbers.length; i++) {
  const mathQuestion = generateTwoMathQuestions(
    numbers[i][0],
    numbers[i][1],
    numbers[i][2],
    numbers[i][3]
  );
  const mathQuestionRowElement = document.createElement("tr");
  mathQuestionRowElement.innerHTML = mathQuestion;
  mathHomeworkRowsElement.appendChild(mathQuestionRowElement);
}
