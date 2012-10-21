var express=require('express');
var app=express();
var PORT=7214;
app.get('/',function(req,res){
	//res.send('Testing file transfer');
	//res.sendfile('/uploads/' + uid + '/' + file);
	res.sendfile('test.txt',function(err){
		res.end('An Error has occured during file transfer '+err);
	});
});

app.listen(PORT);
console.log('Listening on Port '+PORT);

