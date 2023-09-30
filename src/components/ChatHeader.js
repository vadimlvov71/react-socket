import React, { useState, useEffect } from 'react';
//import {socket} from '../context/socket';

const ChatHeader = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState('');
   

    useEffect(() => {
        //socket.on('messageResponse', (data) => setMessages([...messages, data]));
        console.log("messageResponse: ")
        console.log(messages)

    }, []);

   


    return (
      <>
      <header className="chat__mainHeader">
        <p>account of: {user.name}</p>
        <button className="leaveChat__btn" >
          LEAVE CHAT
        </button>
      </header>
      </>
    );
  };
  
  export default ChatHeader;