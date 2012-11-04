var fs=require('fs');
var DIR='../chunks/';

	
var files=fs.readdirSync(DIR);
var filename='bach.mp3';
		
files.forEach(function(singlebit,err){
	if (err){
		console.log(err);
		console.log(singlebit);
	}
	//console.log(files);
	var bit=fs.createReadStream(DIR+singlebit);
	var resultfile=fs.createWriteStream(filename,{
		flags:'a+',
		encoding:null,
		mode:0666,
		bufferSize: 1024 * 1024
	});
	bit.on('data',function(bitdata){ 
			resultfile.write(bitdata); 
		}).on('end',function(){
			resultfile.end();
		});
	});
console.log('file complete');



