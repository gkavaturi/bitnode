var fs=require('fs');
var http=require('http');
var DIR='chunks';
var PORT=2012;

http.createServer(function(req,res){
	//var filename='test.txt';]
	var nfiles;
	fs.readdir(DIR+'/',function(err,files){
		if (err){
			res.write(err);
			res.end();
		}
		files.forEach(function(file){
				var filename=DIR+'/'+file;
				res.writeHeader('200',{'Content-type':'attachment','filename':filename});
				var filestream=fs.createReadStream(filename);
				filestream.on('data',function(chunk){
					//	console.log(chunk);
						res.write(chunk);
				});

				filestream.on('end',function(){
					res.end();
					});
				console.log('sent file number '+file+'\n');
			}
		);
		
	});
	
}).listen(PORT);

console.log('listening on '+PORT);

