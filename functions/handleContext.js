const fs = require('fs');

var register=  fs.readFileSync('./register/actualContext.json');

var users= JSON.parse(register);

//Find out the index of user, if it exists
var getIndexUser = (senderID) => {
  var index= -1;
  for (var i= 0; i< users.length; i++) {
   var user= users[i];
   if(user.senderID === senderID){
    // console.log(`USER: ${user.senderID}`);
    // console.log(`Context: ${user.context.output}`);
    index=i;
    break;
   }
  }
  return index;
}


//Get the actual context of user
var getContext = (senderID) => {
  var index= getIndexUser(senderID);
  var context= undefined;
  if(index != -1){
    context= users[index].context;
  }
  return context;
}

//Set the actual context of user
var setContext = (senderID, context, params) => {
  var index= getIndexUser(senderID);

  //if user already exists, update context
  if(index != -1){

    users[index].context.input =  users[index].context.output;
    users[index].context.output = context.output;
    users[index].parameters.push(params);

    fs.writeFile('./register/actualContext.json', JSON.stringify(users), function (err) {
      if (err) return console.log(err);
    });
  }

  //if user doesn't exists, add new user
  else{

    var user = {
      "senderID" : senderID,
      "context": context,
      "parameters": [params]
    }

    users.push(user);

    fs.writeFile('./register/actualContext.json', JSON.stringify(users), function (err) {
      if (err) return console.log(err);
    });

  }

}

//Delete user when he's out of context
var cleanContext = (senderID) => {
    var index= getIndexUser(senderID);
    if(index!=-1){
      users.splice(index, 1);

      fs.writeFile('./register/actualContext.json', JSON.stringify(users), function (err) {
        if (err) return console.log(err);
      });
    }
}



module.exports= {
  getContext, setContext, cleanContext
}
