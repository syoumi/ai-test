const validator = require('validator');

//const phone = require('phone');

var getPhoneNumber = (text) => {
  var possibleNumbers = [];
  var digits = '1234567890';
  for (var i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) != -1 || (text[i] == '+')) {
      var number = '';
      do {
        number = number.concat(text[i]);
        i++;
      } while (digits.indexOf(text[i]) != -1 || (text[i] == '+') );
      possibleNumbers.push(number);
    }
  }
  var phoneNumber = undefined;
  for (var i = 0; i < possibleNumbers.length; i++) {
     if (validator.isMobilePhone(possibleNumbers[i], 'en-US')) {
      phoneNumber = possibleNumbers[i];
    }
    /* if (phone(possibleNumbers[i])) {
      phoneNumber = possibleNumbers[i];
    }  */
  }
  return phoneNumber;
};


module.exports = {
  getPhoneNumber
};
