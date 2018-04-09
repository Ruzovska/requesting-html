const podhod = require('./podhod.js');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const settings = require('./settings.json');

var output = {wiki_countries: {}, euler_countries: {}};
request({
  uri: settings['uriWiki'],
}, function(error, response, body) {
  var wiki_array = [];
  var euler_array = [];
// retrieving countries and populations from Wiki to wiki_array[country, population]
  var $ = cheerio.load(body);
  $('sup').remove();
  $('.wikitable > tbody > tr > td:nth-child(2)').each(function() {
		var link = $(this);
    var wiki_countries = link.text().trim();
    wiki_array.push([wiki_countries])
	});

  var n = 0;
  $('.wikitable > tbody > tr > td:nth-child(6)').each(function() {
    var link = $(this);
    var wiki_populations = link.text().replace(/,/g, '');
    wiki_array[n].push(wiki_populations);
    n = n + 1;
  });
// putting wiki_array to output.wiki_countries (object)
  output.wiki_countries = podhod.toObject2d(wiki_array);
//retrieving countries and users from Euler
var euler_contents = fs.readFileSync('contents_euler.txt', 'utf8');
$ = cheerio.load(euler_contents);
$('.country_column > a').each(function() {
  var link = $(this);
  var euler_countries = link.text().trim();
  euler_array.push([euler_countries]);
});
n = 0;
$('td.user_column').each(function() {
  var link = $(this);
  var euler_users = link.text();
  euler_array[n].push(euler_users);
  n = n + 1;
});
// putting euler_array to output.euler_countries (object)
  output.euler_countries = podhod.toObject2d(euler_array);
// putting it all to an external JSON
  fs.writeFileSync('output.json', JSON.stringify(output));
});

// retrieving populations for individual countries
var output2 = {wiki_individuals: {}};
request({
  uri: settings['uriSerbia'],
}, function(error, response, body) {
  var $ = cheerio.load(body);
  $('span').remove();
  $('sup').remove();
  $('a').remove();
  $(settings['selectorSerbiaPopulation']).each(function() {
    var link = $(this);
    var population = link.text().replace(/[(), ]/g, '');
    output2.wiki_individuals['Serbia'] = population;
  });
  fs.writeFileSync('output2.json', JSON.stringify(output2));
});
