
var extractNumber = (text) => {
  var possibleNumbers = [];
  var digits = '0123456789';
  for (var i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) != -1) {
      var nb = '';
      do {
        if (text[i] == ',' || text[i] == '.') {
          nb += '.';
        } else {
          nb += text[i];
        }
        i++;
      } while (digits.indexOf(text[i]) != -1 || text[i] == ',' || text[i] == '.');
      possibleNumbers.push(nb);
    }
  }
  var foundNumber = undefined;
  var maxNumber = -999;
  for (var i = 0; i < possibleNumbers.length; i++) {
    if (isNumber(possibleNumbers[i])) {
      foundNumber = parseInt(possibleNumbers[i]);
      if (foundNumber > maxNumber) {
        maxNumber = foundNumber;
      }
    }
  }
  return foundNumber ? maxNumber : undefined;
};

var isNumber = (str) => {
  return !isNaN(parseInt(str));
};

module.exports = {
  extractNumber,
  isNumber
};
