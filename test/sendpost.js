var http=require('http');

var options={
	host:'localhost',
	port:3000,
	path:'/upload',
	method:'POST'
};

var req=http.request(options,function(res){
	console.log('Status: '+res.statusCode);
	console.log('Headers: '+JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data',function(chunk){
		console.log('Body: '+chunk);
	});
});

req.on('error',function(e){
	console.log('problem with request: '+e.message);
});

var data={};
data.uniqueid="ì:GQî\u000bôÔc(/:BÐn";
data.bitname="piece19.data";
data.filename="bach_arai.json";
req.write(JSON.stringify(data));
req.end();