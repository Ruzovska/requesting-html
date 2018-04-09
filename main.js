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

// changing Serbia population 'cause it has Kosovo population as well, which we don't like

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

// putting manually some countries from output.euler_exceptions and output.wiki_exceptions
// into countries_leftover
var countries_leftover = [];
for (var key in output.wiki_exceptions) {
  for (var key2 in output.euler_exceptions) {
    if ((key.substr(0, 4) === key2.substr(0,4)) && (!key2.includes('New')) &&
    (!key2.includes('North')) && (!key2.includes('Guernsey'))) {
      countries_leftover.push([key2, output.euler_exceptions[key2], output.wiki_exceptions[key]]);
    };
  };
};

var countries_leftover2 = [];
for (var key in output.wiki_exceptions) {
  for (var key2 in output.euler_exceptions) {
    if ((key.substr((key.length - 6), key.length) === key2.substr((key2.length - 6), key2.length)) &&
    (!key2.includes('Island')) && (!key2.includes('Bissau')) && (!key2.includes('Jersey')) &&
    (!key2.includes('Macedonia')) && (!key2.includes('Tobago'))) {
      countries_leftover.push([key2, output.euler_exceptions[key2], output.wiki_exceptions[key]]);
    };
  };
};

countries_leftover.push(['USA', output.euler_exceptions['USA'], output.wiki_exceptions['United States']]);

// making countries users/populations percentages
for (var key in output.countries_populations) {
  var percentage = Number(output.countries_users[key]) / Number(output.countries_populations[key]) * 100;
  output.countries_percentage[key] = percentage;
};

// making a sorted array of the same percentages
var countries_percentage = [];
for (var key in output.countries_percentage) {
  countries_percentage.push([key, output.countries_percentage[key]]);
};
countries_percentage.sort(function(a, b) {
  return b[1] - a[1];
});

//console.log(output.wiki_exceptions);
//console.log(output.euler_exceptions);
console.log(countries_leftover);
//console.log(countries_leftover2);
//console.log(output.countries_populations);
//console.log(Object.keys(output.countries_populations).length);
//console.log(output.euler_countries);
//console.log(Object.keys(output.euler_countries).length);
console.log(output.wiki_countries);
console.log(Object.keys(output.wiki_countries).length);
