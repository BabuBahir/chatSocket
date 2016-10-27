var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname +'/test.html');
});

var clients = 0;

io.on('connection', function(socket){
	 clients++;
socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
 socket.on('disconnect', function () {
	       clients--;
		socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
             });
});

http.listen(8000, function(){
  console.log('listening on localhost:8000');
});