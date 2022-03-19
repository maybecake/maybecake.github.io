// Simple server in powershell: python -m http.server

const SpeechRecognition = webkitSpeechRecognition;
const SpeechGrammarList = webkitSpeechGrammarList;
// const SpeechRecognitionEvent = webkitSpeechRecognitionEvent;

const BOOK = [
    // page
    [ // sentence
        'winry and hana went to the zoo .',
        'winry likes to look at animals ,',
        'the zoo has many animals .'
    ],
    ['hana saw a big pink monkey .',
        'she also saw a small rabbit .'],
    ['the rabbit hopped up and down .',
        'winry saw a yellow bird .',
        'winry is happy to see the bird .'],
    ['hana is looking for a snake .',
        'hana found a small snake with red dots .'],
    ['winry and hana had fun at the zoo.',
        'they saw a lot of animals.'],
];

const WINRY = ['winry hana'];

const BASIC_WORDS =
    'the of and a to in is that it was for on are as with they i she her at ' +
    'be this have from or one had by words but not what all were we when ' +
    'your can said there use an each which she do how their if will up other ' +
    'about out many then them these so some her would make like him into ' +
    'time has look two more write go see number no way could people my than ' +
    'first water been called who am its now find long down day did get come ' +
    'made may part'.split(' ');

const SHORTS = {
    'a': 'ant bat cat cad mat sat hat rat bat can man bad ran lad sad had fad tad',
    'e': 'bed led fed pen den men ten let net wet pet get set bet yet',
    'i': 'fit wit hit lit sit tin kin win pin pit big jig pig rig',
    'o': 'cot pot got hot lot rod pod cod log dog fog hog rob',
    'u': 'fun run sun pun rut gun hut nut shut cut mud tug rub tab grub',
};

const ANIMALS = [
    'pig rat rabbit monkey dog bear lion mouse fish shark',
];

const NUMBERS = [
    'one two three four five six seven eight nine ten',
];

const PUNCTUATION = ',.?!';
const CONFIDENCE_THRESHOLD = 0.6;

const AUDIO_SYMBOL = '&#128266;';

const loadVoiceOptions = () => {
    const voices = speechSynthesis.getVoices();
    const voiceSel = document.getElementById('voice');
    const selected = voiceSel?.value;

    for (const v of voices) {
        const option = document.createElement('option');
        option.value = v.name;
        option.innerHTML = v.name;
        voiceSel.appendChild(option);
    }

    if (!selected) {
        const voice = voices.filter((v) => v.name.includes('Google') && v.name.includes('English'));
        console.log(voice);
        if (voice.length > 0) {
            voiceSel.value = voice[0].name;
        }
    }
}

const readText = (text) => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;

    const voiceSel = document.getElementById('voice');
    if (voiceSel?.value) {
        msg.voice = speechSynthesis.getVoices()
            .filter((voice) => voice.name == voiceSel.value)[0];
    }

    const rateInput = document.getElementById('voice-rate');
    const pitchInput = document.getElementById('voice-pitch');
    //    msg.rate = parseFloat(rateInput.value);
    msg.pitch = parseFloat(pitchInput.value);

    console.log('read', msg);
    speechSynthesis.speak(msg);
};

const clickWord = (card) => {
    const action = document.getElementById('action');
    switch (action?.value) {
        case 'read': readText(card.innerText);
            break;
    }

    addCustomText(card.innerText);
};

const createBook = (containerEl, book) => {
    const bookEl = document.createElement('div');
    bookEl.className = 'book';
    for (const page of book) {
        createPage(bookEl, page);
    }
    bookEl.firstChild.removeAttribute('hidden');
    containerEl.appendChild(bookEl);

    let i = 1;
    for (const pageEl of bookEl.children) {
        const controlsEl = document.createElement('div');
        controlsEl.className = 'controls';

        const prevEl = document.createElement('button');
        prevEl.innerText = '< Page';
        if (pageEl.previousSibling) {
            prevEl.onclick = () => {
                pageEl.setAttribute('hidden', '');
                pageEl.previousSibling.removeAttribute('hidden');
            }

        } else {
            prevEl.setAttribute('disabled', '');
        }
        controlsEl.appendChild(prevEl);

        const pageNumberEl = document.createElement('div');
        pageNumberEl.innerText = i++ + ' / ' + book.length;
        controlsEl.appendChild(pageNumberEl);

        if (pageEl.nextSibling) {
            const nextEl = document.createElement('button');
            nextEl.innerText = 'Page >';
            nextEl.onclick = () => {
                pageEl.setAttribute('hidden', '');
                pageEl.nextSibling.removeAttribute('hidden');
            }
            controlsEl.appendChild(nextEl);
        }
        pageEl.insertBefore(controlsEl, pageEl.firstChild);
    }
};

