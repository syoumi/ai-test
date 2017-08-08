
const {userExists} = require('./handleUser');
const {getUser} = require('./handleUser');
const {setUser} = require('./handleUser');
const {removeUser} = require('./handleUser');

//Get the actual context of user
var getContext = (senderID) => {
  console.log('get context');

  var context= undefined;

  if(userExists(senderID)){
    var user = getUser(senderID);
    if(user){
      context= user.context;
      console.log("Paramètres: ", user.parameters);
    }
  }

  return context;
}


//Set the actual context of user
var setContext = (senderID, context, params) => {
  console.log('set context');

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



module.exports= {
  getContext, setContext, cleanContext
}
