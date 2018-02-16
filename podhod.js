//var a = function (n) {

  //console.log(n+1);
//};
//function meow2() {
  //console.log('meow2');
//};
//var contents1 = function() {
  //console.log(contents);
  //console.log(typeof(contents));
//};


consolelog = function(x) {
  console.log(x);
  console.log(typeof(x));
};
a = function (n) {
  return n;
};
//console.log(a(5));
function sum (first, second) {
  return first + second;
}
module.exports = {
  a : a,
  consolelog : consolelog,
  sum : sum,
}
