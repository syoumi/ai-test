
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

<<<<<<< HEAD
    setUser(senderID, user.context, user.parameters);
=======
    fs.writeFile('./register/actualContext.json', JSON.stringify(users), function (err) {
      if (err) return console.log('error ' + err);
    });
>>>>>>> 0b245de93d39c026ea3b26a6affd2b9dbed33100
  }

  //if user doesn't exists, add new user
  else{
<<<<<<< HEAD
    var parameters=[];
    if(params !='')
      parameters.push(params);
    setUser(senderID, context, parameters);
=======

    var user = {
      "senderID" : senderID,
      "context": context,
      "parameters": [params]
    }

    users.push(user);

    fs.writeFile('./register/actualContext.json', JSON.stringify(users), function (err) {
      if (err) return console.log('error ' + err);
    });

>>>>>>> 0b245de93d39c026ea3b26a6affd2b9dbed33100
  }

}

//Delete user when he's out of context
var cleanContext = (senderID) => {
<<<<<<< HEAD
  removeUser(senderID);
=======
    var index= getIndexUser(senderID);
    if(index!=-1){
      users.splice(index, 1);

      fs.writeFile('./register/actualContext.json', JSON.stringify(users), function (err) {
        if (err) return console.log('error ' + err);
      });
    }
>>>>>>> 0b245de93d39c026ea3b26a6affd2b9dbed33100
}



module.exports= {
  getContext, setContext, cleanContext
}
