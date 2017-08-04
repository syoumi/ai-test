


var getDistinct= (keywords) => {
  var distincts= [];

  keywords.forEach((keyword) => {
    if (distincts.indexOf(keyword) > -1) distincts.push(keyword);
  });

  return  distincts;

}

module.exports={
  getDistinct
}
