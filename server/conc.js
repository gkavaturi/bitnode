var fs=require('fs');
var DIR='chunks/';

	
var files=fs.readdirSync(DIR);
var filename='bach.mp3';
		
files.forEach(function(singlebit){
	//console.log(files);
	var bit=fs.createReadStream(DIR+singlebit,{ 
	  flags: 'r+',
	  encoding: null,
	  fd: null,
	  mode: 0666,
	  bufferSize: 64 * 1024
	});
	var resultfile=fs.createWriteStream(filename,{
		flags:'r+',
		encoding:null,
		mode:0666,
		bufferSize: 64 * 1024
	});
	bit.on('data',function(bitdata){ 
			resultfile.write(bitdata); 
			console.log(bitdata);
		}).on('end',function(){
			resultfile.end();
		});
	});
console.log('file complete');



