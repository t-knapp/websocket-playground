var WebSocketServer = require('websocket').server;
var http = require('http');

const MessageDispatcher = require('./MessageDispatcher');
const ValueModel = require('./ValueModel');

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(1337, function() {
    console.log('HTTP Server running.');
});

// create the server
const wsServer = new WebSocketServer({
    httpServer: server
});

const clients = [];

const sendBroadcast = function(message) {
    // broadcast message to all connected clients
    const json = JSON.stringify(message);
    for (var i = 0; i < clients.length; i++) {
        clients[i].sendUTF(json);
    }
}

const valueModel = new ValueModel();
const messageDispatcher = new MessageDispatcher();

messageDispatcher.sendBroadcastAction(sendBroadcast.bind(this));
messageDispatcher.registerListener('ValueInc', valueModel.onIncrementMessage.bind(valueModel));
messageDispatcher.registerListener('ValueDec', valueModel.onDecrementMessage.bind(valueModel));

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    const index = clients.push(connection) - 1;

    console.log((new Date()) + ' Connection from origin '
      + request.origin + '.');

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            messageDispatcher.handleMessage(JSON.parse(message.utf8Data));
        }
    });

    connection.on('close', function(connection) {
        // close user connection
        console.log('Connection closed', connection);
        clients.splice(index, 1);
    });
});