const {userExists} = require('./handleUser');
const {getUser} = require('./handleUser');
const {getAction} = require('./handleAction');

var lookForSpecificActions = (senderID) => {
  var actions = undefined;
  if (userExists(senderID)) {
    var user = getUser(senderID);
    if (user.previousAction && user.previousAction != '') {
      var action = getAction(user.previousAction);
      // var nextActions = action.
    }
  }
  return actions;
};

module.exports = {
  lookForSpecificActions
};
