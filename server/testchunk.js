var fs=require('fs');
var DIR='chunks';
var filename='bach_D_major.mp3',
	count=0,
	filestream=fs.createReadStream(filename);

	fs.lstat(filename,function(err,stats){
		console.log('The name of the file is '+filename+'\n Size of file is '+Math.ceil((stats.size)/Math.pow(2,20))+' MB');
	});	

filestream.on('data',function(chunk){
	var upfile=DIR+'/'+'piece'+count+'.data';
		upstream=fs.createWriteStream(upfile);
	upstream.write(chunk);
	count++;
});

filestream.on('end',function(){
	console.log('\nTotal number of pieces are '+count);
});