import React, { useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, ChatPage } from './pages';
import ChatWindow from './components/ChatWindow.js'
//import {socket} from './context/socket';
import './App.css';
import './chat.css';


function App() {
    //const [isConnected, setIsConnected] = useState(socket.connected);
    const [users, setUsers] = useState([]);
/*
    useEffect(() => {
      function onConnect() {
        setIsConnected(true);
      }
  
      function onDisconnect() {
        setIsConnected(false);
      }

      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      
      socket.on('users', (data) => setUsers([...users, data]));
        console.log("users: ")
        console.log(users)
        console.log("socket_id: " + socket.id)

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      //socket.off('foo', onFooEvent);
    };
    }, []);
    */
    return (
      
      <div className="chat">
        <div className="container">
          <div><ChatWindow user={{ name: 'Lin Lanying', user_id: '1' }} /></div>
         {/* <div><ChatWindow user={{ name: 'John Smith', user_id: '2' }} /></div>*/}
        </div>
        </div>
    );
}

export default App;
