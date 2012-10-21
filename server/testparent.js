var child = require('child_process').fork('testchild.js');

// Open up the server object and send the handle.

//var server = require('net').createServer();
var server=require('net').createServer();

server.on('connection', function (socket) {
  socket.end('handled by parent\n');
});
server.listen(2012, function(server) {
  child.send('server',server);
});