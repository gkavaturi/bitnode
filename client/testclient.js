var http=require('http');
var fs=require('fs');

var options = {
  host: 'localhost',
  port: 2012,
  path: '/?bit=piece1.data',
  method: 'GET'
};

http.get(options,function(res){
	res.on('data',function(data){
		console.log('STATUS: ' + res.statusCode+'\n');
		console.log('HEADERS: ' + JSON.stringify(res.headers)+'\n');
		console.log(data);
	}).on('end',function(){
		console.log('ending...');
	});
});