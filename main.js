console.log('meow');
var cat = require("fs").readFileSync('meow.txt','utf8');
console.log(cat);
// require('request')({uri: 'https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)',}, function (error, response, body) {console.log(body);
// });
var a = {uri: 'https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)',};
var b = function (error, response, body) {console.log(body);};
require('request')(a, b);
