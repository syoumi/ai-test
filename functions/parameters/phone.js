
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
      } while (digits.indexOf(text[i]) != -1 || (text[i] == '+') );
      possibleNumbers.push(number);
    }
  }
  var phoneNumber = undefined;
  for (var i = 0; i < possibleNumbers.length; i++) {
    if (isMobilePhone(possibleNumbers[i])) {
      phoneNumber = possibleNumbers[i];
    }
    /* if (phone(possibleNumbers[i])) {
      phoneNumber = possibleNumbers[i];
    }  */
  }
  return phoneNumber;
};


//Get phone number from a word
var getPhoneNumber = (word) => {
  var phoneNumber = undefined;

  if (isMobilePhone(word)) {
    phoneNumber = word;
  }

  return phoneNumber;
};


// 0655971068
// +212655971068
var isMobilePhone = (phone) => {
  var isValid = (phone.length >= 8) ? true : false;
  if (!(phone[0] == '+' || phone[0] == '0')) {
    isValid = false;
  } else {
    if (phone[0] == '+' && (phone.length < 12 || phone.length > 14)) {
      isValid = false;
    } else if (phone[0]) {
      if (phone[1] == '0' && (phone.length < 12 || phone.length > 16)) {
        isValid = false;
      } else if (phone[1] != '0' && (phone.length < 8 || phone.length > 12)) {
        isValid = false;
      }
    }
  }
  return isValid;
};


module.exports = {
  getPhoneNumber, extractPhoneNumber
};
