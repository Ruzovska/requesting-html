// array-from-object-maker
var meow = function(x) {
  var myArray = [];
  for (key in x) {
    myArray.push(x[key]);
  };
  return myArray;
};

const output = require('./output.json');
output.countries = {};
output.euler_exceptions = {};
// making arrays
var wiki_countries = meow(output.wiki_countries);
var euler_countries = meow(output.euler_countries);
var wiki_populations = meow(output.wiki_populations);
var euler_users = meow(output.euler_users);
var euler_exceptions = [];

for (i = 0; i < wiki_countries.length; i++) {
  for (j = 0; j < euler_countries.length; j++) {
    if (wiki_countries[i] === euler_countries[j]) {
      output.countries[euler_countries[j]] = euler_countries[j] + ' ' + wiki_populations[i];
    };
  };
};


console.log(output.countries);
console.log(Object.keys(output.countries).length);
console.log(output.euler_exceptions);
console.log(Object.keys(output.euler_exceptions).length);
console.log(euler_exceptions);
