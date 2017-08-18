const fs = require('fs');

var jsonBuildings = fs.readFileSync('./resources/buildings.json');
var list = JSON.parse(jsonBuildings).list;


const {splitMessage} = require('./../treatment/splitMessage');
const {checkEquality} = require('./../match/checkEquality');


var extractBuilding = (text) => {
  var buildingFound = undefined;

  text = text.toLowerCase();

  for(var i = 0 ; i<list.length ; i++ ){
    var building = list[i];

    //Check if city exists on user's text
    if(text.indexOf(building)!=-1){
      buildingFound = building;
      break;
    }

  }

  //If still there's no city, check if there's a synonym or user did a mistake while writing city
  if(!buildingFound){
    var words = splitMessage(text);
    words.forEach((word)=> {
      for(var i = 0 ; i<list.length ; i++ ){
        var building = list[i];
        if(checkEquality(word, building)){
          buildingFound = building;
          break;
        }
      }
    });
  }

  return buildingFound;
}

var isBuilding = (word) => {

  if(list.indexOf(word)!=-1){
    return true;
  }

  return false;
}

var getBuilding = (word) => {
  var buildingFound = undefined;

  for(var i = 0 ; i<list.length ; i++ ){
    var building = list[i];
    if(checkEquality(word, building)){
      buildingFound = building;
      break;
    }
  }

  return buildingFound;
}


module.exports = {
  extractBuilding, getBuilding, isBuilding
}
