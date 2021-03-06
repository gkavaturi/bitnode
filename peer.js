var http=require('http');
var fs=require('fs');
var crypto=require('crypto');
var os=require('os');
var custom=require('./custom');

var SERVER_PORT=(process.argv.length>2 && process.argv[2].split(":")[0]=="port" && !isNaN(process.argv[2].split(":")[1]))?process.argv[2].split(":")[1]:2012;

var DIR=(process.argv.length>3 && process.argv[3].split(":")[0]=="folder" && isNaN(process.argv[3].split(":")[1]))?process.argv[3].split(":")[1]:'./test/peer/';


	
var optionsU={
	host:'localhost',
	port:3000,
	path:'/update',
	method:'POST'
};

var updateServer=http.request(optionsU,function(res){
	res.setEncoding('utf8');
	res.on('data',function(chunk){
		console.log('Updated Server: '+chunk);
	});
});

console.log('This system unique id is '+custom.cleanString(custom.getUniqueId()));
//trying to set cookie
var optionsC={
    host:'localhost',
	port:3000,
	path:'/progress?uniqueid='+custom.cleanString(custom.getUniqueId()),
	method:'GET'
};
/*
var setCookie=http.request(optionsC,function(res){
    console.log(JSON.stringify(optionsC));
    res.setEncoding('utf8');
    console.log('HEADERS: '+JSON.stringify(res.headers));
    res.on('data',function(data){
       console.log('set cookie '+data); 
    });
});

setCookie.on('error',function(e){
   console.log('problem with set cookie request '+e.message); 
});
*/
//setCookie.write('set cookie');
//setCookie.end();

var ReadTorrent={
	getPeerInfo:function(filename){	
		if (!(filename)){
			console.log('no file name detected');
			process.exit();
		}
		var info=[],
			samplefile = fs.readFileSync(filename,'utf-8',function(err){
				throw err;
			}),
		schema = JSON.parse(samplefile);
		schema.seeders.forEach(function(data){
			data.uniqueid = custom.cleanString(data.uniqueid);
			//if ((data.uniqueid) !== resid)
			{
				var location = data.location,
					port = data.port,
					uniqueid=data.uniqueid,
					pieces = [ ];
				pieces.push(data.pieces);
				//	console.log(location+' '+' '+uniqueid+' '+pieces);
				info.push({loc:location,port:port,uniqueid:uniqueid,pie:pieces});
				}
			});
			return info;
			}
}



var getData=function(bitname,options){
	http.get(options,function(res){
		var filename=DIR+bitname,
		 	bitfile=fs.createWriteStream(filename);
		res.on('data',function(data){
			//console.log('STATUS: ' + res.statusCode+'\n');
			//console.log('HEADERS: ' + JSON.stringify(res.headers)+'\n');
			//console.log(data);
			bitfile.write(data);
		}).on('end',function(){
			bitfile.end();
			console.log('ending...');
		});
	});
};

var downloadFile=function(filename){
	var resid = custom.cleanString(custom.getUniqueId()).replace(/\s+/gi,''),
	 	info=ReadTorrent.getPeerInfo(filename),
		orgfile=filename.split('/')[2];
	info.forEach(function(data){
		console.log(data);
		data.pie.forEach(function(bits){
			//console.log(bits+' is present in '+data.loc+':'+data.port);	
			for (var i=0;i<bits.length;i++){
				var options = {
				  host: data.loc,
				  port: data.port,
				  path: '/?bitname='+bits[i],
				  method: 'GET'
				};
				//console.log(data.uniqueid+' '+resid);
				if ((data.uniqueid) !== resid){
					getData(bits[i],options);
				}
				updateServer.write(JSON.stringify({
					uniqueid:custom.getUniqueId(),
					filename:orgfile,
					bitname:bits[i]
				}));
			}
		});
	});
	updateServer.end();
	return true;
}

var concanateFile=function(filename){
	var files=fs.readdirSync(DIR);
	files.forEach(function(singlebit){
		//console.log(files);
		var bit=fs.createReadStream(DIR+singlebit);
		var resultfile=fs.createWriteStream(filename,{
			flags:'a+',
			encoding:null,
			mode:0666,
			bufferSize: 64 * 1024
		});
		bit.on('data',function(bitdata){ 
				resultfile.write(bitdata); 
			}).on('end',function(){
				resultfile.end();
			});
		});
	console.log('file complete');

}



process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data',function(text){
	text=text.toString().trim();
	var instr=text.split(' ');

	if(text=='quit'){
		process.stdout.write('now exiting\n');
		process.exit();
	}
	if (instr[0]=='start' && instr[1]){
		process.stdout.write('Opening '+instr[1]+'\n');
		if (downloadFile(instr[1])==true){
			concanateFile('bach.mp3');
			process.stdout.write('Download complete');
		}else{
			process.stdout.write('Oops! Something went wrong. Please try again or send an email to support along with the link to the file you were trying to download\n');
			process.exit();
		}
	}else{
		process.stdout.write('Error: Undefined command\n')
	}	
});

http.createServer(function(req,res){
	var filename=__dirname+'/'+DIR+req.url.split("=")[1],
		upstream=fs.createReadStream(filename);
	console.log('opening filename '+filename);
	//console.log(upstream);	
	upstream.on('data',function(data){
		//console.log(data);
		res.write(data);
	}).on('end',function(){
		res.end();
		console.log('ending transfer...\n*******\n');
	});
}).listen(SERVER_PORT);

console.log('listening on '+SERVER_PORT+' download dir: '+DIR);
/**/
