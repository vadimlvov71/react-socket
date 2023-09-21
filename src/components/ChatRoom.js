import React, { useState, useEffect } from 'react';
import ChatFooter from './ChatFooter';
import io from 'socket.io-client';

const newSocket = io("http://localhost:7000");

const ChatRoom = ({ person, size }) => {
    const [newSocket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        setSocket(newSocket);
  
        newSocket.on('connect', () => {
            console.log('Connected to server', newSocket.id);
        });
        newSocket.on("notification", (notification) => {
            console.log("notification: " + notification)
            setNotifications([...notifications, notification]);
        });
        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
        // Listen for incoming notifications from the server
        
  
      // Clean up event listeners on unmount
        return () => {
            newSocket.off("notification");
        };
    }, [notifications]);

    return (
      <>
      <div class="room">
            <header className="chat__mainHeader">
            <p>Hangout with Colleagues {person.name}</p>
            
            </header>
    
            {/*This shows messages sent from you*/}
            <div className="message__container">
                <div className="message__chats">
                    <p className="sender__name">You</p>
                    <div className="message__sender">
                    <p>Hello there</p>
                    </div>
                </div>
        
                {/*This shows messages received by you*/}
                <div className="message__chats">
                    <p>Other</p>
                    <div className="message__recipient">
                    <p>Hey, I'm good, you?</p>
                    </div>
                </div>
                <ul>
                    {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                    ))}
                </ul>
                {/*This is triggered when a user is typing*/}
                <div className="message__status">
                    <p>Someone is typing...</p>
                </div>
            </div>
            <ChatFooter person={{ name: 'Lin Lanying', newSocket: newSocket }}/>
        </div>
      </>
    );
  };
  
  export default ChatRoom;
  