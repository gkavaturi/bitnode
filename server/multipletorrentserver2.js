var fs=require('fs');
var http=require('http');
var url=require('url');
var DIR='chunks/';
var PORT=2013;


http.createServer(function(req,res){
	var filename=DIR+req.url.split("=")[1],
		upstream=fs.createReadStream(filename);
	console.log('opening filename '+filename);
	console.log(upstream);	
	upstream.on('data',function(data){
	console.log(data);
	res.write(data);
	}).on('end',function(){
	res.end();
	console.log('ending transfer...\n');
	});
	
}).listen(PORT);

console.log('listening on '+PORT);

