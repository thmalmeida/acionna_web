/* Reference:
https://masteringjs.io/tutorials/node/websockets

https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

https://javascript.info/websocket

https://www.npmjs.com/package/ws

https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications

https://websockets.spec.whatwg.org/#ref-for-dom-websocket-readystate%E2%91%A0
*/

//import {WebSocketServer} from 'ws';

// prompt for input commands => npm install prompt-sync
const prompt = require("prompt-sync")();

// The server side!
const WebSocket = require('ws').Server;

const server = new WebSocket({
	port: 8999
	// server: httpsServer
});

//  server.port = 8999;

// functiono to prompt input cli
var read = () => prompt('$ ');

function heartbeat() {
	this.isAlive = true;
	console.log("isAlive true");
}

server.on('connection', function connection0(ws, req) {

	ws.isAlive = true;
	const client_ip = req.socket.remoteAddress;
	const client_port = req.socket.remotePort;

	console.log(`New client connected with ip: ${client_ip}`);
	console.log(`Server port ${server.options.port} <---> ${client_port} client port `);
	// console.log(`Server0 started on porte: ${server.port}`);

	// when open a connection
	ws.on('open', () => {
		console.log('Opened new connection 0 !');
	});

	// when receive a message
	ws.on('message', (msg) => {
		// server.clients.forEach(function each(client) {
		// if(client.readyState === WebSocket.OPEN) {

		// if (data.type === 'utf8') {
			try {
				// handle JSON serialization of messages 
				let a = JSON.parse(msg);
				console.log(a);
				console.log(`'Got it!!`);
			}
			// catch any errors 
			catch(e) {
				console.log("Received: ");
				msg;
				console.log(msg);
				let b = msg.toString();
				console.log(b);
				console.log("");
			}
		// console.log(`'Received from ${ip}: ${data}`);
		// ws.send(`Received: ${msg.data}`); // to send it back
	});

	ws.on('pong', () => {
		heartbeat();
		console.log(`Pong msm received from ${req.socket.client_ip}`);
		console.log(`Pong msm received from ${req.socket.remoteAddress}`);
	});

	// close connection
	// ws.on('close', function() {
	ws.on('close', () => {
		console.log(`Closed connection of ip: ${client_ip}`);
	});

	// handling client connection error
	ws.onerror = function () {
		console.log("Error");
	}
});

const interval0 = setInterval(function ping0() {
	server.clients.forEach(function each(ws) {
		if(ws.isAlive === false)
			return ws.terminate();

		ws.isAlive = false;
		ws.ping();
		// console.log(`ping sent to ${ws.socket.remoteAddress}`);
	});
}, 10000);

server.on('close', function close() {
	clearInterval(inverval0);
});

console.log(`Server started on port: ${server.options.port}`);

// let sockets = [];
// server.on('connection', function(socket) {
//   sockets.push(socket);

//   // When you receive a message, send that message to every socket.
//   socket.on('message', function(msg) {
//     sockets.forEach(s => s.send(msg));
//   });

//   // When a socket closes, or disconnects, remove it from the array.
//   socket.on('close', function() {
//     sockets = sockets.filter(s => s !== socket);
//   });
// });
