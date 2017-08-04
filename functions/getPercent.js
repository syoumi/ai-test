

var getPercent= (words, keywords)=> {

  var counter = 0;

  words.forEach((word) => {
    keywords.forEach((keyword) => {
      if (word === keyword.toLowerCase().trim()) {
        counter++;
      }
    });
  });

  var wordsPercent = counter * 100 / words.length ;
  var keywordsPercent = counter * 100 / keywords.length ;

  return ( wordsPercent + keywordsPercent ) / 2;


}


module.exports= {
  getPercent
}
