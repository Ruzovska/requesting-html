var podhod = require('./podhod.js')
var cheerio = require("cheerio");
var request = require("request");
var settings = require('./settings.json');
var urii = settings['uri'];
var contents = request({
  uri: urii,
}, function(error, response, body) {
  var $ = cheerio.load(body);
	$('.wikitable > tbody > tr > td > a').each(function() {
		var link = $(this);
		var text = link.text();
	});
});
//console.log(contents);
//console.log(typeof(contents));
podhod.consolelog(podhod.sum(5,6));
