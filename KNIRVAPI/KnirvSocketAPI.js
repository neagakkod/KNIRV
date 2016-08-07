/*
*the socket API will be used mostly to send real time events to users
*/

var socket = require('socket.io-client')('http://localhost:3000');
var io = require('socket.io').listen(server);

socket.on('connect', function(){});

socket.on('event', function(data){console.log("received from client");});
socket.on('disconnect', function(){});