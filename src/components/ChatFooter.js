import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {socket} from '../context/socket';

//const newSocket = io("http://localhost:7000");
const ChatFooter = ({ user}) => {

  
  const [message, setMessage] = useState("");
  const [typingStatus, setTypingStatus] = useState('');

  //const [socket, setSocket] = useState(person.newSocket);
  
 // const socket = person.newSocket;
  useEffect(() => {

    //setSocket(socket);

    // set up event listeners for incoming messages
    /*
    newSocket.on('connect', () => {
      console.log('Connected to server', newSocket.id);
  });
    newSocket.on("notification", (notification) => {
      console.log("notification: " + notification)
     // setNotifications([...notifications, notification]);
  });*/

    // clean up on unmount
    return () => {
      //newSocket.off("notification");
    };
}, []);

const handleSendMessage = (e) => {
  e.preventDefault();
  if (message.trim() !== "") {
    
    // send message to WebSocket server
    console.log("sending: ")
    socket.emit("message", {
      text: message,
      //user_id: user.user_id
    });
    setMessage("");
  }
};
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
