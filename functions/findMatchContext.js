const fs = require('fs');

const {checkEquality} = require('./checkEquality');
const {removePunctuation} = require('./removePunctuation');
const {wordsFound} = require('./wordsFound');
const {getDistinct} = require('./getDistinct');
const {getPercent} = require('./getPercent');
const {isIgnorable} = require('./ignoreWords');
const {getUser} = require('./handleUser');
const {getAction} = require('./handleAction');

const {MIN_STEP_TWO_PERCENT} = require('./../include/config');
const {MIN_STEP_THREE_PERCENT} = require('./../include/config');

var jsonData = fs.readFileSync('./resources/data.json');
var ignorable = fs.readFileSync('./resources/ignorable.json');

var data = JSON.parse(jsonData).data;


//Find match context: looking for intent that matchs text
var findMatchContext = (message, actions) => {
  var user = getUser(message.senderID);

  var intents = [];
  for(var i = 0; i < actions.length; i++){
    intents.push(getAction(actions[i]));
  };


  var wordsTab = message.text.split(/[ ,;.]+/);

  for (var i = 0; i < wordsTab.length; i++) {
      wordsTab[i] = removePunctuation(wordsTab[i]);
  }

  var words = wordsTab.filter((element) => {
      return element != '' && !(isIgnorable(element));
  });

  var maxActionPercent = 0;
  var maxActionIndex = 0;

  for (var i = 0; i < intents.length; i++) {
    var maxEntryPercent = 0;
    var intent = intents[i];
    var go = false;
    if (intent.previousActions && intent.previousActions.length != 0) {
      if (user && intent.previousActions.indexOf(user.previousAction) != -1) {
        go = true;
      }
    } else {
      go = true;
    }
    if (go) {
      for (var j = 0; j < intent.keywords.length; j++) {
        var percent = wordsFound(words, intent.keywords[j]);
        if (percent > maxEntryPercent) {
          maxEntryPercent = percent;
        }
      }

      if (maxEntryPercent > maxActionPercent) {
        maxActionPercent = maxEntryPercent;
        maxActionIndex = i;
      }
    }
  }

  // console.log(`CONTEXT STEP TWO RESULT : Action ${data[maxActionIndex].action} , percent ${maxActionPercent}`);

  if (maxActionPercent >= MIN_STEP_TWO_PERCENT) {
    return intents[maxActionIndex];
  }
  else {
    // If percentage is not enough use next method
    var maxPercent = 0;
    var maxIndex = 0;
    for (var i = 0; i < intents.length; i++) {
      var intent = intents[i];
      var go = false;
      if (intent.previousActions && intent.previousActions.length != 0) {
        if (user && intent.previousActions.indexOf(user.previousAction) != -1) {
          go = true;
        }
      } else {
        go = true;
      }
      if (go) {
        var distincts = getDistinct(intent.keywords);
        var percent = getPercent(words, distincts);
        if (percent > maxPercent) {
          maxPercent = percent;
          maxIndex = i;
        }
      }
    }

    if(maxPercent >= MIN_STEP_THREE_PERCENT)
      return intents[maxIndex];
    else {
      return getAction('unknown-action');
    }
  }
}


module.exports = {
  findMatchContext
}
