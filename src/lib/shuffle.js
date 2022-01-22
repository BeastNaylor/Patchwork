function shuffle(myArray) {
  var i = myArray.length;
  if (i === 0) return false;
  while (--i) {
    var j = Math.floor(Math.random() * (i + 1));
    var tempi = myArray[i];
    var tempj = myArray[j];
    myArray[i] = tempj;
    myArray[j] = tempi;
  }
  return myArray;
}

export default shuffle;
