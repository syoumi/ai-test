const {extractEmail} = require('./email');
const {extractPhoneNumber} = require('./phone');
const {extractCity} = require('./city');
const {extractNeighborhood} = require('./neighborhood');
const {extractOperation} = require('./operation');
const {extractBuilding} = require('./building');


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
    case 'neighborhood':
      param.value = extractNeighborhood(messageText);
      break;
    case 'operation':
      param.value = extractOperation(messageText);
      break;
    case 'building':
      param.value = extractBuilding(messageText);
      break;
    default:
      //TODO
  }

  return param;
};

module.exports = {
  extractParameters
};
