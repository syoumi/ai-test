const fs = require('fs');

const {checkEquality} = require('./checkEquality');
const {removePunctuation} = require('./removePunctuation');
const {wordsFound} = require('./wordsFound');
const {getDistinct} = require('./getDistinct');
const {getPercent} = require('./getPercent');

const {MIN_STEP_TWO_PERCENT} = require('./../include/config');
const {MIN_STEP_THREE_PERCENT} = require('./../include/config');

var jsonData = fs.readFileSync('./resources/data.json');
var ignorable = fs.readFileSync('./resources/ignorable.json');

var data = JSON.parse(jsonData).data;


//Find match context: looking for intent that matchs text and intent.context.input == context.output
var findMatchContext = (text, context) => {
  var wordsTab = text.split(/[ ,;.]+/);

  for (var i = 0; i < wordsTab.length; i++) {
      wordsTab[i] = removePunctuation(wordsTab[i]);
  }

  var words = wordsTab.filter((element) => {
      return element != '';
  });

  //Intents where intent.context.input == context.output
  var intents= [];
  for (var i = 0; i < data.length; i++) {
    if(data[i].context.input==context.output)
      intents.push(data[i]);
  }


  var maxActionPercent = 0;
  var maxActionIndex = 0;

  for (var i = 0; i < intents.length; i++) {
    var maxEntryPercent = 0;
    for (var j = 0; j < intents[i].keywords.length; j++) {
      var percent = wordsFound(words, intents[i].keywords[j]);
      if (percent > maxEntryPercent) {
        maxEntryPercent = percent;
      }
    }

    if (maxEntryPercent > maxActionPercent) {
      maxActionPercent = maxEntryPercent;
      maxActionIndex = i;
    }
  }

  console.log(`STEP TWO RESULT : Action ${data[maxActionIndex].action} , percent ${maxActionPercent}`);

  if (maxActionPercent >= MIN_STEP_TWO_PERCENT) {
    return intents[maxActionIndex];
  }
  else {
    // If percentage is not enough use next method
    var maxPercent = 0;
    var maxIndex = 0;
    for (var i = 0; i < intents.length; i++) {
      var distincts = getDistinct(intents[i].keywords);
      var percent = getPercent(words, distincts);
      console.log('Percent found ' , percent);
      if (percent > maxPercent) {
        maxPercent = percent;
        maxIndex = i;
      }
    }

    if(maxPercent >= MIN_STEP_THREE_PERCENT)
      return intents[maxIndex];
    else {
      return undefined;
    }
  }
}


module.exports = {
  findMatchContext
}
