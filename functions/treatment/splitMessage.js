const {removePunctuation} = require('./removePunctuation');
const {isIgnorable} = require('./ignoreWords');

var splitMessage = (str) => {
  var text = str.toLowerCase().trim();
  var wordsTab = text.split(/[ ,;.+:]+/);

  for (var i = 0; i < wordsTab.length; i++) {
    wordsTab[i] = removePunctuation(wordsTab[i]);
  }

  var words = wordsTab.filter((element) => {
    return element != '' && !(isIgnorable(element));
  });

  return words;
};

module.exports = {
  splitMessage
};
