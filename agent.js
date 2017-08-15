//TODO ./functions/findExactMatch integrating parameters

const {saveUndefinedAnswer} = require('./functions/saveUndefinedAnswer');
const {handleMessage} = require('./functions/handleMessage');
const {findSpecificMatch} = require('./functions/findSpecificMatch');
const {lookForSpecificActions} = require('./functions/lookForSpecificActions');
const {setUser} = require('./functions/handleUser');
const {getUser} = require('./functions/handleUser');
const {getAnswer} = require('./functions/handleAnswer');

var receiveMessage = (request) => {

  console.log(`Received message from ${request.senderID}, content ${request.text}`);
  var answer = undefined;
  var specificActions = lookForSpecificActions(request.senderID);
  if (specificActions && specificActions.length != 0) {
    var action = findSpecificMatch(request, specificActions);
    answer = (action) ? getAnswer(action) : undefined;
  }

  if (!answer) {
    // Looking for a std answer
    answer = handleMessage(request);
    if (answer.answer) {
      // add user to the map or update it
      //TODO function push parameters
    }
  }



  // if this is unknown message, save the message in json file
  if(answer.action === 'unknown-action') {
    saveUndefinedAnswer(request.text);
  } else {
    // console.log(`Answer: ${answer.answer}`);
    setUser(request.senderID, answer.action, answer.parameters);

  }


  // Update answer's parameters
  // answer.parameters = getParameters(request.senderID);
  console.log('User object ' , getUser(request.senderID));
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
//
// module.exports = {
//   receiveMessage
// }

// var msg = {
//   senderID: 123,
//   text: 'abcd'
// };
//
// console.log("BOT SAYS: ", receiveMessage(msg).answer);

var msg = {
  senderID: 123,
  text: 'Mon num est +14155552671 merci'
};

console.log("BOT SAYS: ", receiveMessage(msg).answer);

var msg = {
  senderID: 123,
  text: 'Salut'
};

console.log("BOT SAYS: ", receiveMessage(msg).answer);

// var msg = {
//   senderID: 123,
//   text: 'consulter catalogue'
// };
//
// console.log("BOT SAYS: ", receiveMessage(msg).answer);
//
// var msg = {
//   senderID: 123,
//   text: 'rien'
// };
//
// console.log("BOT SAYS: ", receiveMessage(msg).answer);
//
// var msg = {
//   senderID: 123,
//   text: 'appartement'
// };
//
// console.log("BOT SAYS: ", receiveMessage(msg).answer);
