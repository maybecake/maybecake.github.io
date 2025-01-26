// For use with difficulty.
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

function generateQuestion(maxNumber, operation, noNegatives) {
    let a = Math.floor(Math.random() * maxNumber);
    let b = Math.floor(Math.random() * maxNumber);
    let s = a + b;

    const question = document.createElement('div');
    question.classList.add('question-block', 'simple');
    switch (operation) {
        case '-':
            if (noNegatives && b > a) { [a, b] = [b, a]; }
            s = a - b;
            break;
    }

    const whichBlank = Math.floor(Math.random() * 3);
    const box = '<div class="solution-box">&nbsp;</div>';
    switch (whichBlank) {
        case 0:
            a = box; break;
        case 1: b = box; break;
        default: s = box;
    }
    question.innerHTML = `
        <span class="operand">${a}</span>
        <span class="operation">${operation}</span>
        <span class="operand">${b}</span>
        <span class="equal">=</span>
        <span class="solution">${s}</span>`;
    return question;
}

export function generateSimpleQuestions(
    numQuestions,
    operations,
    allowNegatives,
    maxNumber,
    difficulty,
    minNumber,
    homeworkContainer
) {
    const options = {
        maxNumber: Number(maxNumber),
        minNumber: Number(minNumber),
        allowNegatives,
        operations: operations.split(","),
        difficulty
    };

    for (let i = 0; i < numQuestions; i++) {
        const operation = options.operations[Math.floor(Math.random() * options.operations.length)];
        // Fix the random number generation
        let a = Number(minNumber) + Math.floor(Math.random() * (Number(maxNumber) - Number(minNumber) + 1));
        let b = Number(minNumber) + Math.floor(Math.random() * (Number(maxNumber) - Number(minNumber) + 1));
        let s;

        // Calculate result based on operation
        switch (operation) {
            case '+':
                s = a + b;
                break;
            case '-':
                if (!allowNegatives && b > a) {
                    [a, b] = [b, a];
                }
                s = a - b;
                break;
            case '×':
                s = a * b;
                break;
            default:
                s = a + b;
        }

        const question = document.createElement('div');
        question.classList.add('question-block', 'simple');

        const whichBlank = Math.floor(Math.random() * 3);
        const box = '<div class="solution-box">&nbsp;</div>';
        let displayA = a, displayB = b, displayS = s;

        switch (whichBlank) {
            case 0: displayA = box; break;
            case 1: displayB = box; break;
            default: displayS = box;
        }

        question.innerHTML = `
            <span class="operand">${displayA}</span>
            <span class="operation">${operation}</span>
            <span class="operand">${displayB}</span>
            <span class="equal">=</span>
            <span class="solution">${displayS}</span>`;

        homeworkContainer.appendChild(question);
    }
}

function generateSimpleQuestion(options) {
    const { maxNumber, minNumber, allowNegatives, operations } = options;
    const operation = operations[Math.floor(Math.random() * operations.length)];

    // Generate numbers between minNumber and maxNumber
    const num1 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    const num2 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

    let s = num1 + num2;

    const question = document.createElement('div');
    question.classList.add('question-block', 'simple');
    switch (operation) {
        case '-':
            if (allowNegatives && num2 > num1) { [num1, num2] = [num2, num1]; }
            s = num1 - num2;
            break;
    }

    const whichBlank = Math.floor(Math.random() * 3);
    const box = '<div class="solution-box">&nbsp;</div>';
    switch (whichBlank) {
        case 0:
            num1 = box; break;
        case 1: num2 = box; break;
        default: s = box;
    }
    question.innerHTML = `
        <span class="operand">${num1}</span>
        <span class="operation">${operation}</span>
        <span class="operand">${num2}</span>
        <span class="equal">=</span>
        <span class="solution">${s}</span>`;
    return question;
}
