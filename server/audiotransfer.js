var fs=require('fs');
var http=require('http');
var PORT=2012;

http.createServer(function(req,res){
	//var filename='test.txt';
	var filename='bach_D_major.mp3';
	res.writeHeader('200',{'Content-type':'attachment','filename':filename});
	
	var filestream=fs.createReadStream(filename);
	filestream.on('data',function(chunk){
			console.log(chunk);
			res.write(chunk);
	});
	
	filestream.on('end',function(){
		res.end();
		});
	
}).listen(PORT);

console.log('listening on '+PORT);

