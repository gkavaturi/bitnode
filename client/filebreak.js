var fileGlue=require('fileGlue');
/*
fileGlue.glue(filePaths,outputFilePath,function(err){
		console.log('Some error has occured while gluing. Please see the following message '+err);
});
*/
var filePath='/Users/gokulkavaturi/masters/client/test.txt';
var options={
	tearSize:8,
	readSize:1024,
};

fileGlue.tear(filePath,options,function(err){
	console.log('Some error has occured while tearing. Please see the following message \n'+err);
});

