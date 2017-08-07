// TODO
// 1. add ignorable words
// 2. add synonyms
// 3. add similar words

const fs = require('fs');

const {removePunctuation} = require('./functions/removePunctuation');
const {wordsFound} = require('./functions/wordsFound');
const {getDistinct} = require('./functions/getDistinct');
const {getPercent} = require('./functions/getPercent');
const {checkEquality} = require('./functions/checkEquality');
const {getAnswer} = require('./functions/getAnswer');

const {MIN_PERCENT} = require('./include/config');


var jsonData = fs.readFileSync('./resources/data.json');
var ignorable = fs.readFileSync('./resources/ignorable.json');
var unsaved = fs.readFileSync('./resources/unsaved.json');

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
  var text = message.text.toLowerCase();
  if (text) {
    var entry = findExactMatch(text);

    if (entry) {
      // generating random answer
      return getAnswer(entry);

    } else {
      var entry = findMatch(text, MIN_PERCENT);
      if (entry) {
        // generating random answer
        return getAnswer(entry);

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
      if (checkEquality(text, keyword)) {
        foundEntry = entry;
      }
    });
  });
  return foundEntry;
};

var findMatch = (text, minPercent) => {
  var wordsTab = text.split(/[ ,;.]+/);

  for (var i = 0; i < wordsTab.length; i++) {
    wordsTab[i] = removePunctuation(wordsTab[i]);
  }
  var words = wordsTab.filter((element) => {
    return element != '';
  });

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
    // var distincts = getDistinct(data[0].keywords);
    // console.log(distincts);
    // console.log(getPercent(words, distincts));

    var maxPercent = 0;
    var maxIndex = 0;
    for (var i = 0; i < data.length; i++) {
      var distincts = getDistinct(data[i].keywords);
      var percent = getPercent(words, distincts);
      console.log('Percent found ' , percent);
      if (percent > maxPercent) {
        maxPercent = percent;
        maxIndex = i;
      }
    }
    console.log(`Percent ${maxPercent}, action ${data[maxIndex].action}`);
    if(maxPercent >= minPercent)
      return data[maxIndex];
    else {
      return undefined;
    }
  }
};


var message = {
  input: undefined,
  output: undefined,
  text: "Bonjour. ça va?"
};

var answer = handleMessage(message);
console.log((answer) ? answer : "J'ai pas compris ce que vous voulez dire.");

if(!answer) {
  fs.readFile('./resources/unsaved.json', 'utf8', function readFileCallback(err){
      if (err)
          console.log(err);
      else
        fs.writeFile('./resources/unsaved.json', unsaved + JSON.stringify(message) , 'utf8');
  });
}
