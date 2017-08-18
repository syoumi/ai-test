const fs = require('fs');

var jsonCities = fs.readFileSync('./resources/cities.json');
var list = JSON.parse(jsonCities).list;


const {splitMessage} = require('./../treatment/splitMessage');
const {checkEquality} = require('./../match/checkEquality');


var extractNeighborhood = (text) => {
  var neighborhoodFound = undefined;
  var neighborhoods = [];

  text = text.toLowerCase();

  list.forEach((element) => {
    neighborhoods = neighborhoods.concat(element.neighborhoods);
  });

  for(var i = 0 ; i<neighborhoods.length ; i++ ){
    var neighborhood = neighborhoods[i].toLowerCase();

    //Check if neighborhood exists on user's text
    if(text.indexOf(neighborhood)!=-1){
      neighborhoodFound = neighborhood;
      break;
    }

  }

  //If still there's no neighborhood, check if there's a synonym or user did a mistake while writing neighborhood
  if(!neighborhoodFound){
    var words = splitMessage(text);
    words.forEach((word)=> {
      for(var i = 0 ; i<neighborhoods.length ; i++ ){
        var neighborhood = neighborhoods[i].toLowerCase();
        if(checkEquality(word, neighborhood)){
          neighborhoodFound = neighborhood;
          break;
        }
      }
    });
  }

  return neighborhoodFound;
}

var isNeighborhood = (word) => {
  var neighborhoods = [];

  list.forEach((element) => {
    neighborhoods = neighborhoods.concat(element.neighborhoods);
  });

  //TOlowerCase
  if(neighborhoods.indexOf(word)!=-1){
    return true;
  }

  return false;
}

var getNeighborhood = (word) => {
  var neighborhoodFound = undefined;
  var neighborhoods = [];

  list.forEach((element) => {
    neighborhoods = neighborhoods.concat(element.neighborhoods);
  });

  for(var i = 0 ; i<neighborhoods.length ; i++ ){
    var neighborhood = neighborhoods[i].toLowerCase();
    if(checkEquality(word, neighborhood)){
      neighborhoodFound = neighborhood;
      break;
    }
  }

  return neighborhoodFound;
}


module.exports = {
  extractNeighborhood, getNeighborhood, isNeighborhood
}
