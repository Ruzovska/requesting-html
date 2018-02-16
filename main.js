var settings = require('./settings.json');
var contents;
var urii = settings['uri'];
require('request')({uri: urii,}, function (error, response, body) {contents = body;
});
