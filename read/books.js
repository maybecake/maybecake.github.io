class Book {
  pages = [];
  constructor(title, content, pictures = []) {
    this.title = title;
    this.pages = content;
    this.pictures = pictures;
  }
}

const BASIC_WORDS =
  "the of and a to in is that it was for on are as with they i she her at " +
  "be this have from or one had by words but not what all were we when " +
  "your can said there use an each which she do how their if will up other " +
  "about out many then them these so some her would make like him into " +
  "time has look two more write go see number no way could people my than " +
  "first water been called who am its now find long down day did get come " +
  "made may part".split(" ");

const SHORT_WORDS = {
  a: "ant bat cat cad mat sat hat rat bat can man bad ran lad sad had fad tad",
  e: "bed led fed pen den men ten let net wet pet get set bet yet",
  i: "fit wit hit lit sit tin kin win pin pit big jig pig rig",
  o: "cot pot got hot lot rod pod cod log dog fog hog rob",
  u: "fun run sun pun rut gun hut nut shut cut mud tug rub tab grub",
};

const ANIMALS = ["pig rat rabbit monkey dog bear lion mouse fish shark"];

const ADJECTIVES = ["big small huge tall short thin fat round"];

const NUMBERS = ["one two three four five six seven eight nine ten"];

const MUD_BOOK = new Book("Winry Makes Mud", [
  [
    "winry likes to play with mud .",
    "she wants to find mud .",
    "winry thinks .",
  ],
  [
    "winry looked in the bed room .",
    "she looked in the bath room .",
    "winry did not see any mud .",
  ],
  ["winry looked out the window .", "she went out the door ."],
  ["winry went to the front yard .", "she went to the back yard ."],
  ["winry found some mud !", "she was very happy ."],
  ["winry played in the mud .", "the mud made winry very dirty ."],
  ["after playing with the mud ,", "winry washed her hands"],
]);

const ZOO_BOOK = new Book("Babies Go to the Zoo", [
  // page
  [
    // sentence
    "winry and hana went to the zoo .",
    "winry likes to look at animals ,",
    "the zoo has many animals .",
  ],
  ["hana saw a big pink monkey .", "she also saw a small rabbit ."],
  [
    "the rabbit hopped up and down .",
    "winry saw a yellow bird .",
    "winry is happy to see the bird .",
  ],
  ["hana is looking for a snake .", "hana found a small snake with red dots ."],
  ["winry and hana had fun at the zoo .", "they saw a lot of animals ."],
]);

const BEACH_BOOK = new Book("Babies Go to the Beach", [
  ["winry and hana went to the beach .", "it was a very sunny day ."],
  [
    "the beach is next to the ocean .",
    "the sun is very hot ,",
    "but the water was very cold .",
  ],
  [
    "hana ran into the water .",
    "winry also ran into the water .",
    "it is fun to be in the water .",
  ],
  [
    "winry sat in the sand .",
    "hana sat next to winry in the sand .",
    "winry and hana both like sand .",
  ],
  ["winry and hana had a fun day ,", "both girls took a nap ."],
]);

const WORD_BOOK = new Book("Word book", [
  [
    "the of and a to in is that it",
    "was for on are as with they",
    "i she her at be this have from",
  ],
  ["or one had by words but not", "what all were we when"],
]);

/* Generated from chat GPT with the following prompt:
"Write a story for a beginner reader about Adam.
 Adam is finding his daughter Winry. They are on Adam's head.
 Winry is hiding on adam's head. Adam is wondering what
 winry is doing on adam's head."
 */
const ADAM_FIND_WINRY = new Book("Adam Looks for Winry", [
  [
    "Adam was looking for his daughter Winry.",
    "He searched all over the house,",
    "but he couldn't find her.",
  ],
  [
    "He called her name, but he didn't hear a reply.",
    "He started to feel worried. Where could she be?",
  ],
  [
    "He decided to check the garden.",
    "Maybe she was playing with the flowers or the butterflies.",
    "He walked outside and looked around.",
  ],
  [
    "He still couldn't see her. He felt something tickle his ear.",
    "He reached up to scratch it, but he felt something soft and warm.",
    "He looked at his hand and saw a tiny Winry sitting on his palm.",
  ],
  ['"Winry! What are you doing on my head?"', "Adam asked in surprise."],
  [
    '"Hi, Daddy! I\'m playing hide and seek!" Winry said with a giggle.',
    '"Hide and seek? With whom?" Adam asked.',
    '"With you, of course!" Winry said.',
  ],
  [
    '"But I didn\'t know we were playing!" Adam said.',
    "\"That's why it's fun!",
    "You never know when I'm hiding on your head!\" Winry said.",
  ],
  [
    "Adam smiled and hugged his daughter.",
    "He was glad he found her.",
    "He didn't mind having her on his head.",
    "She was his little lovey-dovey.",
  ],
]);

