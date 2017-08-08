const {isIgnorable} = require('./ignoreWords');

var getDistinct= (keywords) => {
  var distincts= [];


  keywords.forEach((keyword) => {
    var tab = keyword.split(' ');
    tab.forEach((word)=> {
      if (distincts.indexOf(word.toLowerCase()) == -1) distincts.push(word.toLowerCase());
    });
  });

  distincts = distincts.filter((item) => {
    return item != '' && !(isIgnorable(item));
  });

  return distincts;
}



module.exports={
  getDistinct
}
