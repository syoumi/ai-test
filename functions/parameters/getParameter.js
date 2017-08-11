
const {getPhoneNumber} = require('./phone');

var getParameter = (userWord, keywordParam) => {

  var name = keywordParam.split('|')[0].replace('#', '');
  var type = keywordParam.split('|')[1].replace('#', '');
  var param = {
    name,
    type,
    value: undefined
  };

  switch (type) {
    case 'phone':
      param.value = getPhoneNumber(userWord);
      break;
    default:
      //TODO
  }

  return param;
}


module.exports = {
  getParameter
}
