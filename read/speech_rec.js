// Speech recognition logic.

// const getSpeechRecognition = (words) => {
//     // Set up grammar with words from sentence.
//     const uniqueWords = [...new Set(words)].filter((w) =>
//         !PUNCTUATION.includes(w));
//     const grammar = '#JSGF V1.0; grammar words; public <word> = ' +
//         uniqueWords.join(` | `) + ' ;';
//     console.log('grammar:', grammar);

//     const grammarList = new SpeechGrammarList();
//     grammarList.addFromString(grammar, 1);

//     rec = new SpeechRecognition();
//     rec.grammars = grammarList;
//     rec.continuous = false;
//     rec.lang = 'en-US';
//     rec.interimResults = false;
//     rec.maxAlternatives = 1;

//     rec.onresult = (e) => {
//         console.log('speech results.', e);

//         const results = [];
//         for (let i = 0; i < e.results.length; i++) {
//             const res = e.results[i];
//             for (let j = 0; j < res.length; j++) {
//                 console.log(`${i},${j}`, res[j].confidence, res[j].transcript)
//                 if (res[j].confidence > CONFIDENCE_THRESHOLD)
//                     results.push(res[j].transcript);
//             }
//         }

//         console.log('results:', results);
//         if (results.length == 0) return;

//         const activeCard = getActiveCard();
//         console.log('activeCard?', activeCard, activeIndex);
//         if (!activeCard) return;

//         const text = activeCard.word;

//         for (r of results) {
//             console.log(text, 'in', r, '?');
//             if (r.includes(text)) {
//                 activeCard.className = '';
//                 activeCard.classList.add('card', 'correct');
//                 // rec.stop();
//                 // console.log('stopped!');
//                 activateNext();
//             }
//         }
//     }

//     rec.onspeechend = (e) => {
//         console.log('speech ended.', e);
//         const activeCard = getActiveCard();
//         if (activeCard)
//             activeCard.classList.replace('active', 'wrong');
//     }

//     rec.onnomatch = (e) => {
//         console.log('no match!');
//     }
// };