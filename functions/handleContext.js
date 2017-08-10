
const {userExists} = require('./handleUser');
const {getUser} = require('./handleUser');
const {setUser} = require('./handleUser');
const {removeUser} = require('./handleUser');

//Get the actual context of user
var getPreviousAction = (senderID) => {
  var previousAction= undefined;

  if(userExists(senderID)){
    var user = getUser(senderID);
    if(user){
      previousAction= user.previousAction;
    }
  }

  return previousAction;
}


//Set the actual context of user
var setPreviousAction = (senderID, action, params) => {

  //if user already exists, update context and parameters
  if(userExists(senderID)){
    var user = getUser(senderID);

    user.previousAction = action;

    if(params.value != ''){
      var param = {
        name: params.name,
        type: params.type,
        value: params.value
      }
      user.parameters.push(param);
    }

    setUser(senderID, user.previousAction, user.parameters);
  }

  //if user doesn't exists, add new user
  else {
    var parameters = [];
    if(params.value != ''){
      var param = {
        name: params.name,
        type: params.type,
        value: params.value
      }
      parameters.push(param);
    }

    setUser(senderID, action, parameters);
  }
}

//Delete user when he's out of context
var cleanContext = (senderID) => {
  removeUser(senderID);
}

//Get all user's parameters
var getParameters = (senderID) => {
  var params = [];
  if(userExists(senderID)){
    var user = getUser(senderID);
    params = user.parameters;
  }
  return params;
}



module.exports= {
  getPreviousAction, setPreviousAction, cleanContext, getParameters
}
