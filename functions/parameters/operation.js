const fs = require('fs');

var jsonOperations = fs.readFileSync('./resources/operations.json');
var list = JSON.parse(jsonOperations).list;


const {splitMessage} = require('./../treatment/splitMessage');
const {checkEquality} = require('./../match/checkEquality');


var extractOperation = (text) => {
  var operationFound = undefined;

  text = text.toLowerCase();

  for(var i = 0 ; i<list.length ; i++ ){
    var op = list[i];

    //Check if city exists on user's text
    if(text.indexOf(op)!=-1){
      operationFound = op;
      break;
    }

  }

  //If still there's no city, check if there's a synonym or user did a mistake while writing city
  if(!operationFound){
    var words = splitMessage(text);
    words.forEach((word)=> {
      for(var i = 0 ; i<list.length ; i++ ){
        var op = list[i];
        if(checkEquality(word, op)){
          operationFound = op;
          break;
        }
      }
    });
  }

  return operationFound;
}

var isOperation = (word) => {

  if(list.indexOf(word)!=-1){
    return true;
  }

  return false;
}

var getOperation= (word) => {
  var operationFound = undefined;


  for(var i = 0 ; i<list.length ; i++ ){
    var op = list[i];
    if(checkEquality(word, op)){
      operationFound = op;
      break;
    }
  }

  return operationFound;
}


module.exports = {
  extractOperation, getOperation, isOperation
}
