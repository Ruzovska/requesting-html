var cat = require("fs").readFileSync('meow.txt','utf8');
console.log(cat);

// require('request')({uri: 'https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)',}, function (error, response, body) {console.log(body);
// });
//
var a = {uri: 'https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)',};
var globalstring;
var b = function (error, response, body) {
	console.log('body = ' + body);
	console.log('body is ' + typeof(body) + ' in the function');
	globalstring = body;
	console.log('globalstring inside = ' + globalstring);
	console.log('globalstring is ' + typeof(globalstring) + ' in the function');
};
require('request')(a, b);
console.log('body is globally ' + typeof(body));
console.log('globalstring is globally ' + typeof(globalstring));
console.log('globalstring outside = ' + globalstring);
//
