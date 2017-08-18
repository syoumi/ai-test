
const fs = require('fs');

const {findMatch} = require('./../match/findMatch');
const {findExactMatch} = require('./../match/findExactMatch');
const {getAnswer} = require('./../answer/handleAnswer');

var jsonData = fs.readFileSync('./resources/data.json');
var ignorable = fs.readFileSync('./resources/ignorable.json');

var data = JSON.parse(jsonData).data;

// handling input, returning action + possible answers + parameters
var handleMessage = (message) => {
  if (message.text) {

    //Exact Match
    var result = findExactMatch(message);

    if (result) {
      // generating random answer
      return getAnswer(result);

    } else {
      result = findMatch(message);
      if (result) {
        // generating random answer
        return getAnswer(result);

      } else {
        var unknownaction = {entry: data.find((entry) => entry.action === 'unknown-action'), params: undefined};
        return getAnswer(unknownaction);
      }
    }
  } else {
    console.log('no text');
    return undefined;
  }
};

module.exports = {
  handleMessage
};
