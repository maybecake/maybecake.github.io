// Simple server in powershell: python -m http.server

const SpeechRecognition = webkitSpeechRecognition;
const SpeechGrammarList = webkitSpeechGrammarList;
// const SpeechRecognitionEvent = webkitSpeechRecognitionEvent;


//['The', 'big', 'fat', 'cat', 'is', 'red'];
// 'A fat bat can run fast'.split(' ');
const BOOK = [
    'the big rat ran to winry . a small bat flew past the pink monkey .',
    'why is a bat in the bag ?',
    'the man is in the fast van',
    'is this a map to the lab ?',
    'I have the ham in the pan .'
]
const SENTENCE = BOOK[0].split(' ');
const PUNCTUATION = ',.?!';

// Set up grammer with words from sentence.
const uniqueWords = [...new Set(SENTENCE)].filter((w) =>
    !PUNCTUATION.includes(w));
const grammer = '#JSGF V1.0; grammar words; public <word> = ' +
    uniqueWords.join(` | `) + ' ;';
console.log('grammer:', grammer);

const grammerList = new SpeechGrammarList();
grammerList.addFromString(grammer, 1);

const CONFIDENCE_THRESHOLD = 0.6;

// Currently active card index.
let activeIndex;
let activeCards = [];

// Current custom sentence.
let activeCustom;

let rec = new SpeechRecognition();
rec.continuous = true;
rec.lang = 'en-US';
rec.interimResults = true;
rec.maxAlternatives = 1;

const getActiveCard = () => {
    if (activeIndex >= 0 && activeIndex < activeCards.length)
        return activeCards[activeIndex];
    return;
}

rec.onresult = (e) => {
    console.log('speech results.', e);

    const results = [];
    for (let i = 0; i < e.results.length; i++) {
        const res = e.results[i];
        for (let j = 0; j < res.length; j++) {
            console.log(`${i},${j}`, res[j].confidence, res[j].transcript)
            if (res[j].confidence > CONFIDENCE_THRESHOLD)
                results.push(res[j].transcript);
        }
    }

    console.log('results:', results);
    if (results.length == 0) return;

    const activeCard = getActiveCard();
    console.log('activeCard?', activeCard, activeIndex);
    if (!activeCard) return;

    const text = activeCard.word;

    for (r of results) {
        console.log(text, 'in', r, '?');
        if (r.includes(text)) {
            activeCard.className = '';
            activeCard.classList.add('card', 'correct');
            // rec.stop();
            // console.log('stopped!');
            activateNext();
        }
    }
}

rec.onspeechend = (e) => {
    console.log('speech ended.', e);
    const activeCard = getActiveCard();
    if (activeCard)
        activeCard.classList.replace('active', 'wrong');
}

rec.onnomatch = (e) => {
    console.log('no match!');
}

const activateNext = () => {
    let activeCard = getActiveCard();
    if (activeCard)
        activeCard.classList.replace('active', 'wrong');

    activeIndex++;
    activeCard = getActiveCard();
    if (activeCard)
        activeCard.classList.add('active');
};

const activateWord = (card) => {
    let activeCard = getActiveCard();
    if (activeCard)
        activeCard.className = 'card';

    card.className = '';
    card.classList.add('active', 'card');
    activeIndex = card.index;
    rec.start();
}

const readText = (text) => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    speechSynthesis.speak(msg);
};

const clickWord = (card) => {
    const action = document.getElementById('action');
    console.log(action.value, card);
    switch (action.value) {
        case 'read': readText(card.innerText);
            break;
        case 'listen': activateWord(card);
            break;
    }

    if (activeCustom)
        activeCustom.innerText += ' ' + card.innerText;
};

const createSentence = (container, sentenceId, sentence, cards) => {
    const play = document.getElementById('play');
    play.onclick = () => { readText(sentence.join(' ')); };

    let i = 0;
    for (const word of sentence) {
        const card = document.createElement('div');
        card.innerText = word;
        card.word = word.toLowerCase();

        if (!PUNCTUATION.includes(word)) {
            card.onclick = () => {
                clickWord(card);
            };
            card.index = i++;
            cards.push(card);
            card.classList.add('card');
        } else {
            card.classList.add('punc');
        }
        container.appendChild(card);
    }
    activeIndex = -1;
};

const createBook = () => {

};

window.onload = () => {
    createSentence(document.getElementById('main'), '0', SENTENCE, activeCards);

    document.getElementById('listen').onclick = () => {
        activateNext();
        rec.start();
    };

    document.getElementById('addCustom').onclick = () => {
        const out = document.getElementById('out');

        const cs = document.createElement('div');
        const play = document.createElement('button');
        play.innerText = 'play';
        play.onclick = () => {
            readText(cs.innerText)
        };

        const clear = document.createElement('button');
        clear.innerText = 'X';
        clear.onclick = () => {
            out.removeChild(row);
        };

        const row = document.createElement('div');
        row.appendChild(play);
        row.appendChild(cs);
        row.appendChild(clear);

        out.appendChild(row);
        activeCustom = cs;
    };
}

