var crypto=require('crypto'),
    os=require('os');

exports.cleanString=function(str){
	var cleanstring="";
	for(var i=0;i<str.length;i++){
    	if (!str.charAt(i).match(/\s+/gi) && str.charCodeAt(i)!=127){
    		cleanstring=cleanstring+str.charAt(i);
    	}
    }
    return cleanstring;
}

exports.getUniqueId=function(){
	return crypto.createHash('md5').update(os.hostname()).digest('binary');
}