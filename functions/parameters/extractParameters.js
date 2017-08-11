const {getEmail} = require('./getEmail');
const {getPhoneNumber} = require('./getPhoneNumber');

/**
 * obj = {messageText , keywordParam}
 */
var extractParameters = (obj) => {
  var name = obj.keywordParam.split('|')[0].replace('#', '');
  var type = obj.keywordParam.split('|')[1].replace('#', '');
  var param = {
    name,
    type,
    value: undefined
  };

  switch (type) {
    case 'email':
      param.value = getEmail(obj.messageText);
      break;
    case 'phone':
      param.value = getPhoneNumber(obj.messageText);
      break;
    default:
      //TODO
  }

  if (param.value) {
    obj.messageText = obj.messageText.replace(param.value, obj.keywordParam);
  }

  return param;
};

module.exports = {
  extractParameters
};
