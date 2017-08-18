const fs = require('fs');

var jsonCities = fs.readFileSync('./resources/cities.json');
var list = JSON.parse(jsonCities).list;


const {splitMessage} = require('./../treatment/splitMessage');
const {checkEquality} = require('./../match/checkEquality');


var extractCity = (text) => {
  var cityFound = undefined;
  var cities = [];

  text = text.toLowerCase();

  list.forEach((element) => {
    cities.push(element.city.toLowerCase());
  });

  for(var i = 0 ; i<cities.length ; i++ ){
    var city = cities[i];

    //Check if city exists on user's text
    if(text.indexOf(city)!=-1){
      cityFound = city;
      break;
    }

  }

  //If still there's no city, check if there's a synonym or user did a mistake while writing city
  if(!cityFound){
    var words = splitMessage(text);
    words.forEach((word)=> {
      for(var i = 0 ; i<cities.length ; i++ ){
        var city = cities[i];
        if(checkEquality(word, city)){
          cityFound = city;
          break;
        }
      }
    });
  }

  return cityFound;
}

var isCity = (word) => {
  var cities = [];
  list.forEach((element) => {
    cities.push(element.city.toLowerCase());
  });

  if(cities.indexOf(word)!=-1){
    return true;
  }

  return false;
}

var getCity = (word) => {
  var cityFound = undefined;
  var cities = [];

  list.forEach((element) => {
    cities.push(element.city.toLowerCase());
  });

  for(var i = 0 ; i<cities.length ; i++ ){
    var city = cities[i];
    if(checkEquality(word, city)){
      cityFound = city;
      break;
    }
  }

  return cityFound;
}


module.exports = {
  extractCity, getCity, isCity
}
