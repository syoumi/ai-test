var getAnswer = (entry) => {
  // generating random index
  var index = parseInt(Math.random() * entry.answers.length);
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
