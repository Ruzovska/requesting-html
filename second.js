var contents = require("fs").readFileSync('meow.txt','utf8');
var India = contents.slice(contents.indexOf('India'), contents.indexOf('</a>', contents.indexOf('India')))
console.log(India);

console.log(require('./settings.json'));
