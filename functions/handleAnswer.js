const fs = require('fs');

var jsonData = fs.readFileSync('./resources/data.json');

var data = JSON.parse(jsonData).data;

var getAnswer = (entry) => {
  // generating random index
  var index = parseInt(Math.random() * entry.answers.length);
  return {
    action: entry.action,
    parameters: [
    ],
    answer: entry.answers[index]
  };
};

module.exports= {
  getAnswer
}
