const fs = require('fs');

const {similarity} = require('./similarity');

const {MIN_SIMILARITY_PERCENT} = require('./../include/config');


var checkEquality = (s1, s2) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  var areEquals = false;

  //check if both strings are equals
  if (s1 === s2) {
    areEquals = true;

  } else {
    //check if both strings are synonyms
    if (areSynonyms(s1, s2)) {
      areEquals = true;
    }
    //check if both strings are similar
    else {
      var similarityPercent = similarity(s1, s2) * 100;
      areEquals = (similarityPercent >= MIN_SIMILARITY_PERCENT);
    }
  }
  return areEquals;
};

var areSynonyms = (s1, s2) => {
  var dico = fs.readFileSync('./resources/synonyms.json');
  var dicoObj = JSON.parse(dico);
  var data = dicoObj.data;
  var synonyms = false;
  data.forEach((entry) => {
    var found1 = entry.synonyms.find((item) => item == s1);
    var found2 = entry.synonyms.find((item) => item == s2);
    if (found1 && found2) {
      synonyms = true;
    }
  });
  return synonyms;
};

module.exports = {
  checkEquality
};
