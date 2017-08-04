

var getPercent= (words, keywords)=> {

  var counter = 0;

  words.forEach((word) => {
    keywords.forEach((keyword) => {
      if (word === keyword.toLowerCase().trim()) {
        counter++;
      }
    });
  });


}


module.exports= {
  getPercent
}
