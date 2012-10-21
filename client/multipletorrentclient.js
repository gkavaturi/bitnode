var http=require('http');
var fs=require('fs');
var DIR='chunks/'

var filename='peerinfo.json',
	samplefile=fs.readFileSync(filename,'utf-8');

var ReadTorrent={
	schema: JSON.parse(samplefile),
	getPeerInfo:function(){	
		var info=[];
		this.schema.seeders.forEach(function(data){
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
		var filename=DIR+bitname,
		 	bitfile=fs.createWriteStream(filename);
		res.on('data',function(data){
			console.log('STATUS: ' + res.statusCode+'\n');
			console.log('HEADERS: ' + JSON.stringify(res.headers)+'\n');
			console.log(data);
			bitfile.write(data);
		}).on('end',function(){
			bitfile.end();
			console.log('ending...');
		});
	});
};

var info=ReadTorrent.getPeerInfo();
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
})
