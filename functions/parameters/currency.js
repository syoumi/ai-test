
var extractCurrency = (text) => {
  var possibleCurrencies = [];
  var digits = '0123456789';
  for (var i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) != -1) {
      var nb = '';
      var containsDecimalPoint = false;
      do {
        if (text[i] == '.' || text[i] == ',') {
          if (containsDecimalPoint) {
            i++;
            break;
          } else {
            nb += '.';
            containsDecimalPoint = true;
          }
        } else {
          nb += text[i];
        }
        i++;
      } while (digits.indexOf(text[i]) != -1 || text[i] == ',' || text[i] == '.');
      possibleCurrencies.push(nb);
    }
  }
  var currencyFound = undefined;
  var maxCurrency = -999;
  for (var i = 0; i < possibleCurrencies.length; i++) {
    if (isCurrency(possibleCurrencies[i])) {
      currencyFound = parseFloat(possibleCurrencies[i]);
      if (currencyFound > maxCurrency) {
        maxCurrency = currencyFound;
      }
    }
  }
  return currencyFound ? maxCurrency : undefined;
};

var isCurrency = (curr) => {
  return !isNaN(parseFloat(curr));
};

module.exports = {
  extractCurrency,
  isCurrency
};
