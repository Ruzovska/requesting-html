var cheerio = require("cheerio");
var request = require("request");
var settings = require('./settings.json');
var urii = settings['uri'];
request({
  uri: urii,
}, function(error, response, body) {
  var $ = cheerio.load(body);
	console.log(typeof($));
	$('.wikitable > tbody > tr > td > a').each(function() {
		var link = $(this);
		var text = link.text();
		console.log(text + '.');
	});
});
