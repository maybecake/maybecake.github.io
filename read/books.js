class Book {
    pages = [];
    constructor(title, pages) {
        this.title = title;
        this.pages = pages;
    }

}

const ZOO_BOOK = new Book(
    'Winry and Hana Go to the Zoo',
    [
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
    ]);

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

// const allShort = Object.values(SHORTS)
//     .reduce((a, b) => a + ' ' + b);
//     const shortWords = allShort.split(' ').filter((e) => Math.random() >
//     0.3);

const ANIMALS = [
    'pig rat rabbit monkey dog bear lion mouse fish shark',
];

const NUMBERS = [
    'one two three four five six seven eight nine ten',
];

export const BOOKS = [ZOO_BOOK];