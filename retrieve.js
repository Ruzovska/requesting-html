const podhod = require('./podhod.js');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const settings = require('./settings.json');
var uriWiki = settings['uriWiki'];
//retrieving countries and populations from Wiki
request({
  uri: uriWiki,
}, function(error, response, body) {

  var $ = cheerio.load(body);
  $('.wikitable > tbody > tr > td:nth-child(2) > a').each(function() {
		var link = $(this);
		var text = link.text() + '\n';
    fs.appendFileSync('wiki_countries.txt', text)
	});

  $('.wikitable > tbody > tr > td:nth-child(6)').each(function() {
    var link = $(this);
    var text = link.text() + '\n';
    fs.appendFileSync('wiki_populations.txt', text);
  });
});
//retrieving countries and users from Euler
var euler_contents = fs.readFileSync('contents_euler.txt', 'utf8');
$ = cheerio.load(euler_contents);
$('.country_column > a').each(function() {
  var link = $(this);
  var text = link.text() + '\n';
  fs.appendFileSync('euler_countries.txt', text);
});
$('.user_column').each(function() {
  var link = $(this);
  var text = link.text() + '\n';
  fs.appendFileSync('euler_users.txt', text);
});
