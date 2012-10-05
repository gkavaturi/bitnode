var http=require('http');
var fs=require('fs');
var exec=require('child_process').exec;
var spawn=require('child_process').spawn;
var options = {
  host: 'localhost',
  port: 2012,
  path: '/',
  method: 'GET'
};

/*
var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode+'\n');
  console.log('HEADERS: ' + JSON.stringify(res.headers)+'\n');
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk+'\n');
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();
*/

var file_name='test.txt';
var file=fs.createWriteStream(file_name);

http.get(options,function(res){
	res.on('data',function(data){
		file.write(data);
	}).on('end',function(){
		file.end();
		console.log(file_name+' downloaded')
	});
});