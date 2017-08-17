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
var findSpecificMatch = (message, actions) => {

  var user = getUser(message.senderID);

  var intents = [];
  // getting all the specific intents to look in
  for(var i = 0; i < actions.length; i++){
    intents.push(getAction(actions[i]));
  };

  var maxActionPercent = 0;
  var maxActionIndex = 0;
  var params = [];

  for (var i = 0; i < intents.length; i++) {
    var maxEntryPercent = 0;
    var intent = intents[i];
    for (var j = 0; j < intent.keywords.length; j++) {
      var result = wordsFound(message.text, intent.keywords[j], intent.hasParam);
      var percent = result.percent;
      if (percent > maxEntryPercent) {
        maxEntryPercent = percent;
      }
    }

    if (maxEntryPercent > maxActionPercent) {
      maxActionPercent = maxEntryPercent;
      maxActionIndex = i;
      params = result.params;
    }
  }

  // console.log(`CONTEXT STEP TWO RESULT : Action ${data[maxActionIndex].action} , percent ${maxActionPercent}`);

  if (maxActionPercent >= MIN_STEP_TWO_PERCENT) {
    user.counter = 2;
    return {entry: intents[maxActionIndex], params};

  }
  else {
    // If percentage is not enough use next method
    var maxPercent = 0;
    var maxIndex = 0;
    var params = [];

    for (var i = 0; i < intents.length; i++) {
      var intent = intents[i];
      var distincts = getDistinct(intent.keywords);
      var result = getPercent(message.text, distincts, intent.hasParam);
      console.log('RESULT: ', result);
      var percent = result.percent;
      if (percent > maxPercent) {
        maxPercent = percent;
        maxIndex = i;
        params = result.params;
      }
    }


    if(maxPercent >= MIN_STEP_THREE_PERCENT){
      user.counter = 2;
      return {entry: intents[maxIndex], params};
    } else {
      user.counter--;
      if (user.counter == 0) {
        user.counter = 2;
        user.previousAction = '';
        return undefined;
      } else {
        return {entry: getAction('unknown-action'), params: undefined};
      }
    }
  }
}

module.exports = {
  findSpecificMatch
}
