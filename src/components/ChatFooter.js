import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {socket} from '../context/socket';

//const newSocket = io("http://localhost:7000");
const ChatFooter = ({ user}) => {

  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [typingStatus, setTypingStatus] = useState('');
  const [messages, setMessages] = useState([]);
  const [socketId, setSocketId] = useState("");
  
 

//const socket = io("http://localhost:7000");
socket.connect();
socket.on('connect', () => {
  console.log("socket.id::: " + socket.id);
  setSocketId(socket.id);
  socket.emit("init", {
    text: "init",
    user_id: user.user_id,
    socketId: socket.id
  });
});
//socket.disconnect()

useEffect(() => {
 // 
  

  //socket.on('connect', onConnect);
  /*if(isConnected){
    console.log("client socket_id: " + socket.id);
    setSocketId(socket.id);
  }else{
    console.log("is not connected")
  }*/
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
    console.log("messageResponse: ")
    console.log(messages)
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
//socket.on('disconnect', onDisconnect);
    // clean up on unmount
return () => {
  // при размонтировании компонента выполняем отключение сокета
  socket.disconnect()
}
}, [messages]);
//console.log("userFooter: ")
//console.log(user)
//socket.on('disconnect', onDisconnect);

    /*return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };*/
const handleSendMessage = (e) => {
  e.preventDefault();
  if (message.trim() !== "") {
    
    // send message to WebSocket server
    console.log("sending: " + message)
    socket.emit("message", {
      text: message,
      user_id: user.user_id,
      addressee_id:1,
      socketId: socketId
    });
    setMessage("");
    //onChange={(e) => setMessage(e.target.value)
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
       {/*This shows messages sent from you*/}
       {messages.map((message) =>
          message.user_id === user.user_id ? (
              <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                  <p>{message.text}</p>
              </div>
              </div>
          ) : (
              <div className="message__chats" key={message.id}>
              <p className="sender_name_from">{message.firstName} {message.lastName}</p>
              <div className="message__recipient">
                  <p>{message.text}</p>
              </div>
              </div>
          )
      )}            
    </div>
  );
};

export default ChatFooter;
