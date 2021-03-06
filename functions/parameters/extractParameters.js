const {extractEmail} = require('./email');
const {extractPhoneNumber} = require('./phone');
const {extractCity} = require('./city');


var extractParameters = (messageText, keywordParam) => {
  var name = keywordParam.split('|')[0].replace('#', '');
  var type = keywordParam.split('|')[1].replace('#', '');
  var param = {
    name,
    type,
    value: undefined
  };



  switch (type) {
    case 'email':
      param.value = extractEmail(messageText);
      break;
    case 'phone':
      param.value = extractPhoneNumber(messageText);
      break;
    case 'city':
      param.value = extractCity(messageText);
      break;
    default:
      //TODO
  }

  return param;
};

module.exports = {
  extractParameters
};
