const {checkEquality} = require('./checkEquality');

const {extractParameters} = require('./../parameters/extractParameters');

const {splitMessage} = require('./../treatment/splitMessage');

var getPercent= (text, keywords, hasParam)=> {
  //keywords ===> array of distincts words in intent.keywords

  var counter = 0;
  var params = [];



  if (hasParam == '1') {
    // Extract parameters from text
    for(var i = 0; i<keywords.length; i++){
      var keyword = keywords[i];

      while (keyword.indexOf('#') != keyword.lastIndexOf('#') && keyword.indexOf('#') != -1) {
        console.log('THERE S PARAMETER HERE');
        var fstSharp = keyword.indexOf('#');
        var scdSharp = keyword.indexOf('#', fstSharp + 1);
        var paramKeyword = keyword.substr(fstSharp, scdSharp - fstSharp + 1);
        var param = extractParameters(text, paramKeyword);
        if (param.value) {
            console.log('THERE S VALUE HERE');
          params.push(param);
          text = text.replace(param.value, '');
          keyword = keyword.replace(paramKeyword, '');
        } else {
          return {percent: 0, params: undefined};
        }
      }

    }
  }

  // var keywordArray = keyword.split(' ').filter((item) => {
  //   return item != '' && !(isIgnorable(item));
  // });


  var words = splitMessage(text);

  words.forEach((word) => {
    keywords.forEach((keyword) => {
      if (checkEquality(word, keyword)) {
        counter++;
        console.log(`found ${word}`);
      }
    });
  });

  var wordsPercent = counter * 100 / words.length ;
  var keywordsPercent = counter * 100 / keywords.length ;


  var result = {
    percent : ( wordsPercent + keywordsPercent ) / 2,
    params
  }
  console.log('RESULT TO SEND: ', result);
  return result ;
  // return wordsPercent and params
};

module.exports= {
  getPercent
};
