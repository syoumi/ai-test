

const fs = require('fs');

const {removePunctuation} = require('./removePunctuation');


var jsonData = fs.readFileSync('./../ressources/data.json');
var ignorable = fs.readFileSync('./../ressources/ignorable.json');

var data = JSON.parse(jsonData).data;

var findMatchV2 = (text, minPercent) => {

  var words = text.split(/[ ,;.]+/);
  for (var i = 0; i < words.length; i++) {
    words[i] = removePunctuation(words[i]);
  }

  var maxActionPercent = 0;
  var maxActionIndex = 0;


  for (var i = 0; i < data.length; i++) {
    var maxEntryPercent = 0;

    var percent = wordsFoundV2(words, data[i].keywords);
    if (percent > maxEntryPercent) {
      maxEntryPercent = percent;
    }

    if (maxEntryPercent > maxActionPercent) {
      maxActionPercent = maxEntryPercent;
      maxActionIndex = i;
    }
  }

  console.log(words);
  console.log(`Action ${data[maxActionIndex].action} , percent ${maxActionPercent}`);
  if(maxActionPercent >= minPercent){
    var index = parseInt(Math.random() * data[maxActionIndex].answers.length);
    return {
      action: data[maxActionIndex].action,
      answer: data[maxActionIndex].answers[index]
    };
  }


};




var wordsFoundV2 = (words, keywords) => {

  var counter = 0;

  var distincts= [];

  keywords.forEach((keyword) => {
    if (distincts.indexOf(keywords) > -1) distincts.push(keyword);
  });

  distincts.forEach((keyword) => {
    tab.forEach((item) => {
      if (word === item) {
        counter++;
      }
    });
  });


  var wordsPercent = counter * 100 / words.length ;
  var keywordsPercent = counter * 100 / keywords.length ;
  // returning average of two percents
  return ( wordsPercent + keywordsPercent ) / 2;
};

module.exports = {
   findMatchV2, wordsFoundV2
}
