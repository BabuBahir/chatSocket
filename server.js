var express = require("express");
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
   res.sendFile(__dirname + '/index.html');   
});

//serve static files 
app.use(express.static(__dirname + '/public'));

users = [];
io.on('connection', function(socket){
        
	  socket.on('setUsername', function(data){
		  console.log(data +": connected  :"+(users.length+1));     
		  users.push(data);	  
		  socket.emit('userSet', {username: data });
		  io.sockets.emit('news', { message: users });    	  
	  });
	  socket.on('msg', function(data){
		  //Send message to everyone
		  io.sockets.emit('newmsg', data);		
	  }); 
	  
	  socket.on('disconnect', function (data) {
		 if((users.length > 0)){		 
		  users.length= users.length -1;
		 }
		 io.sockets.emit('news', { message: users });
		 console.log('disconnected :'+data);
	  });
   });
 
http.listen(process.env.PORT || 3000, function(){
  console.log('listening on localhost:3000');
});