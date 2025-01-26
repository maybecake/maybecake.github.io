// Multi digit addition

function generateQuestion(maxNumber, operation, noNegatives) {
    let a = Math.floor(Math.random() * (maxNumber));
    let b = Math.floor(Math.random() * (maxNumber));
    if (operation == '-' && noNegatives && b > a) [a, b] = [b, a];

    const question = document.createElement('div');
    question.classList.add('question-block', 'multi-digit');
    question.innerHTML = `
        <div class="multi-digit-number">${a}</div>
        <div class="multi-digit-number"><span style="float:left">${operation}</span>${b}</div>
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

export function generateMultiDigitQuestions(
    numQuestions,
    operations,
    allowNegatives,
    maxNumber,
    minNumber,
    homeworkContainer
) {
    const options = {
        maxNumber: Number(maxNumber),
        minNumber: Number(minNumber),
        allowNegatives,
        operations: operations.split(","),
        numQuestions
    };

    for (let i = 0; i < numQuestions; i++) {
        const operation = options.operations[Math.floor(Math.random() * options.operations.length)];
        // Fix the random number generation
        let a = Number(minNumber) + Math.floor(Math.random() * (Number(maxNumber) - Number(minNumber) + 1));
        let b = Number(minNumber) + Math.floor(Math.random() * (Number(maxNumber) - Number(minNumber) + 1));

        if (operation === '-' && !allowNegatives && b > a) {
            [a, b] = [b, a];
        }

        const question = document.createElement('div');
        question.classList.add('question-block', 'multi-digit');
        question.innerHTML = `
            <div class="multi-digit-number">${a}</div>
            <div class="multi-digit-number"><span style="float:left">${operation}</span>${b}</div>
            <div class="multi-digit-answer"></div>
        `;
        homeworkContainer.appendChild(question);
    }
}
