const {checkEquality} = require('./checkEquality');

const {isIgnorable} = require('./ignoreWords');


var wordsFound = (words, text) => {
  //words is an array of words
  //text is a string in where we look for words
  var tab = text.split(' ').filter((item) => {
    return item != '' && !(isIgnorable(item));
  });
  var counter = 0;
  words.forEach((word) => {
    tab.forEach((item) => {
      if (checkEquality(word, item)) {
        counter++;
      }
    });
  });
  var wordsPercent = counter * 100 / words.length ;
  var textPercent = counter * 100 / tab.length ;
  // returning average of two percents
  return ( wordsPercent + textPercent ) / 2;
};

module.exports = {
  wordsFound
}
