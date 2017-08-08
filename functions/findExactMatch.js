const fs = require('fs');

const {checkEquality} = require('./checkEquality');
const {removePunctuation} = require('./removePunctuation');

var jsonData = fs.readFileSync('./resources/data.json');
var ignorable = fs.readFileSync('./resources/ignorable.json');

var data = JSON.parse(jsonData).data;

var findExactMatch = (text) => {
  text = text.toLowerCase().trim();

  var wordsTab = text.split(/[ ,;.]+/);

  for (var i = 0; i < wordsTab.length; i++) {
    wordsTab[i] = removePunctuation(wordsTab[i]);
  }

  var words = wordsTab.filter((element) => {
    return element != '';
  });

  var foundEntry = undefined;
  data.forEach((entry) => {
    entry.keywords.forEach((keyword) => {
      var keywordsArray = keyword.split(' ');
        if (keywordsArray.length === words.length) {
          var areEquals = true;
          for (var i = 0; i < words.length; i++) {
            if (!checkEquality(words[i], keywordsArray[i])) {
              areEquals = false;
            }
          }
          if (areEquals) {
            foundEntry = entry;
            console.log(`STEP ONE RESULT : action ${entry.action}`);
          }
        }
    });
  });
  return foundEntry;
};

module.exports = {
  findExactMatch
};
