let ws = require('ws'); //import websocket

let wss /* web socket server */ = new ws.Server({ //initializing server at port 5000
    port: 5000
}, () => console.log('server started'));

wss.on('connection', (ws) =>  { //this function works when a new client connects to a server
    ws.on('message', (message) => { //and this when client sends message
        message = JSON.parse(message); //from client, we send messages in a json format, so we need to parse it to make it a common JS object
        switch(message.event) { //this tells server what to do, when an existing user sends a message, or when a new user connects to a server. They still do the same, it will change soon 
            case 'message':
                broudCastMessage(message);
                break;
            case 'connection':
                broudCastMessage(message);
                break;
        }
    });
});

let broudCastMessage = (message) => { //broudcast the message to ALL clients connected to the server
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    });
};