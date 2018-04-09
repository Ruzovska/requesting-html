var conlog = function(x) {
  console.log(x);
  console.log(typeof(x));
};
// array-from-object-maker
var toArray = function(x) {
  var myArray = [];
  for (var key in x) {
    myArray.push([key, x[key]]);
  };
  return myArray;
};
// object-from-array maker
var toObject = function(x) {
  var myObject = {};
  for (i = 0; i < x.length; i++) {
    myObject[x[i]] = x[i];
  };
  return myObject;
};
// object-from-2-dimensions-array maker
var toObject2d = function(x) {
  var myObject = {};
  for (i = 0; i < x.length; i++) {
    myObject[x[i][0]] = x[i][1];
  };
  return myObject;
};
module.exports = {
  conlog: conlog,
  toArray: toArray,
  toObject: toObject,
  toObject2d: toObject2d,
};
