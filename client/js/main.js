var socket = io.connect('http://192.168.10.47:6677', {'forceNew':true});

socket.on('messages', function(data) {
	renderChat(data);
});

function renderChat(data) {
	var html = data.map(function(message, index) {
		return '<div class="message">' + '<strong>' + message.nickname + '</strong> say:'+ '<p>' + message.text + '</p>' + '</div>';
	});

	document.getElementById("messages").innerHTML = html;
}