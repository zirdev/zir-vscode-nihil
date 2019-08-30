
const one = '123 s'.match(/^(\d{3})(?:\s)(\w+)$/)
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;

module.exports = [
    // {
    //     "scope": [
    //     ],
    //     "settings": { "foreground": "#9cdcfe", },
    // },
    {
        "scope": [
            "keyword.operator.quantifier.regexp",
            "keyword.operator.quantifier.regexp.js",
        ],
        "settings": { "foreground": "#b5cea8", },
    },
    {
        "scope": [
            "string.regexp",
            "constant.regexp",
        ],
        "settings": { "foreground": "#d16969", },
    },
    {
        "scope": [
            "constant.character.escape.backslash.regexp",
        ],
        "settings": { "foreground": "#d7ba7d", },
    },
    {
        "scope": [
            "constant.other.character-class.regexp",
        ],
        "settings": { "foreground": "#4ec9b0", },
    },
    {
        "scope": [
            "keyword.control.anchor.regexp",
            "constant.other.character-class.regexp",
        ],
        "settings": { "foreground": "#569cd6", },
    },
    {
        "scope": [
            "punctuation.definition.group.regexp",
            "punctuation.definition.character-class.regexp",
        ],
        "settings": { "foreground": "#d4d4d4", },
    },
];

one; re; animalCount