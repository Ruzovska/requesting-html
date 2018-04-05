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
output.countries_populations = {};
output.countries_users = {};
output.euler_exceptions = {};
output.wiki_exceptions = {};
output.countries_percentage = {};

// making countries that belong to wiki AND euler
for (var key in output.wiki_countries) {
  for (var key2 in output.euler_countries) {
    if (output.wiki_countries[key] === output.euler_countries[key2]) {
      output.countries_populations[output.euler_countries[key2]] = output.wiki_populations[key];
      output.countries_users[output.euler_countries[key2]] = output.euler_users[key2];
    };
  };
};

// making euler unique countries
for (var key in output.euler_countries) {
  for (var key2 in output.countries_populations) {
    var isAlready = false;
    if (output.euler_countries[key] === key2) {
      isAlready = true;
      break;
    };
  };
  if (isAlready === false) {
    output.euler_exceptions[output.euler_countries[key]] = output.euler_users[key];
  };
};

// making wiki unique countries
for (var key in output.wiki_countries) {
  for (var key2 in output.countries_populations) {
    var isAlready = false;
    if (output.wiki_countries[key] === key2) {
      isAlready = true;
      break;
    };
  };
  if (isAlready === false) {
    output.wiki_exceptions[output.wiki_countries[key]] = output.wiki_populations[key];
  };
};

// making countries users/populations percentage
for (var key in output.countries_populations) {
  var percentage = Number(output.countries_users[key]) / Number(output.countries_populations[key]) * 100;
  output.countries_percentage[key] = percentage;
};

var countries_percentage = [];
for (var key in output.countries_percentage) {
  countries_percentage.push([key, output.countries_percentage[key]]);
};
countries_percentage.sort(function(a, b) {
  return b[1] - a[1];
});
console.log(countries_percentage);