/* Generated and tokenized via Bard. */
const ADAM_FIND_HANA = new Book("Adam finds Hana", [
  [
    'Once upon a time, there was a little girl named "Hana".',
    "She loved to play with her daddy.",
    "One day, they went to the park.",
  ],
  [
    "They played on the swings and the slide.",
    "They had a lot of fun.",
    "After a while, they decided to play hide-and-seek.",
  ],
  [
    "Hana hid behind a tree.",
    "Her daddy went to look for her.",
    "He looked and looked, but he couldn't find her.",
  ],
  [
    "Hana's daddy was starting to get worried.",
    "He didn't know where she could be.",
    "He was about to give up when he looked down at his hand.",
  ],
  [
    'And there, sitting in his palm, was Hana! "She had shrunk down!" Hana\'s daddy was so happy to find her.',
  ],
  [
    "He picked her up and gave her a big hug.",
    "'Where have you been?' he asked.",
    "'I was hiding,' Hana said. 'I wanted to see if you could find me.'",
  ],
  [
    "Hana's daddy laughed. 'Well, I found you,' he said. 'And I'm so glad I did.'",
    "Hana and her daddy played together all day long.",
    "They had so much fun, and they were both very happy.",
  ],
  [
    "At the end of the day, Hana's daddy took her home.",
    "He gave her a bath and put her to bed.",
    "Hana was so tired from all the fun she had had that she fell asleep right away.",
  ],
  [
    "The next morning, Hana woke up and she was her normal size again.",
    "She was so happy to be back to normal.",
    "She went downstairs and had breakfast with her daddy.",
  ],
  [
    "After breakfast, Hana and her daddy went back to the park.",
    "They played on the swings and the slide again.",
    "They had even more fun than they had the day before.",
  ],
  [
    "Hana and her daddy played together all day long.",
    "They had a wonderful time.",
    "They were both very happy.",
  ],
]);

/* Generated and tokenized via Bard. */
const WINRY_UNICORN = new Book(
  "Winry Finds a Unicorn",
  [
    ["Winry likes to go in the woods.", "She found a unicorn."],
    [
      "The unicorn was white and pretty.",
      "Winry wanted to take it home,",
      "but she knew the unicorn belonged in the woods.",
    ],
    ["Winry sat next to the unicorn.", "She talked to it."],
    [
      "The unicorn listened.",
      'Winry said, "You are pretty."',
      'The unicorn said, "Thank you."',
    ],
    [
      'Winry said, "I love you."',
      'The unicorn said, "I love you too."',
      "Winry went home.",
    ],
    [
      "She thought about the unicorn.",
      "She knew she made the right choice by not taking it home.",
      "The unicorn belonged in the woods.",
    ],
    [
      "The next day, Winry went back to the woods.",
      "She brought the unicorn a flower and a carrot.",
      "The unicorn was happy to see Winry.",
    ],
    [
      "They played and talked.",
      "Winry told the unicorn stories.",
      "The unicorn listened.",
    ],
    ["The unicorn told Winry stories.", "Winry listened."],
    [
      "Winry visited the unicorn every day.",
      "They were best friends.",
      "Winry loved the unicorn.",
      "The unicorn loved Winry.",
    ],
    ["Winry went home.", "She told her parents about the unicorn."],
    [
      'Her parents said, "You did the right thing by not taking the unicorn home.',
      'The unicorn belongs in the woods."',
      "Winry smiled. She knew she made the right choice.",
    ],
  ],
  ["", "winry_unicorn.png"]
);

/* Generated and tokenized via Bard. Prompt:

Write a simple story about a kindergarden girl named hana. Hana tries to walk
home alone, but gets a bit distracted by some animals. she comes home late and
doesn't have TV time.

The story should be about 4 paragraphs long and use very
simple words. Do not use words that are more than two syllables. Do not use any contractions.

Format the story as a 2d javascript array where each top level element is a
page and subarray elements are lines. Each page should have a max of 3 lines
and each line is shorter than 80 characters long.

Create new Book object constructor where the first parameter
is the name of the story and the second one is the array.

*/
const hanaAndTheDistraction = new Book("Hana and the Distraction", [
  ["Once upon a time, there was a kindergarten girl named Hana.", "Hana was a curious girl who loved to explore.", "One day, Hana was walking home from school when she saw a group of children playing in the park."],
  ["Hana stopped to watch the children play.", "They were playing tag and chasing each other around.", "Hana wanted to join in the fun, but she knew that she needed to go home."],
  ["Hana took a deep breath and started walking again.", "But after a few steps, she saw a squirrel in a tree.", "The squirrel was chasing an acorn, and Hana could not help but stop to watch again."],
  ["Hana watched the squirrel for a long time.", "She forgot all about time and her promise to go home.", "When she finally looked up, the sun was setting and she knew she was in trouble."],
  ["Hana ran as fast as she could, but she was still late.", "When she got home, her mom was waiting for her.", "Hana's mom was upset that Hana was late, but she was more upset that Hana had broken her promise."],
  ["Hana's mom told her that she could not watch TV that night because she was late.", "Hana was sad, but she knew that her mom was right.", "She learned her lesson that day: it is important to keep your promises and to be aware of your surroundings."],
]);

export const BOOKS = [
  WINRY_UNICORN,
  ADAM_FIND_HANA,
  ADAM_FIND_WINRY,
  MUD_BOOK,
  ZOO_BOOK,
  WORD_BOOK,
  BEACH_BOOK,
  hanaAndTheDistraction,
];

// for (let key in localStorage) {
//   if (key.startsWith('story')) {
//     localStorage.getItem()
//   }
// }


// localStorage.setItem("story-1", JSON.stringify('WINRY_UNICORN'))

/*
Write a simple story about a kindergarden girl named hana. Hana tries to walk
home alone, but gets a bit distracted by some animals. she comes home late and
doesn't have TV time. The story should be about 4 paragraphs long and use very
simple words. Do not use words that are more than two syllables. Do not use any contractions.

Format the story as a 2d javascript array where each top level element is a
page and subarray elements are lines. Each page should have a max of 3 lines
and each line is shorter than 80 characters long.

Create new Book object constructor where the first parameter
is the name of the story and the second one is the array.
*/