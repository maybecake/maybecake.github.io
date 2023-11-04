function generateSingleMathQuestion(num1, num2) {
  // Generate a random operation symbol.
  const operationSymbols = ["+", "-"];
  const operationSymbol =
    operationSymbols[Math.floor(Math.random() * operationSymbols.length)];

  // Randomly place the box in the question.
  if (Math.random() < 0.3) {
    return `${num1} ${operationSymbol} ${num2} = <input type="number" class="box">`;
  } else if (Math.random() < 0.5) {
    return `${num1} ${operationSymbol} <input type="number" class="box"> = ${num2}`;
  } else {
    return `<input type="number" class="box"> ${operationSymbol} ${num1} = ${num2}`;
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
        return Math.floor(Math.random() * (20 - 10) + 10);
    } else {
        return Math.floor(Math.random() * 10);
    }
  }

// Generate a list of 4-tuple numbers, less than 20.
const numRows = 20;
const difficulty = 0.3

const numbers = [];
for (let i = 0; i < numRows; i++) {
  const innerNumbers = [];
  for (let j = 0; j < 4; j++) {
    innerNumbers.push(generateRandomNumbersWithProbability(.3));
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
