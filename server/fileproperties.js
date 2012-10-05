var fs = require('fs');
var util = require('util');

var filename='test.txt';
//console.log(fs.Stats(filename));
//console.log(util.inspect(filename).size);

fs.lstat(filename,function(err,stats){
	console.log(stats.size);
});
