

var getPercent= (words, keywords)=> {

  var counter = 0;

  words.forEach((word) => {
    keywords.forEach((keyword) => {
      if (word === keyword) {
        counter++;
        console.log(`found ${word}`);
      }
    });
  });

  var wordsPercent = counter * 100 / words.length ;
  var keywordsPercent = counter * 100 / keywords.length ;

  return ( wordsPercent + keywordsPercent ) / 2;
  // return wordsPercent;
};

module.exports= {
  getPercent
};
