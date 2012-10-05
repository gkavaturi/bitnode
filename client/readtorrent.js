var fs=require('fs');

var filename='peerinfo.json',
	samplefile=fs.createReadStream(filename);
	

fs.readFile('peerinfo.json','utf-8',function(err,data){
	if (err) throw err;
    JSON.parse(data,function(key,value){
    	if (key=='seeders'){
			console.log(value[1]);
		}
	});
});