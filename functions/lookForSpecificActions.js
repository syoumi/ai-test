const {getUser} = require('./handleUser');
const {getAction} = require('./handleAction');

var lookForSpecificActions = (senderID) => {
  var actions = undefined;
  var user = getUser(senderID);
  if (user) {
    if (user.previousAction && user.previousAction != '') {
      var action = getAction(user.previousAction);
      actions = action.nextActions;
    }
  }
  return actions;
};

module.exports = {
  lookForSpecificActions
};
