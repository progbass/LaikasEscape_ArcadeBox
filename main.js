var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var five = require("johnny-five");



///////////////////////////////////////////////////////
// SERVER / SOCKET Congif
///////////////////////////////////////////////////////
// Serve static Files
app.use(express.static(__dirname + '/app'));


// Routes Handler
app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});


// Sockets Configuration
io.on('connection', function(socket){

  //socket.broadcast.emit('hi');
  //console.log('a user connected');

  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  // });

});


// Init Server
http.listen(3000, function(){
  console.log('listening on *:3000');
});








///////////////////////////////////////////////////////
// JOHNNY FIVE SETUP
///////////////////////////////////////////////////////

var board, buttons, led;

board = new five.Board();

board.on("ready", function() {
  // Led reference
  led = new five.Led(13);

  // Create a new `button` hardware instance
  buttons = new five.Buttons([
  	{ pin: 11 },
  	{ pin: 10 },
  	{ pin: 9 },
  	{ pin: 8 },
  	{ pin: 7 },
  	{ pin: 6 }
  ]);

  // "down" the button is pressed
  buttons.on("down", function( _target ) {
    //console.log("Pressed: ", _target.pin);

    // Blink every half second
    led.on();
    io.emit('btnPress', {button: _target.pin});
  });

  // "up" the button is released
  buttons.on( "up", function( _target ){
    led.off();
  } );
});





