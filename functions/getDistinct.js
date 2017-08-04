
var getDistinct= (keywords) => {
  var distincts= [];


  keywords.forEach((keyword) => {
    var tab= keyword.split(' ');
    tab.forEach((word)=> {
      if (distincts.indexOf(word) > -1) distincts.push(word);
    })
  });

  return  distincts;

}



module.exports={
  getDistinct
}
