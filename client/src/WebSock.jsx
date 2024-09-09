import React, { useRef, useState } from 'react';
import LoginForm from './components/LoginForm';
import Chat from './components/Chat';
import { v4 as uuidv4 } from 'uuid';

let id = uuidv4();

function WebSock() {

    let [messages, setMessages] = useState([]); //list of messages
    let [value, setValue] = useState(''); //value of message input
    let socket = useRef();
    let [connected, setConnected] = useState(false); //state of connection of a client to the server
    let [username, setUsername] = useState(''); //value of username of the client

    function connect(e) { //this function is passed in the login button
        e.preventDefault(); //this is needed because after clicking the button, page reloads defaultly
        if(username != '') { //the connection will be terminated only if the nickname is not empty
            socket.current = new WebSocket('https://chat-app-server-bg3u.onrender.com/'); //connecting to our server, initialized at port 5000

            socket.current.onopen = () => { //this function is called when client connects to the server
                setConnected(true); //set connection of a client to the server as true
                let message = {
                    event: 'connection',
                    username: username,
                    id: id
                };
                socket.current.send(JSON.stringify(message));
                console.log('connection terminated');
            };

            socket.current.onmessage = (event) => { //this function is called when there is a message from the server. The argument event is an object, which contains informations about the message from the server
                let message = JSON.parse(event.data); //event.data is the neccesary part for us, because it is the message sent from the server. The rest is something like metadata
                setMessages(prev => [message, ...prev]);
            };

            socket.current.onclose = () => { //this function is called when client 'leaves' the connection with server
                console.log('connection is closed');
            };

            socket.current.onerror = () => { //this function is called when there is an error in connection (for example troubles with internet)
                console.log('there is an error in connection');
            };
        } else {
            alert('You cannot access to the chat without username...')
        }
    };

    function sendMessage() {
        if (value != ''){
            let message = {
                username: username,
                message: value,
                id: id,
                event: 'message'
            };
            socket.current.send(JSON.stringify(message));
            setValue('');
        } else {
            alert('You cannot send an empty message...')
        }
    };

    function exit() {
        setConnected(false);
        socket.current.close();
    };

    if(!connected) {
        return(
            <LoginForm 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                onClick={connect} 
            />
        );
    } else {
        return (
            <Chat 
                value={value} 
                onChange={e => setValue(e.target.value)} 
                sendMessage={sendMessage} 
                exit={exit} 
                messages={messages}
                currentUser={username}
            />
        );
    };
};

export default WebSock;
