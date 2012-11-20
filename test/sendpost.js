var http=require('http'),
    crypto=require('crypto'),
    os=require('os'),
    querystring=require('querystring');


var cleanString=function(str){
	var cleanstring="";
	for(var i=0;i<str.length;i++){
		if (!str.charAt(i).match(/\s+/gi) && str.charCodeAt(i)!=127){
			cleanstring=cleanstring+str.charAt(i);
		}
	}
	return cleanstring;
}

var getUniqueId=function(){
	return crypto.createHash('md5').update(os.hostname()).digest('binary');
}
var uniqueid=cleanString(getUniqueId());
var post_data = querystring.stringify({
        'uniqueid' : uniqueid
  });
  
  var options={
  	host:'localhost',
  	port:3000,
  	path:'/remember',
  	method:'POST',
  	headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': post_data.length
          }
  };
 
 
var req=http.request(options,function(res){
	console.log('Status: '+res.statusCode);
	console.log('Headers: '+JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data',function(chunk){
		console.log(chunk);
	});
});

req.on('error',function(e){
	console.log('problem with request: '+e.message);
});

/*
var data={};
data.uniqueid="ì:GQî\u000bôÔc(/:BÐn";
data.bitname="piece19.data";
data.filename="bach_arai.json";
req.write(JSON.stringify(data));
*/

console.log(post_data);
req.write(post_data);
req.end();