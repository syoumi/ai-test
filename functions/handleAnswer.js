const fs = require('fs');

var jsonData = fs.readFileSync('./resources/data.json');

var data = JSON.parse(jsonData).data;

var getAnswer = (result) => {
  // generating random index
  var index = parseInt(Math.random() * result.entry.answers.length);
  return {
    action: result.entry.action,
    parameters: result.params,
    answer: result.entry.answers[index]
  };
};

module.exports= {
  getAnswer
}
