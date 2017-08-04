
var getDistinct= (keywords) => {
  var distincts= [];


  keywords.forEach((keyword) => {
    var tab = keyword.split(' ');
    tab.forEach((word)=> {
      if (distincts.indexOf(word.toLowerCase()) == -1) distincts.push(word.toLowerCase());
    });
  });
  return  distincts;
}



module.exports={
  getDistinct
}
