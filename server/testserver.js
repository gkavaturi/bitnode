var fs=require('fs');
var http=require('http');
var url=require('url');
var DIR='chunks/';
var PORT=2012;


http.createServer(function(req,res){
	console.log('request recieved\n'+req.url.split("=")[1]);
	var piece=req.url.split("=")[1];
	res.end();
}).listen(PORT);

console.log('listening on '+PORT);

