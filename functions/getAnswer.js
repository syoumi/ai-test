var getAnswer = (entry) => {
  // generating random index
  var index = parseInt(Math.random() * entry.answers.length);
  console.log(entry.parameters.name);
  return {
    action: entry.action,
    context:
      {
        "id": entry.context.id,
        "input": entry.context.input,
        "output": entry.context.output
      },
    parameters: entry.parameters.name,
    answer: entry.answers[index]
  };
}


module.exports= {
  getAnswer
}
