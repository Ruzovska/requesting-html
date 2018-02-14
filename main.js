var settings = require('./settings.json');
var urii = settings['uri'];
require('request')({uri: urii,}, function (error, response, body) {console.log(body);
});