const createPage = (containerEl, page) => {
    const pageEl = document.createElement('div');
    pageEl.className = 'page';
    for (const sentence of page) {
        createSentence(pageEl, sentence)
    }
    pageEl.setAttribute('hidden', '');
    containerEl.appendChild(pageEl);
}

const createSentence = (containerEl, sentence) => {
    const sentenceEl = document.createElement('div');
    sentenceEl.className = "sentence";

    // Add play button.
    const playBtn = document.createElement('button');
    playBtn.innerHTML = AUDIO_SYMBOL;
    playBtn.onclick = () => { readText(sentence); };
    sentenceEl.appendChild(playBtn);

    let i = 0;
    for (const word of sentence.split(' ')) {
        const cardBtn = document.createElement('button');
        cardBtn.innerText = word;
        cardBtn.word = word.toLowerCase();
        cardBtn.setAttribute('draggable', 'true');

        if (!PUNCTUATION.includes(word)) {
            cardBtn.onclick = () => {
                clickWord(cardBtn);
            };
            cardBtn.index = i++;
            cardBtn.classList.add('card');
        } else {
            cardBtn.classList.add('punctuation');
        }
        sentenceEl.appendChild(cardBtn);

    }
    activeIndex = -1;
    containerEl.appendChild(sentenceEl);
};

const createCustom = (containerEl) => {
    const customSentenceEl = document.createElement('div');
    customSentenceEl.className = 'custom-sentence';

    const playBtn = document.createElement('button');
    playBtn.innerHTML = AUDIO_SYMBOL;
    playBtn.onclick = () => {
        readText(customSentence.innerText)
    };
    customSentenceEl.appendChild(playBtn);

    const customSentence = document.createElement('div');
    customSentence.setAttribute('contenteditable', true);
    customSentenceEl.onclick = (e) => {
        setActiveCustom(customSentenceEl, /*add=*/ e.ctrlKey);
    }
    customSentenceEl.appendChild(customSentence);
    customSentenceEl.addText = (text) => {
        customSentence.innerText += ' ' + text;
    };

    const delBtn = document.createElement('button');
    delBtn.innerHTML = '&#9664;';
    delBtn.onclick = () => {
        const lastSpace = customSentence.innerText.lastIndexOf(' ');
        if (lastSpace)
            customSentence.innerText = customSentence.innerText.substring(0, lastSpace);
    };
    customSentenceEl.appendChild(delBtn);


    const clearBtn = document.createElement('button');
    clearBtn.innerHTML = '&#9851;';
    clearBtn.onclick = () => {
        containerEl.removeChild(customSentenceEl);
    };
    customSentenceEl.appendChild(clearBtn);

    setActiveCustom(customSentenceEl);
    containerEl.appendChild(customSentenceEl);
};

const addCustomText = (text) => {
    const els = getActiveCustoms();
    for (const el of els) {
        el.addText(text);
    }
};

const setActiveCustom = (customSentenceEl, add = false) => {
    if (!add) {
        const containerEl = document.getElementById('custom-sentences-out');
        for (const cs of containerEl.children) {
            cs.removeAttribute('active');
        }
    }
    customSentenceEl.setAttribute('active', '');
};

const getActiveCustoms = () => {
    const containerEl = document.getElementById('custom-sentences-out');
    console.log(containerEl.querySelectorAll('*[active]'));
    return containerEl.querySelectorAll('*[active]');
}

window.onload = () => {
    // const allShort = Object.values(SHORTS)
    //     .reduce((a, b) => a + ' ' + b);
    //     const shortWords = allShort.split(' ').filter((e) => Math.random() >
    //     0.3);

    loadVoiceOptions();
    window.speechSynthesis.onvoiceschanged = () => {
        loadVoiceOptions();
    };

    // Create the book.
    const book = createBook(
        document.getElementById('main'),
        BOOK);

    // Generate custom sentences.
    document.getElementById('addCustom').onclick = () => {
        createCustom(document.getElementById('custom-sentences-out'));
    };
}
