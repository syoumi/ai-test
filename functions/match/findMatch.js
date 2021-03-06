const fs = require('fs');

const {checkEquality} = require('./checkEquality');
const {removePunctuation} = require('./../treatment/removePunctuation');
const {wordsFound} = require('./wordsFound');
const {getDistinct} = require('./getDistinct');
const {getPercent} = require('./getPercent');
const {isIgnorable} = require('./../treatment/ignoreWords');
const {getUser} = require('./../user/handleUser');

const {MIN_STEP_TWO_PERCENT} = require('./../../include/config');
const {MIN_STEP_THREE_PERCENT} = require('./../../include/config');

var jsonData = fs.readFileSync('./resources/data.json');

var data = JSON.parse(jsonData).data;

var findMatch = (message) => {

  var user = getUser(message.senderID);

  var maxActionPercent = 0;
  var maxActionIndex = 0;
  var params = [];

  for (var i = 0; i < data.length; i++) {
    var entry = data[i];
    var go = false;
    if (entry.previousActions && entry.previousActions.length != 0) {
      if (user && entry.previousActions.indexOf(user.previousAction) != -1) {
        go = true;
      }
    } else {
      go = true;
    }
    if (go) {
      var maxEntryPercent = 0;
      for (var j = 0; j < entry.keywords.length; j++) {
        var result = wordsFound(message.text, entry.keywords[j], entry.hasParam);
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
  }

  // console.log(`STEP TWO RESULT : Action ${data[maxActionIndex].action} , percent ${maxActionPercent}`);

  if (maxActionPercent >= MIN_STEP_TWO_PERCENT) {
    return {
      entry: data[maxActionIndex],
      params
    };
  }
  else {
    // If percentage is not enough use next method
    var maxPercent = 0;
    var maxIndex = 0;
    var params = [];

    for (var i = 0; i < data.length; i++) {
      var entry = data[i];
      var go = false;
      if (entry.previousActions && entry.previousActions.length != 0) {
        if (user && entry.previousActions.indexOf(user.previousAction) != -1) {
          go = true;
        }
      } else {
        go = true;
      }
      if (go) {
        var distincts = getDistinct(entry.keywords);
        var result =  getPercent(message.text, distincts, entry.hasParam);
        var percent = result.percent;
        //console.log('Percent found ' , percent);
        if (percent > maxPercent) {
          maxPercent = percent;
          maxIndex = i;
          params =  result.params;
        }
      }
    }
    // console.log(`STEP THREE RESULT : Percent ${maxPercent}, action ${data[maxIndex].action}`);

    if(maxPercent >= MIN_STEP_THREE_PERCENT){
      return {
        entry: data[maxIndex],
        params
      };
    }
    else {
      return undefined;
    }
  }
};

module.exports = {
  findMatch
};
