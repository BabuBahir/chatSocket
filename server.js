var express = require("express");
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//serve static files 
app.use(express.static(__dirname + '/public'));

users = [];
io.on('connection', function(socket){  
  socket.on('setUsername', function(data){
      console.log(data);     
      users.push(data);
      socket.emit('userSet', {username: data});   	 
  });
  socket.on('msg', function(data){
      //Send message to everyone
      io.sockets.emit('newmsg', data);
  })   
});
http.listen(process.env.PORT || 3000, function(){
  console.log('listening on localhost:3000');
});