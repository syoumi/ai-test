const fs = require('fs');

var ignorable = fs.readFileSync('./resources/ignorable.json');

var ignorableWords = JSON.parse(ignorable).words;

var isIgnorable = (word) => {
  return (ignorableWords.indexOf(word) != -1);
};

module.exports = {
  isIgnorable
};
