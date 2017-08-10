
const {getParameters} = require('./functions/handleContext');
const {saveUndefinedAnswer} = require('./functions/saveUndefinedAnswer');
const {handleMessage} = require('./functions/handleMessage');
const {getAnswer} = require('./functions/handleAnswer');
const {verifyParam} = require('./functions/handleParams');
const {lookForSpecificActions} = require('./functions/lookForSpecificActions');
const {setUser} = require('./functions/handleUser');

var receiveMessage = (request) => {

  console.log(`Received message from ${request.senderID}, content ${request.text}`);
  var answer = undefined;
  var specificActions = lookForSpecificActions(request.senderID);
  if (specificActions && specificActions.length != 0) {
    // TODO
  } else {
    //Looking for a std answer
    answer = handleMessage(request);
    if (answer.answer) {
      // add user to the map or update it
      setUser(request.senderID, answer.action, answer.parameters);
      console.log('user added');
    }
  }


  // if this is unknown message, save the message in json file
  if(answer.action === 'unknown-action') {
    saveUndefinedAnswer(request.text);
  } else {
    // console.log(`Answer: ${answer.answer}`);
  }


  // Update answer's parameters
  // answer.parameters = getParameters(request.senderID);

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

module.exports = {
  receiveMessage
}

var msg = {
  senderID: 123,
  text: 'consulter catalogue'
};

console.log(receiveMessage(msg));

var msg = {
  senderID: 123,
  text: 'appartement'
};

console.log(receiveMessage(msg));
