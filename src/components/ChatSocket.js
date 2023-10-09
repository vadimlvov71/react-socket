import React, { useState, useEffect, forwardRef} from 'react';
import io from 'socket.io-client';
import {socket} from '../context/socket';

const ChatSocket = ({socketState, user}) => {

  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [typingStatus, setTypingStatus] = useState('');
  const [messages, setMessages] = useState([]);
  const [socketId, setSocketId] = useState("");
  
 
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


function socketDisconnect(){
  console.log("socket is disconnecting:" + socket.id)
  socket.disconnect();
  console.log("socketDisconnect:" + socket.id)
}

useEffect(() => {
 
    socketState.current = socketDisconnect

    socket.on('messageResponse', (data) => setMessages([...messages, data]));
    console.log("messageResponse: ")
    console.log(messages)
    
    // clean up on unmount
return () => {
  // при размонтировании компонента выполняем отключение сокета
  socket.disconnect()
}
}, [messages]);

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

export default ChatSocket;
