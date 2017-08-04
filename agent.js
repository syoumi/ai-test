// TODO
// 1. add ignorable words
// 2. add synonyms
// 3. add similar words

const fs = require('fs');

const {removePunctuation} = require('./functions/removePunctuation');
const {wordsFound} = require('./functions/wordsFound');

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
      var entry = findMatch(text, 10);
      if (entry) {
        // generating random index
        var index = parseInt(Math.random() * entry.answers.length);
        return {
          action: entry.action,
          answer: entry.answers[index]
        };
      } else {
        return undefined;
      }
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

var findMatch = (text, minPercent) => {
  var words = text.split(/[ ,;.]+/);
  for (var i = 0; i < words.length; i++) {
    words[i] = removePunctuation(words[i]);
  }

  var maxActionPercent = 0;
  var maxActionIndex = 0;
  for (var i = 0; i < data.length; i++) {
    var maxEntryPercent = 0;
    for (var j = 0; j < data[i].keywords.length; j++) {
      var percent = wordsFound(words, data[i].keywords[j]);
      if (percent > maxEntryPercent) {
        maxEntryPercent = percent;
      }
    }
    if (maxEntryPercent > maxActionPercent) {
      maxActionPercent = maxEntryPercent;
      maxActionIndex = i;
    }
  }


  console.log(words);
  console.log(`Action ${data[maxActionIndex].action} , percent ${maxActionPercent}`);

  if (maxActionPercent >= minPercent) {
    console.log('Thats it');
    return data[maxActionIndex];
  }
  else {
    // TODO use next method
    return undefined;
  }
};


var message = {
  input: undefined,
  output: undefined,
  text: "Je veux vraiment un autre test"
};


var answer = handleMessage(message).answer;
console.log((answer) ? answer : "J'ai pas compris ce que vous voulez dire");
