$("input[type='submit']").click(function() { return false; });

$("form").submit(function() { return false; });

var socket = io.connect('http://192.168.10.47:6677', {'forceNew':true});

socket.on('messages', function(data) {
	renderChat(data);
});

var renderChat = function (data) {
	var html = data.map(function(message, index) {
		var message '<div class="message">' + '<strong>' + message.nickname + '</strong> say:'+ '<p>' + message.text + '</p>' + '</div>';
		return message;
	});

	document.getElementById("messages").innerHTML = html;
}

var addMessage = function (e) {
	console.log('Hi!');
	var message = {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value
	};

	document.getElementById('nickname').style.display = 'none';
	socket.emit('add-message', message);

	return false;
}