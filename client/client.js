var http=require('http');
var fs=require('fs');
var child_process=require('child_process');
/**
var exec=require('child_process').exec;
var spawn=require('child_process').spawn;
**/
var DIR='chunks';
var options = {
  host: 'localhost',
  port: 2012,
  path: '/',
  method: 'GET'
};

/**
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
**/

//var filename='test.txt';
var filename=DIR+'/'+'bach_D_major.mp3';
var file=fs.createWriteStream(filename);

http.get(options,function(res){
	console.log('STATUS: ' + res.statusCode+'\n');
	console.log('HEADERS: ' + JSON.stringify(res.headers)+'\n');
	res.on('data',function(data){
		file.write(data);
	}).on('end',function(){
		file.end();
		//child_process.execFile(filename);
		console.log(filename+' downloaded')
	});
});