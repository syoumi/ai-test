const validator = require('validator');

var getEmail = (text) => {
  var tab = text.trim().split(/[ ,;?!:/\\*+'"<>]+/).filter((item) => {
    return item != '';
  });
  var validEmail = undefined;
  for (var i = 0; i < tab.length; i++) {
    if (validator.isEmail(tab[i])) {
      validEmail = tab[i];
      break;
    }
  }
  return validEmail;
};

module.exports = {
  getEmail
};
