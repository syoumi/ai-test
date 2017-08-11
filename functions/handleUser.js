
var users = new Map();

var userExists = (senderID)=> {
  return users.has(senderID);
}


//Insert or update user
var setUser = (senderID, action, params) => {
  var data = {
    previousAction: action,
    parameters: params,
    counter: 2
  };
  users.set(senderID, data);

}

//Get user
var getUser = (senderID) => {
    // console.log("USER: ", users.get(senderID));
  return (userExists(senderID))?users.get(senderID):undefined;
}

//Remove user from map
var removeUser = (senderID) => {
  if (users.has(senderID))
      users.delete(senderID);
}


module.exports= {
  userExists, setUser, getUser, removeUser
}
