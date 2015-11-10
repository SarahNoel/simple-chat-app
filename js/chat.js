$(function() {
  var socket = io();
  var formInput = $('#m');
  var regInput = $('#login-name');
  var user;

  $('#reg-btn').on('click', function(event){
    event.preventDefault();
    socket.emit('new user', regInput.val().trim());
    regInput.val('');
    $('#login-page').fadeOut();
    $('#chat-room').fadeIn();
  });

  $('#chat-form').on('submit', function(event){
    event.preventDefault();
    socket.emit('chat message', formInput.val());
    formInput.val('');
  });

  // formInput.on('keydown', function(event){
  //   event.preventDefault();
  //   socket.emit('typing');
  // });

  socket.on('received chat message', function(message){
    $('#messages').append('<li>'+ message + '</li>');
  });

  socket.on('entered', function(data){
    $('#current-users').html('');
    for (var i = 0; i < data.current.length; i++) {
      $('#current-users').append('<li>' + data.current[i]+ '</li>');
    }
    $('#error').html(data.username + " has entered the room.");
    $('#error').fadeIn().delay(2000).fadeOut();
  });

  socket.on('user left', function(data){
    $('#current-users').html('');
    for (var i = 0; i < data.current.length; i++) {
      $('#current-users').append('<li>' + data.current[i]+ '</li>');
    }
    $('#left').html(data.username + " has left the room.");
    $('#left').fadeIn().delay(2000).fadeOut();
  });

  socket.on('received typing', function(user){
    $('#typers').html('<h6 class="grey">'+ user + ' is typing... </h6>');
  });


});



