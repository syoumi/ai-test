// TODO
// 1. add ignorable words
// 2. add synonyms
// 3. add similar words

const {getContext} = require('./functions/handleContext');
const {setContext} = require('./functions/handleContext');
const {cleanContext} = require('./functions/handleContext');
const {saveUndefinedAnswer} = require('./functions/saveUndefinedAnswer');
const {handleMessage} = require('./functions/handleMessage');

const {MIN_PERCENT} = require('./include/config');

// answer example
var answer = {
  recipientID: 123456,
  action: 'actionName',
  answer: 'one answer',
  parameters: []
};

var receiveMessage = (request) => {
  console.log(`Received message from ${request.senderID}, content ${request.text}`);
  var answer = handleMessage(request);
  // if this is unknown message, save the message in json file
  if(answer.action === 'unknown-action') {
    saveUndefinedAnswer(message.text);
  } else {
    console.log(`Answer: ${answer.answer}`);
    var context = getContext(message.senderID);

    //Check if there's a context for that user
    if(context){
      if(context.output == answer.context.input){
        console.log(`Context output: ${context.output}`);

        //TODO add something
        //verify if it's the right answer ?
      }
      else {
        cleanContext(message.senderID);
      }
    }
    //if answer got an output
    if(answer.context.output){
      var params = '';
      if(answer.parameters[answer.paramers.length-1] === '?'){
        params= message.text;
      }
      setContext(message.senderID, answer.context, params);
    }
  }

  var response = sendAnswer(request.senderID, answer);
  return response;
};

var sendAnswer = (recipientID, answer) => {
  var toSend = {
    recipientID,
    action: answer.action,
    answer: answer.answer,
    parameters: answer.parameters
  };
  return toSend;
}

// answer example
var answer = {
  recipientID: 123456,
  action: 'actionName',
  answer: 'one answer',
  parameters: []
};

// message example
var message = {
  senderID: 7851846,
  text: "abcdef"
};

var response = receiveMessage(message);
console.log(`Bot say: ${response.answer}`);
