
var verifyParam = (type, text) => {
  var param=undefined;

  switch(type){
    case 'number':
      param = text;
      break;
    case 'currency':
      param = text;
      break;
    case 'phone-number':
      param = 'return phone-number';
      break;
    case 'email':
      param = 'return email';
      break;
    default :
      param = text;
  }

  return param;
}




module.exports = {
  verifyParam
}
