
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
    homeworkContainer,
) {
    const operationSymbols = operations.split(",");
    for (let i = 0; i < numQuestions; i++) {
        const operation =
            operationSymbols[Math.floor(Math.random() * operationSymbols.length)];
        homeworkContainer.appendChild(
            generateQuestion(maxNumber, operation, !allowNegatives));
    }
};
