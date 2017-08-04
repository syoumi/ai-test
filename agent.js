// TODO
// 1. add ignorable words
// 2. add synonyms
// 3. add similar words

const fs = require('fs');

const {removePunctuation} = require('./functions/removePunctuation');

var jsonData = fs.readFileSync('./ressources/data.json');
var ignorable = fs.readFileSync('./ressources/ignorable.json');

var data = JSON.parse(jsonData).data;



// message example
var message = {
  input: undefined,
  output: undefined,
  text: 'Test'
};

// answer example
var answer = {
  action: 'actionName',
  answer: 'one answer'
};

// handling input, returning action + possible answers
var handleMessage = (message) => {
  var text = message.text;
  if (text) {
    var entry = findExactMatch(text);
    if (entry) {
      // generating random index
      var index = parseInt(Math.random() * entry.answers.length);
      return {
        action: entry.action,
        answer: entry.answers[index]
      };
    } else {
      return findMatch(text, 0);
    }
  } else {
    console.log('no text');
    return undefined;
  }
};

var findExactMatch = (text) => {
  text = text.toLowerCase().trim();
  foundEntry = undefined;
  data.forEach((entry) => {
    entry.keywords.forEach((keyword) => {
      if (keyword.toLowerCase() === text) {
        foundEntry = entry;
      }
    });
  });
  return foundEntry;
};

// TODO errors here
var findMatch = (text, minPercent) => {
  var words = text.split(/[ ,;.]+/);
  words.forEach((word) => {
    word = removePunctuation(word);
    console.log(word);
  });
  console.log(words);
};

var message = {
  input: undefined,
  output: undefined,
  text: "C'est! magnifique!, vraiment!"
};

var answer = handleMessage(message);
console.log((answer) ? answer : "J'ai pas compris ce que vous voulez dire");
