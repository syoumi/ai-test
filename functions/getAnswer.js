var getAnswer = (entry) => {
  // generating random index
  var index = parseInt(Math.random() * entry.answers.length);
  return {
    action: entry.action,
    answer: entry.answers[index]
  };
}


module.exports= {
  getAnswer
}
