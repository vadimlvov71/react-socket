import React, { useState, useEffect, useContext, useRef } from 'react';
import ChatFooter from '../components/ChatFooter';
import ChatBar from '../components/ChatBar';
import ChatHeader from '../components/ChatHeader';
import io from 'socket.io-client';
import {useSearchParams, useParams} from 'react-router-dom';
//import {socket, } from '../context/socket';

const socket = io("http://localhost:7000");

const ChatPage = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [userCurrent, setUserCurrent] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { user_id } = useParams();
    //const lastMessageRef = useRef(null);
/*
    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
        console.log("messageResponse: ")
        console.log(messages)

    }, []);

    */
    //socket.disconnect();
    console.log("chatPage" + user_id)
    socket.connect();
    console.log("client socket_id" + socket.id)
    useEffect(() => {
        //socket.connect();
        getUser(); 
        //socket.on('userResponse', (data) => setUserCurrent([userCurrent, data]));
        //console.log("userResponse: ")
        //console.log(userCurrent);
        return () => {
            //socket.off('connect', onConnect);
            //socket.off('disconnect', onDisconnect);
            //socket.off('foo', onFooEvent);
          };
    }, []);
    
    const getUser = () => {
        console.log('user_id' + user_id);
          // send user_id to WebSocket server
          console.log("sending user: ")
          socket.emit("getUserById", {
            user_id: user_id
          });
    };
   // getUser(); 


    return (
      <>
      <div className="chat App-window">
        <ChatBar />
        <div className="chat__main">
            
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
  
  export default ChatPage;
  