var podhod = require('./podhod.js');
var request = require('request');
var fs = require('fs');
var contents;
function meow(error,response,body) {
  fs.appendFileSync('temp.txt', body);
};
request('http://www.vk.com', meow);
