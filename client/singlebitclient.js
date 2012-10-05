var http=require('http');
var fs=require('fs');

var options = {
  host: 'localhost',
  port: 2012,
  path: '/',
  method: 'GET'
};

http.get(options,function(res){
	var filename='peice01.data',
	 	bitfile=fs.createWriteStream(filename);
	res.on('data',function(data){
		console.log('STATUS: ' + res.statusCode+'\n');
		console.log('HEADERS: ' + JSON.stringify(res.headers)+'\n');
		console.log(data);
		bitfile.write(data);
	}).on('end',function(){
		bitfile.end();
		console.log('ending...');
	});
});