var fs=require('fs');
var http=require('http');
var DIR='chunks';
var PORT=2012;

var nfiles;
fs.readdir(DIR+'/',function(err,files){
	if (err){
	//	res.write(err);
		console.log(err);
	}
	files.foreach(function(file){
		console.log(file);
	})	
});

console.log('listening on '+PORT);

