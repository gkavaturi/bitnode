var http=require('http');
var fs=require('fs');
var SERVER_PORT=2012;
var DIR='/test/peer2/';

	
var ReadTorrent={
	getPeerInfo:function(filename){	
		if (!(filename)){
			console.log('no file name detected');
			process.exit();
		}
		var info=[],
			samplefile= fs.readFileSync(filename,'utf-8',function(err){
				throw err;
			}),
			schema= JSON.parse(samplefile);
		schema.seeders.forEach(function(data){
					var location=data.location,
						port=data.port,
						pieces=[ ];
					pieces.push(data.pieces);
					//console.log(location+' '+ typeof pieces);
					info.push({loc:location,pie:pieces,port:port});
					});
				return info;
			}
}



var getData=function(bitname,options){
	http.get(options,function(res){
		var filename=__dirname+DIR+'/'+bitname,
		 	bitfile=fs.createWriteStream(filename);
		res.on('data',function(data){
			console.log('STATUS: ' + res.statusCode+'\n');
			console.log('HEADERS: ' + JSON.stringify(res.headers)+'\n');
			console.log(data);
			bitfile.write(data);
		}).on('end',function(){
			bitfile.end();
			console.log('ending... wrote data to '+filename);
		});
	});
};

var downloadFile=function(filename){
	var info=ReadTorrent.getPeerInfo(filename);
	info.forEach(function(data){
		data.pie.forEach(function(bits){
		for (var i=0;i<bits.length;i++){
			console.log(bits[i]+' is present in '+data.loc+':'+data.port);
			var options = {
			  host: data.loc,
			  port: data.port,
			  path: '/?bitname='+bits[i],
			  method: 'GET'
			};
			getData(bits[i],options);
		}
		});
	});
}


process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data',function(text){
text=text.toString().trim();
var instr=text.split(" ");
process.stdout.write("Opening "+instr[1]+"\n");
if(text=='quit'){
	process.stdout.write('now exiting\n');
	process.exit();
}
if (instr[0]=='start' && instr[1]){
	downloadFile(instr[1]);
}else{
	process.stdout.write('undefined command')
}
});


http.createServer(function(req,res){
	var filename=__dirname+DIR+req.url.split("=")[1],
		upstream=fs.createReadStream(filename);
	console.log('opening filename '+filename);
	console.log(upstream);	
	upstream.on('data',function(data){
	console.log(data);
	res.write(data);
	}).on('end',function(){
	res.end();
	console.log('ending transfer...\n*******\n');
	});
}).listen(SERVER_PORT);

console.log('listening on '+SERVER_PORT);
