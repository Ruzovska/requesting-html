// array-from-object-maker
var toArray = function(x) {
  var myArray = [];
  for (var key in x) {
    myArray.push(x[key]);
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


const output = require('./output.json');
output.countries = {};
output.euler_exceptions = {};
output.wiki_exceptions = {};

// making arrays
var wiki_countries = toArray(output.wiki_countries);
var euler_countries = toArray(output.euler_countries);
var wiki_populations = toArray(output.wiki_populations);
var euler_users = toArray(output.euler_users);

// making countries that belong to wiki AND euler
for (i = 0; i < wiki_countries.length; i++) {
  for (j = 0; j < euler_countries.length; j++) {
    if (wiki_countries[i] === euler_countries[j]) {
      output.countries[euler_countries[j]] = wiki_populations[i];
    };
  };
};

// making euler unique countries
for (i = 0; i < euler_countries.length; i++) {
  for (var key in output.countries) {
    var isAlready = false;
    if (euler_countries[i] === key) {
      isAlready = true;
      break;
    };
  };
  if (isAlready === false) {
    output.euler_exceptions[euler_countries[i]] = euler_countries[i];
  };
};

// making wiki unique countries
for (i = 0; i < wiki_countries.length; i++) {
  for (var key in output.countries) {
    var isAlready = false;
    if (wiki_countries[i] === key) {
      isAlready = true;
      break;
    };
  };
  if (isAlready === false) {
    output.wiki_exceptions[wiki_countries[i]] = wiki_countries[i];
  };
};

console.log(output.euler_exceptions);
console.log(Object.keys(output.euler_exceptions).length);
console.log(output.wiki_exceptions);
console.log(Object.keys(output.wiki_exceptions).length);
