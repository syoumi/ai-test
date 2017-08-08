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
const {getContext} = require('./functions/handleContext');
const {setContext} = require('./functions/handleContext');
const {cleanContext} = require('./functions/handleContext');
const {saveUndefinedAnswer} = require('./functions/saveUndefinedAnswer');

const {MIN_PERCENT} = require('./include/config');


var jsonData = fs.readFileSync('./resources/data.json');
var ignorable = fs.readFileSync('./resources/ignorable.json');



var data = JSON.parse(jsonData).data;



// message example
var message = {
  senderID: 78518466,
  text: 'Test'
};

// answer example
var answer = {
  action: 'actionName',
  answer: 'one answer',
  context: {
    "id": -1,
    "input": '',
    "output": ''
  },
  parameters:''
};

// handling input, returning action + possible answers
var handleMessage = (message) => {
  var text = message.text.toLowerCase();
  if (text) {
    var entry = findExactMatch(text);

    if (entry) {
      // generating random answer
      console.log(entry.context);
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
  var foundEntry = undefined;
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
  senderID: 108,
  text: "appartement"
};

var answer = handleMessage(message);
//console.log((answer) ? answer : "Je n'ai pas compris ce que vous voulez dire.");

if(!answer) {
  saveUndefinedAnswer(message.text);
}
else{
  console.log(`Answer: ${answer.answer}`);
  var context= getContext(message.senderID);

  //Check if there's a context for that user
  if(context){
    if(context.output == answer.context.input){
      console.log(`Context: ${context.output}`);

      //TODO add something
      //verify if it's the right answer ?

      //For test
      //var answeer = getAnswer(data[context.id]);
      // FindMatch with data[context.id]

    }
    if(!answer.context.output)
      cleanContext(message.senderID);

  }

  //if answer got an output
  if(answer.context.output){
    var params='';
    if(answer.parameters==='?'){
      params= message.text;
    }
    setContext(message.senderID, answer.context, params);
  }

}
