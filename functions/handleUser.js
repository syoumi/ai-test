
var users = new Map();

//Insert or update user
var setUser = (senderID, action, params) => {

  var user = getUser(senderID);
  var counter = 2;

  if(user){

    //parameters
    params = handleParams(user, params);

    //params = user.parameters.concat(params);

    //Counter
    counter = user.counter;

  }else{
      if(!params) params = [];
  }


  //Data
  var data = {
    previousAction: action,
    parameters: params,
    counter
  };

  users.set(senderID, data);
}

//Get user
var getUser = (senderID) => {
  return (users.has(senderID)) ? users.get(senderID) : undefined;
}

//Remove user from map
var removeUser = (senderID) => {
  if (users.has(senderID))
      users.delete(senderID);
}

//Handle user's parameters
var handleParams = (user, params) => {

  if(params){

    //For each param in params, check if it already exists on userParams
     params.forEach((param) => {
       var paramFound = user.parameters.find((userParam) => userParam.name == param.name);
       //Update param if already exists
       if(paramFound){
         var index = user.parameters.indexOf(paramFound);
         user.parameters[index]= param;
       }
       //ELse push new param
       else{
         user.parameters.push(param);
       }
     });
   }

   return user.parameters;
}


module.exports= {
  setUser, getUser, removeUser
}
