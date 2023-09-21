import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';


const ChatFooter = ({ person}) => {

  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(person.newSocket);
  //const socket = io("http://localhost:7000");
 // const socket = person.newSocket;
  useEffect(() => {

    //setSocket(socket);

    // set up event listeners for incoming messages
    
    socket.on("notification", (data) => {
      console.log("msgs")
      console.log(data)
      setMessages((msgs) => [...msgs, data]);
    });

    // clean up on unmount
    return () => {
      socket.disconnect();
    };
}, []);

const handleSendMessage = (e) => {
  e.preventDefault();
  if (message.trim() !== "") {
    // send message to WebSocket server
    socket.emit("message", message);
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
