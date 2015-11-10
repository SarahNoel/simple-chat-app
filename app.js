var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.render('index');
});

server.listen(process.env.PORT || 3000, function(){
  console.log('listening on localhost:3000');
});

io.on('connection', function(socket){
  io.emit('new user', "Someone has entered the room!");

  socket.on("chat message", function(messages){
    io.emit("received chat message", messages);
  });
});
