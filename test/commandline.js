process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data',function(chunk){
	chunk=chunk.toString().trim();
	var chunks=chunk.split(" ");
	if (chunks[0]=="start"){
		process.stdout.write('you wrote start\n');
	}
	if (chunks[1]) {
		process.stdout.write("You want to download "+chunks[1]+"\n");
	}
});

process.stdin.on('end',function(){
	process.stdout.write('end');
});