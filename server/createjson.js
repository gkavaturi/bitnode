var fs=require('fs');
var net=require('net');
var DIR='chunks';
var filename='generatedinfo.json';
var jsonfile=fs.createWriteStream(filename);

fs.readdir(DIR+'/',function(err,files){
		var count=0,
			peices=[];
		
		if (err){
			console.log(err);
		}
		files.forEach(function(file){
			//console.log(file);
			count++;
			peices.push(file);
			});
		//console.log(count);	
		//console.log(peices);
		var result={filename:"test.mp3",filesize:"4096",no_of_bits:"12",peices:peices};
		jsonfile.write(JSON.stringify(result),function(err){
			if (err) console.log(err);
		});	
		/*fs.writeFile(filename,result,function(err){
			if (err) throw err;
			console.log('file saved');
		});
		*/
		//console.log(result);
});
