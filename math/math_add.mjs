// Multi digit addition

function formatMultiAddMathQuestion(
    num1,
    num2,
) {
    const question = document.createElement('div');
    question.className = 'question-block';
    question.innerHTML = `
        <div class="multi-digit-number">${num1}</div>
        <div class="multi-digit-number"><span style="float:left">+</span>${num2}</div>
        <div class="multi-digit-answer"></div>
    `
    return question;
}

function generateRandomInteger(minDigits, maxDigits) {
    // Ensure minDigits is less than or equal to maxDigits
    if (minDigits > maxDigits) {
        throw new Error("minDigits must be less than or equal to maxDigits");
    }

    // Create the lower and upper bounds of the number range based on digits
    const min = Math.pow(10, minDigits - 1);
    const max = Math.pow(10, maxDigits) - 1;

    // Generate a random number within the specified range
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMultiAddQuestions(
    numRows,
    maxDigits,
    mathHomeworkRowsElement,
) {
    for (let i = 0; i < numRows; i++) {
        mathHomeworkRowsElement.appendChild(
            formatMultiAddMathQuestion(
                generateRandomInteger(2, maxDigits),
                generateRandomInteger(2, maxDigits),))
    }
}
