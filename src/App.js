import React, { useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import LoginPage  from './pages/LoginPage';
import ChatPage  from './pages/ChatPage';
import {socket} from './context/socket';
import './App.css';
import './chat.css';


function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [users, setUsers] = useState([]);
    let { userId } = useParams();
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    if(isConnected){
      console.log("client socket_id" + socket.id)
      /*socket.on('userList', (data) => setUsers([...users, data]));
      console.log("userList: ")
      console.log(users)*/
      console.log("socket_id: " + socket.id)
    }else{
      console.log("is not connected")
    }
    
    
    
    socket.on('disconnect', onDisconnect);
    useEffect(() => {
      
    }, []);
    /*return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };*/
    return (
      
      <BrowserRouter forceRefresh={true}>
      <Routes>
          <Route path="/" element={<LoginPage usersList={users}/> } />
          <Route exact path="/chat/:user_id"  element={<ChatPage /> } />
      </Routes>
    </BrowserRouter>
    );
}

export default App;
