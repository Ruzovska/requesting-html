const fs = require('fs');
const output = require('./output.json');
const Serbia = require('./Serbia.json');
const output2 = require('./output2.json');
output.euler_exceptions = {};
output.wiki_exceptions = {};
output.countries_total_percentage = {};
output.countries = {};
output.leftover = {};

// making countries that belong to wiki AND euler
for (var key in output.wiki_countries) {
  for (var key2 in output.euler_countries) {
    if (key === key2) {
      output.countries[key2] = {'population': output.wiki_countries[key], 'users': output.euler_countries[key2]};
    };
  };
};

// changing Serbia population 'cause it has Kosovo population as well, which we don't like
output.countries['Serbia']['population'] = Serbia['Serbia'];
// making euler unique countries
for (var key in output.euler_countries) {
  for (var key2 in output.countries) {
    var isAlready = false;
    if (key === key2) {
      isAlready = true;
      break;
    };
  };
  if (isAlready === false) {
    output.euler_exceptions[key] = output.euler_countries[key];
  };
};

// making wiki unique countries
for (var key in output.wiki_countries) {
  for (var key2 in output.countries) {
    var isAlready = false;
    if (key === key2) {
      isAlready = true;
      break;
    };
  };
  if (isAlready === false) {
    output.wiki_exceptions[key] = output.wiki_countries[key];
  };
};

// putting manually some countries from output.euler_exceptions and output.wiki_exceptions
// into output.leftover
for (var key in output.wiki_exceptions) {
  for (var key2 in output.euler_exceptions) {
    if ((key.substr(0, 4) === key2.substr(0,4)) && (!key2.includes('New')) &&
    (!key2.includes('North')) && (!key2.includes('Guernsey'))) {
      output.leftover[key2] = {'population': output.wiki_exceptions[key], 'users': output.euler_exceptions[key2]};
    };
  };
};

for (var key in output.wiki_exceptions) {
  for (var key2 in output.euler_exceptions) {
    if ((key.substr((key.length - 6), key.length) === key2.substr((key2.length - 6), key2.length)) &&
    (!key2.includes('Island')) && (!key2.includes('Bissau')) && (!key2.includes('Jersey')) &&
    (!key2.includes('Macedonia')) && (!key2.includes('Tobago'))) {
      output.leftover[key2] = {'population': output.wiki_exceptions[key], 'users': output.euler_exceptions[key2]};
    };
  };
};

output.leftover['USA'] = {
  'population': output.wiki_exceptions['United States'],
  'users': output.euler_exceptions['USA']
};
output.leftover['Virgin Islands'] = {
  'population': Number(output.wiki_countries['United States Virgin Islands']) +
  Number(output.wiki_countries['British Virgin Islands']),
  'users': output.euler_countries['Virgin Islands']
};
output.leftover['FYR of Macedonia'] = {
  'population': output.wiki_countries['Republic of Macedonia'],
  'users': output.euler_countries['FYR of Macedonia']
};
// putting individual countries into output.leftover
for (var key in output2) {
  output.leftover[key] = {'population': output2[key], 'users': output.euler_exceptions[key]};
};
// combining all needed countries
output.countries_total = {};
for (var key in output.countries) {
  output.countries_total[key] = output.countries[key];
};
//for (var key in output.countries) {
  //output.countries_total[key]['population'] = output.countries[key]['population'];
  //output.countries_total[key]['users'] = output.countries[key]['users'];
//};
for (var key in output.leftover) {
  output.countries_total[key] = output.leftover[key];
};
//for (var key in output.leftover) {
  //output.countries_total[key]['population'] = output.leftover[key]['population'];
  //output.countries_total[key]['users'] = output.leftover[key]['users'];
//};
// making countries users/populations percentages
for (var key in output.countries_total) {
  var percentage = Number(output.countries_total[key]['users']) / Number(output.countries_total[key]['population']) * 100;
  output.countries_total_percentage[key] = percentage;
};
// making a sorted array of the same percentages
var countries_total_percentage = [];
for (var key in output.countries_total_percentage) {
  countries_total_percentage.push([key, output.countries_total_percentage[key]]);
};
countries_total_percentage.sort(function(a, b) {
  return b[1] - a[1];
});
// putting output to output_final.json
fs.writeFileSync('output_final.json', JSON.stringify(output));
//console.log(output.wiki_exceptions);
//console.log(output.euler_exceptions);
//console.log(output.countries);
//console.log(Object.keys(output.countries).length);
//console.log(output.leftover);
//console.log(output.countries_total_percentage);
//console.log(Object.keys(output.countries_total_percentage).length);
//console.log(countries_total_percentage);
//console.log(countries_total_percentage.length);
//console.log(output.countries_total);
//console.log(Object.keys(output.countries_total).length);
//console.log(output.countries_total['USA']);
console.log(output);
