const fs = require('fs');

var jsonCities = fs.readFileSync('./resources/cities.json');
var list = JSON.parse(jsonCities).list;


const {splitMessage} = require('./../treatment/splitMessage');
const {checkEquality} = require('./../match/checkEquality');


var extractRegion = (text) => {
  var regionFound = undefined;
  var regions = [];

  text = text.toLowerCase();

  list.forEach((element) => {
    regions.push(element.region.toLowerCase());
  });

  for(var i = 0 ; i<regions.length ; i++ ){
    var region = regions[i];

    //Check if region exists on user's text
    if(text.indexOf(region)!=-1){
      regionFound = city;
      break;
    }

  }

  //If still there's no region, check if there's a synonym or user did a mistake while writing region
  if(!regionFound){
    var words = splitMessage(text);
    words.forEach((word)=> {
      for(var i = 0 ; i<regions.length ; i++ ){
        var region = regions[i];
        if(checkEquality(word, region)){
          regionFound = region;
          break;
        }
      }
    });
  }

  return regionFound;
}

var isRegion = (word) => {
  var regions = [];
  list.forEach((element) => {
    regions.push(element.region.toLowerCase());
  });

  if(regions.indexOf(word)!=-1){
    return true;
  }

  return false;
}

var getRegion= (word) => {
  var regionFound = undefined;
  var regions = [];

  list.forEach((element) => {
    regions.push(element.region.toLowerCase());
  });

  for(var i = 0 ; i<regions.length ; i++ ){
    var region = regions[i];
    if(checkEquality(word, region)){
      regionFound = region;
      break;
    }
  }

  return regionFound;
}


module.exports = {
  extractRegion, getRegion, isRegion
}
