$(function() {
  var socket = io();

  var formInput = $('#m');
  $('#send-btn').on('click', function(event){
    event.preventDefault();

    socket.emit('chat message', formInput.val());
    formInput.val('');
  });

  socket.on('received chat message', function(message){
    $('#messages').append('<li>' + message + '</li>');
  });

  socket.on('new user', function(message){
    $('#error').fadeIn().delay(2000).fadeOut();
  });

});


function clearOut(locale){
  locale.html('');
  console.log('whyy');
}
