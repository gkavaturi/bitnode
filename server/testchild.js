var DIR='chunks';
process.on('message', function(server) {
  {
    server.on('connection', function (socket) {
		var filename=__dirname+DIR+'/'+req.url.split("=")[1],
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
    });
  }
});