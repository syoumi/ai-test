const fs = require('fs');

const {checkEquality} = require('./checkEquality');
const {removePunctuation} = require('./removePunctuation');
const {isIgnorable} = require('./ignoreWords');
const {getUser} = require('./handleUser');

var jsonData = fs.readFileSync('./resources/data.json');

var data = JSON.parse(jsonData).data;

var findExactMatch = (message) => {
  var text = message.text.toLowerCase().trim();
  var user = getUser(message.senderID);

  var wordsTab = text.split(/[ ,;.]+/);

  for (var i = 0; i < wordsTab.length; i++) {
    wordsTab[i] = removePunctuation(wordsTab[i]);
  }

  var words = wordsTab.filter((element) => {
    return element != '' && !(isIgnorable(element));
  });

  var foundEntry = undefined;

  data.forEach((entry) => {
    var go = false;
    if (entry.previousActions && entry.previousActions.length != 0) {
      if (user && entry.previousActions.indexOf(user.previousAction) != -1) {
        go = true;
      }
    } else {
      go = true;
    }
    if (go) {
      entry.keywords.forEach((keyword) => {
        var keywordsArray = keyword.split(' ').filter((item) => {
          return item != '' && !(isIgnorable(item));
        });
        if (keywordsArray.length === words.length) {
          var areEquals = true;
          for (var i = 0; i < words.length; i++) {
            if (!checkEquality(words[i], keywordsArray[i])) {
              areEquals = false;
            }
          }
          if (areEquals) {
            foundEntry = entry;
            // console.log(`STEP ONE RESULT : action ${entry.action}`);
          }
        }
      });
    }
  });
  return foundEntry;
};

module.exports = {
  findExactMatch
};
