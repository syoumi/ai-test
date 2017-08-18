
//const phone = require('phone');


//Extract phone number from a text
var extractPhoneNumber = (text) => {
  var possibleNumbers = [];
  var digits = '1234567890';
  for (var i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) != -1 || (text[i] == '+')) {
      var number = '';
      do {
        number = number.concat(text[i]);
        i++;
      } while (digits.indexOf(text[i]) != -1 || text[i] == '+' || text[i] == '.' || text[i] == '-' || text[i] == ' ' || text[i] == '(' || text[i] == ')');
      possibleNumbers.push(number);
    }
  }
  console.log(possibleNumbers);
  var phoneNumber = undefined;
  for (var i = 0; i < possibleNumbers.length; i++) {
    if (isMobilePhone(possibleNumbers[i])) {
      phoneNumber = possibleNumbers[i];
      break;
    }
    /* if (phone(possibleNumbers[i])) {
      phoneNumber = possibleNumbers[i];
    }  */
  }
  //console.log('PHONE NUMBER: ', phoneNumber);
  return phoneNumber;
};


var isMobilePhone = (phone) => {
  var isValid = (phone.length >= 8) ? true : false;
  if (!(phone[0] == '+' || phone[0] == '0')) {
    isValid = false;
  } else {
    if (phone[0] == '+' && (phone.length < 12 || phone.length > 20)) {
      isValid = false;
    } else if (phone[0]) {
      if (phone[1] == '0' && (phone.length < 12 || phone.length > 22)) {
        isValid = false;
      } else if (phone[1] != '0' && (phone.length < 8 || phone.length > 20)) {
        isValid = false;
      }
    }
  }
  return isValid;
};

module.exports = {
  extractPhoneNumber, isMobilePhone
};
