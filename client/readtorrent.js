var fs=require('fs');

var filename='peerinfo.json',
	samplefile=fs.readFileSync(filename,'utf-8');
/*	
fs.readFile(filename,function(err,data){
	if (err) throw err;
    JSON.parse(data,function(key,value){
		console.log(key+' '+value);
		});
});

*/


//console.log(schema.seeders);

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

var info=ReadTorrent.getPeerInfo();
info.forEach(function(data){
	data.pie.forEach(function(resp){
	for (var i=0;i<resp.length;i++){
		console.log(resp[i]+' is present in '+data.loc+':'+data.port);
	}
	});
})
