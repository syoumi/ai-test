const {getEmail} = require('./getEmail');
const {getPhoneNumber} = require('./getPhoneNumber');


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
      param.value = getEmail(messageText);
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