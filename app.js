var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var users = [];

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.render('index');
});

server.listen(process.env.PORT || 3000, function(){
  console.log('listening on localhost:3000');
});

io.on('connection', function(socket){

  socket.on("new user", function(username){
    users.push(username);
    socket.username = username;
    io.emit("entered", {username:username, current:users});
  });

  socket.on("chat message", function(messages){
    io.emit("received chat message", socket.username + ': ' + messages);
  });

   socket.on("typing", function(messages){
    io.emit("received typing", socket.username);
  });

  socket.on('disconnect', function(username){
    var index = users.indexOf(username);
    users.splice(index, 1);
    io.emit('user left', {username:socket.username, current:users});
  });
});


