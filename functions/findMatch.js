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

var findMatch = (text) => {
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

  console.log(`STEP TWO RESULT : Action ${data[maxActionIndex].action} , percent ${maxActionPercent}`);

  if (maxActionPercent >= MIN_STEP_TWO_PERCENT) {
    return data[maxActionIndex];
  }
  else {
    // If percentage is not enough use next method

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
    console.log(`STEP THREE RESULT : Percent ${maxPercent}, action ${data[maxIndex].action}`);

    if(maxPercent >= MIN_STEP_THREE_PERCENT)
      return data[maxIndex];
    else {
      return undefined;
    }
  }
};

module.exports = {
  findMatch
};
