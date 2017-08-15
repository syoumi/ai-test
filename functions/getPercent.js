const {checkEquality} = require('./checkEquality');

const {getParameter} = require('./parameters/getParameter');

var getPercent= (words, keywords)=> {
  //keywords ===> array of distincts words in intent.keywords

  var counter = 0;
  var params = [];

  words.forEach((word) => {
    keywords.forEach((keyword) => {
      if (keyword[0] == '#' && keyword[keyword.length - 1] == '#') {
          var param = getParameter(word, item);
          if(param.value){
            //console.log("Param: ", param);
            params.push(param);
            counter++;
          }
      }
      else if (checkEquality(word, keyword)) {
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
  //console.log('RESULT TO SEND: ', result);
  return result ;
  // return wordsPercent and params
};

module.exports= {
  getPercent
};
