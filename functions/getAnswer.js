var getAnswer = (entry) => {
  // generating random index
  var index = parseInt(Math.random() * entry.answers.length);
<<<<<<< HEAD
=======
  console.log('Parameters ' + entry.parameters.name);
>>>>>>> 0b245de93d39c026ea3b26a6affd2b9dbed33100
  return {
    action: entry.action,
    context:
      {
        "id": entry.context.id,
        "input": entry.context.input,
        "output": entry.context.output
      },
    parameters: entry.parameters[0],
    answer: entry.answers[index]
  };
}


module.exports= {
  getAnswer
}
