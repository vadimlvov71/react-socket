import React, { useState, useEffect } from 'react';
//import {socket} from '../context/socket';

const ChatHeader = ({ user, leaveChat }) => {
   
   

    //useEffect(() => {
        //socket.on('messageResponse', (data) => setMessages([...messages, data]));
       // console.log("messageResponse: ")
        //console.log(messages)

    //}, []);

    return (
      <>
      <header className="chat__mainHeader">
        <p>account of: {user.name}</p>
        <div><img className="avatar" src={"/images/" + user.image}/></div>
        <button onClick={() => leaveChat(user.user_id)} className="leaveChat__btn" >
          LEAVE CHAT
        </button>
      </header>
      </>
    );
  };
  
  export default ChatHeader;