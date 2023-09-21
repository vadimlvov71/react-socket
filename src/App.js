import React, { useState, useEffect} from 'react';
import ChatRoom from './components/ChatRoom.js'
import io from 'socket.io-client';
//import { socket } from './socket';
import './App.css';
import './chat.css';


//const socket = socketIO.connect('http:://localhost:7000');
//console.log(socket);
const newSocket = io("http://localhost:7000");
function App() {
  
   // const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
      // connect to WebSocket server
      
     /* setSocket(newSocket);
  
      newSocket.on('connect', () => {
        console.log('Connected to server', newSocket.id);
      });
      newSocket.on("notification", (notification) => {
        console.log("notification: " + notification)
        //setNotifications([...notifications, notification]);
      });
      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
      });*/
    }, []);
    
    return (
      <div className="chat">
        <div className="container">
          <div><ChatRoom person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }} /></div>
          <div><ChatRoom person={{ name: 'John Smith', imageId: '1bX5QH6' }} /></div>
        </div>
        </div>
    );
}

export default App;
