
const fs = require('fs');

const {findMatch} = require('./findMatch');
const {findExactMatch} = require('./findExactMatch');
const {getAnswer} = require('./getAnswer');

var jsonData = fs.readFileSync('./resources/data.json');
var ignorable = fs.readFileSync('./resources/ignorable.json');

var data = JSON.parse(jsonData).data;


// handling input, returning action + possible answers
var handleMessage = (message) => {
  var text = message.text.toLowerCase();
  if (text) {
    var entry = findExactMatch(text);

    if (entry) {
      // generating random answer
      return getAnswer(entry);

    } else {
      var entry = findMatch(text);
      if (entry) {
        // generating random answer
        return getAnswer(entry);

      } else {
        var unknownaction = data.find((entry) => entry.action === 'unknown-action');
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
