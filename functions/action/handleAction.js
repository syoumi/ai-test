const fs = require('fs');

var jsonData = fs.readFileSync('./resources/data.json');

var data = JSON.parse(jsonData).data;

var getAction = (actionName) => {
  var toReturn = data.find((item) => {
    if (item.action == actionName) return true;
    return false;
  });
  return toReturn;
};

module.exports = {
  getAction
};
