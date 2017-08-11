const validator = require('validator');

var getPhoneNumber = (text) => {
  var possibleNumbers = [];
  var digits = '1234567890';
  for (var i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) != -1 || (text[i] == '+' && i == 0)) {
      var number = '';
      do {
        number = number.concat(text[i]);
        i++;
      } while (digits.indexOf(text[i]) != -1);
      possibleNumbers.push(number);
    }
  }
  var phoneNumber = undefined;
  for (var i = 0; i < possibleNumbers.length; i++) {
    if (validator.isMobilePhone(possibleNumbers[i], 'any')) {
      phoneNumber = possibleNumbers[i];
    }
  }
  return phoneNumber;
};

module.exports = {
  getPhoneNumber
};
