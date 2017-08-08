
const {userExists} = require('./handleUser');
const {getUser} = require('./handleUser');
const {setUser} = require('./handleUser');
const {removeUser} = require('./handleUser');

//Get the actual context of user
var getContext = (senderID) => {
  var context= undefined;

  if(userExists(senderID)){
    var user = getUser(senderID);
    if(user){
      context= user.context;
    }
  }

  return context;
}


//Set the actual context of user
var setContext = (senderID, context, params) => {
  
  //if user already exists, update context and parameters
  if(userExists(senderID)){
    var user= getUser(senderID);
    user.context.input= user.context.output;
    user.context.output= context.output;
    if(params !='')
      user.parameters.push(params);
    setUser(senderID, user.context, user.parameters);
  }

  //if user doesn't exists, add new user
  else{
    var parameters=[];
    if(params !='')
      parameters.push(params);

    setUser(senderID, context, parameters);
  }
}

//Delete user when he's out of context
var cleanContext = (senderID) => {
  removeUser(senderID);
}

//Get all user's parameters
var getParameters = (senderID) => {
  var params= [];
  if(userExists(senderID)){
    var user = getUser(senderID);
    params = user.parameters;
  }
  return params;
}



module.exports= {
  getContext, setContext, cleanContext, getParameters
}
