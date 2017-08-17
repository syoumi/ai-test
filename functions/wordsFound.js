const {checkEquality} = require('./checkEquality');

const {isIgnorable} = require('./ignoreWords');

const {extractParameters} = require('./parameters/extractParameters');

var wordsFound = (text, keyword, hasParam) => {

  var counter = 0;
  var params = [];

  if (hasParam) {
    // Extract parameters from text
    while (keyword.indexOf('#') != keyword.lastIndexOf('#') && keyword.indexOf('#') != -1) {
      var fstSharp = keyword.indexOf('#');
      var scdSharp = keyword.indexOf('#', fstSharp + 1);
      var paramKeyword = keyword.substr(fstSharp, scdSharp - fstSharp + 1);
      var parameter = extractParameters(text, paramKeyword);
      if (param.value) {
        params.push(param);
        text.replace(param.value, '');
        keyword.replace(paramKeyword, '');
      } else {
        return {percent: 0, params: undefined};
      }
    }
  }

  var keywordArray = keyword.split(' ').filter((item) => {
    return item != '' && !(isIgnorable(item));
  });



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
