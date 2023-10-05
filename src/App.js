import React, { useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import LoginPage  from './pages/LoginPage';
import ChatPage  from './pages/ChatPage';
//import {socket} from './context/socket';
import './App.css';
import './chat.css';


function App() {
    const [isConnected, setIsConnected] = useState(false);
    const [users, setUsers] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
      fetch('http://localhost:7000/get_users')
       .then(response => response.json())
       .then(data => {
          //console.log('data');
          //console.log(data);
          setUsers([...users, data]);
          setLoad(true);
        })
        .catch(error => {
          console.log('error');
          console.log(error);
        });
  
  }, []);
   /*
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    if(isConnected){
      console.log("client socket_id" + socket.id)
     
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
    //if (load)

    return (
      <BrowserRouter forceRefresh={true}>
      <Routes>
          <Route path="/" element={<LoginPage users={users}/> } />
          <Route exact path="/chat/:user_id"  element={<ChatPage users={users} /> } />
      </Routes>
    </BrowserRouter>
    );
}

export default App;
