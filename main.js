const fs = require('fs');
const podhod = require('./podhod.js');
const output = require('./output.json');
output.countries = {};
output.euler_exceptions = {};
output.wiki_exceptions = {};

var wiki_countries_array = [];
for (var key in output.wiki_countries) {
  wiki_countries_array.push(key);
};
for(var key in output.euler_countries) {
  for (var i=0; i<wiki_countries_array; i++) {
    if (key === wiki_countries_array[i]) {
      output.countries[key] = key;
    } else {
      output.euler_exceptions[key] = key;
    };
  };
};
for(var key in output.wiki_countries) {
  if (output.euler_countries[key] !== key) {
    output.wiki_exceptions[key] = key;
  };
};
// logging stuff
var countries_array = [];
for(var key in output.countries) {
  countries_array.push(key);
};
countries_array.sort();

var euler_exceptions_array = [];
for(var key in output.euler_exceptions) {
  euler_exceptions_array.push(key);
};

var wiki_exceptions_array = [];
for(var key in output.wiki_exceptions) {
  wiki_exceptions_array.push(key);
};
wiki_exceptions_array.sort();

console.log(euler_exceptions_array);
console.log(wiki_exceptions_array);
console.log(output.countries);
console.log(Object.keys(output.countries).length);
