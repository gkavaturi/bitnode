var express=require('express');
var app=express();
var PORT=2012;

app.get('/',function(req,res){
	var filename="test.txt";
	res.attachment(filename);
	res.send('transfering the file\n');
	res.end();
});

app.listen(PORT);
console.log('Listening on Port '+PORT);

