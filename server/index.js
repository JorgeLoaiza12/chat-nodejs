// Basic Configuration
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ports = 6677;

// Routes 
app.get('/test-api', function (req, res) {
	res.status(200).send('Hello world!');
});

// Setup my bot with my first message
var messages = [{
	id: 1,
	text: 'Welcome to my chat in NodeJS and Socket.IO by Jorge Loaiza.',
	nickname: "Bot"
}];

// Connection to socket
io.on('connection', function(socket) {
	var ipAddress = socket.handshake.address.split("ffff:")
	console.log("New User, IP Address: " + ipAddress[1]);
	socket.emit('messages', messages);

	socket.on('add-message', function(data) {
		messages.push(data);

		io.sockets.emit('messages', messages);
	});
});

// Views
app.use(express.static('client'));

// Running server
server.listen(ports, function() {
	console.log("The serve is working! http://localhost:" + ports);
});