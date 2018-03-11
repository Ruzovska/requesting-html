const podhod = require('./podhod.js');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const settings = require('./settings.json');
var uriWiki = settings['uriWiki'];
request({
  uri: uriWiki,
}, function(error, response, body) {

  var wiki_countries, wiki_populations, euler_countries, euler_users;
  var json = {wiki_countries: {}, wiki_populations: {}, euler_countries: {}, euler_users: {}};
  var wiki_array = [];
  var euler_array = [];
//retrieving countries and populations from Wiki
  var $ = cheerio.load(body);
  $('sup').remove();
  $('.wikitable > tbody > tr > td:nth-child(2)').each(function() {
		var link = $(this);
    var wiki_countries = link.text().trim();
    json["wiki_countries"][wiki_countries] = wiki_countries;
	});

  $('.wikitable > tbody > tr > td:nth-child(6)').each(function() {
    var link = $(this);
    var wiki_populations = link.text();
    wiki_array.push(wiki_populations);
  });
var wiki_array_counter = 0;
  for(var key in json.wiki_countries) {
    json.wiki_populations[key] = wiki_array[wiki_array_counter];
    wiki_array_counter += 1;
};
//retrieving countries and users from Euler
var euler_contents = fs.readFileSync('contents_euler.txt', 'utf8');
$ = cheerio.load(euler_contents);
$('.country_column > a').each(function() {
  var link = $(this);
  var euler_countries = link.text().trim();
  json["euler_countries"][euler_countries] = euler_countries;
});
$('td.user_column').each(function() {
  var link = $(this);
  var euler_users = link.text();
  euler_array.push(euler_users);
});
var euler_array_counter = 0;
for(var key in json.euler_countries) {
  json.euler_users[key] = euler_array[euler_array_counter];
  euler_array_counter +=1;
};
  fs.writeFileSync('output.json', JSON.stringify(json));
});
