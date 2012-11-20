exports.cleanString=function(str){
	var cleanstring="";
	for(var i=0;i<str.length;i++){
    	if (!str.charAt(i).match(/\s+/gi) && str.charCodeAt(i)!=127){
    		cleanstring=cleanstring+str.charAt(i);
    	}
    }
    return cleanstring;
}