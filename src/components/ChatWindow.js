import React, { useState, useEffect, useContext, useRef } from 'react';
import ChatFooter from './ChatFooter';
import ChatBar from './ChatBar';
import ChatHeader from './ChatHeader';
import io from 'socket.io-client';
//import {socket} from '../context/socket';

const socket = io("http://localhost:7000");

const ChatWindow = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [userCurrent, setUserCurrent] = useState('');
    //const lastMessageRef = useRef(null);
/*
    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
        console.log("messageResponse: ")
        console.log(messages)

    }, []);

    */
    socket.connect();
    console.log("client socket_id" + socket.id)
    useEffect(() => {
        //socket.connect();
        //getUser(); 
        //socket.on('userResponse', (data) => setUserCurrent([userCurrent, data]));
        //console.log("userResponse: ")
        //console.log(userCurrent);

    }, []);
    
    const getUser = () => {
        console.log('user' + user.user_id);
          // send user_id to WebSocket server
          console.log("sending user: ")
          socket.emit("getUserById", {
            user_id: user.user_id
          });
    };
   // getUser(); 


    return (
      <>
      <div className="chat App-window">
        <ChatBar />
        <div className="chat__main">
            <ChatHeader user={{ ...user }}/>
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
                <ChatFooter user={{ ...user }}/>
            </div>
        </div>
      </>
    );
  };
  
  export default ChatWindow;
  