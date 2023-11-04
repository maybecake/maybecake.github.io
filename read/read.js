import { BOOKS } from "./books.js";

const CONFIDENCE_THRESHOLD = 0.6;

const AUDIO_SYMBOL = '🔊';

const loadVoiceOptions = () => {
    const voices = speechSynthesis.getVoices();
    const voiceSel = document.getElementById('voice');

    while (voiceSel.firstChild) {
        voiceSel.removeChild(voiceSel.firstChild);
    }
    for (const v of voices) {
        const option = document.createElement('option');
        option.value = v.name;
        option.innerHTML = v.name;
        voiceSel.appendChild(option);
    }

    // Select a default english voice.
    const voice = voices.filter((v) =>
        v.name.includes('Google') && v.name.includes('English'));
    if (voice.length > 0) {
        voiceSel.value = voice[0].name;
    }
};

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

const createBook = (book) => {
  const containerEl = document.getElementById("main");

  if (containerEl.firstChild?.title == book.title) {
    console.log("book already loaded.");
    return;
  }

  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }

  const bookEl = document.createElement("div");
  bookEl.title = book.title;
  bookEl.className = "book";
  for (const page of book.pages) {
    createPage(bookEl, page);
  }
  bookEl.firstChild.removeAttribute("hidden");
  containerEl.appendChild(bookEl);

  // Add controls
  let i = 1;
  for (const pageEl of bookEl.children) {
    const controlsEl = document.createElement("div");
    controlsEl.className = "controls";

    const prevEl = document.createElement("button");
    prevEl.innerText = "< Page";
    if (pageEl.previousSibling) {
      prevEl.onclick = () => {
        pageEl.setAttribute("hidden", "");
        pageEl.previousSibling.removeAttribute("hidden");
      };
    } else {
      prevEl.setAttribute("disabled", "");
    }
    controlsEl.appendChild(prevEl);

    const pageNumberEl = document.createElement("div");
    pageNumberEl.innerText = i++ + " / " + book.pages.length;
    controlsEl.appendChild(pageNumberEl);

    if (pageEl.nextSibling) {
      const nextEl = document.createElement("button");
      nextEl.innerText = "Page >";
      nextEl.onclick = () => {
        pageEl.setAttribute("hidden", "");
        pageEl.nextSibling.removeAttribute("hidden");
      };
      controlsEl.appendChild(nextEl);
    }
    pageEl.insertBefore(controlsEl, pageEl.firstChild);

    // Add picture if available.
    console.log("pics?", i - 2, book.pictures.length, book.pictures[i - 2]);
    if (book.pictures.length > i - 2 && book.pictures[i - 2]) {
      const pictureEl = document.createElement("img");
      pictureEl.src = "img/" + book.pictures[i - 2];
      pictureEl.width = 516;
      pageEl.insertBefore(pictureEl, pageEl.firstChild);
    }
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
};

const createSentence = (containerEl, sentence) => {
  const sentenceEl = document.createElement("div");
  sentenceEl.className = "sentence";

  // Add play button.
  const playBtn = document.createElement("button");
  playBtn.innerHTML = AUDIO_SYMBOL;
  playBtn.onclick = () => {
    readText(sentence);
  };
  sentenceEl.appendChild(playBtn);

  let i = 0;
  for (const word of sentence
    .split(/(\W+)/)
    .filter((item) => item.trim().length > 0)) {
    const cardBtn = document.createElement("button");
    cardBtn.innerText = word;
    cardBtn.word = word.toLowerCase();
    cardBtn.setAttribute("draggable", "true");

    if (/^[a-zA-Z]/.test(word)) {
      cardBtn.onclick = () => {
        clickWord(cardBtn);
      };
      cardBtn.index = i++;
      cardBtn.classList.add("card");
    } else {
      cardBtn.classList.add("punctuation");
    }
    sentenceEl.appendChild(cardBtn);
  }
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
    };
    customSentenceEl.appendChild(customSentence);
    customSentenceEl.addText = (text) => {
        customSentence.innerText += ' ' + text;
    };

    const delBtn = document.createElement('button');
    delBtn.innerHTML = '◀';
    delBtn.onclick = () => {
        const lastSpace = customSentence.innerText.lastIndexOf(' ');
        if (lastSpace)
            customSentence.innerText =
                customSentence.innerText.substring(0, lastSpace);
    };
    customSentenceEl.appendChild(delBtn);


    const clearBtn = document.createElement('button');
    clearBtn.innerHTML = '♻';
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
    return containerEl.querySelectorAll('*[active]');
};

const loadBooks = (books) => {
    const bookSel = document.getElementById('book');
    for (const book of books) {
        const option = document.createElement('option');
        option.value = book.title;
        option.innerHTML = book.title;
        bookSel.appendChild(option)
    }
    bookSel.onchange = (e) => {
        const book = books.filter((book) => book.title == e.target.value)[0];
        createBook(book);
    }
}

window.onload = () => {
    loadVoiceOptions();
    window.speechSynthesis.onvoiceschanged = () => {
        loadVoiceOptions();
    };

    loadBooks(BOOKS);

    // Create the book.
    const book = createBook(BOOKS[0]);

    // Generate custom sentences.
    document.getElementById('addCustom').onclick = () => {
        createCustom(document.getElementById('custom-sentences-out'));
    };

    document.getElementById('settings-toggle').onclick = () => {
        const settingsEl = document.getElementById('settings-content');
        console.log('settings', settingsEl);
        settingsEl.toggleAttribute('hidden');
    };
};
