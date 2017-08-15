const {checkEquality} = require('./checkEquality');

const {isIgnorable} = require('./ignoreWords');

const {getParameter} = require('./parameters/getParameter');

var wordsFound = (words, keyword) => {
  //words is an array of words
  //text is a string in where we look for words (keyword)

  var keywordArray = keyword.split(' ').filter((item) => {
    return item != '' && !(isIgnorable(item));
  });
  var counter = 0;
  var params = [];
  words.forEach((word) => {
    keywordArray.forEach((item) => {

      if (item[0] == '#' && item[item.length - 1] == '#') {
          var param = getParameter(word, item);
          if(param.value){
            //console.log("Param: ", param);
            params.push(param);
            counter++;
          }
      }
      else if (checkEquality(word, item)) {
        counter++;
      }
    });
  });
  var wordsPercent = counter * 100 / words.length ;
  var textPercent = counter * 100 / keywordArray.length ;
  // returning average of two percents and params
  var result = {
    percent : ( wordsPercent + textPercent ) / 2,
    params
  }
  //console.log('RESULT TO SEND: ', result);
  return result ;
};

module.exports = {
  wordsFound
}
