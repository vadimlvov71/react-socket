import React, { useState, useEffect, useContext, useRef } from 'react';
import ChatFooter from '../components/ChatFooter';
import ChatBar from '../components/ChatBar';
import ChatHeader from '../components/ChatHeader';
import io from 'socket.io-client';
import {useSearchParams, useParams} from 'react-router-dom';
import {socket} from '../context/socket';



const ChatPage = () => {
    const [users, setUsers] = useState([]);
    const [addressee, setAddressee] = useState([]);
    const [messages, setMessages] = useState([]);
    const [userCurrent, setUserCurrent] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { user_id } = useParams();
    const [load, setLoad] = useState(false);
    const [user, setUser] = useState({});
    const [txt, setTxt] = useState("");
   // const [usersObject, setUsersObject] = useState({});
    const userObj = {};
    const usersObject = {}
    //const lastMessageRef = useRef(null);
   
/*
    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
        console.log("messageResponse: ")
        console.log(messages)

    }, []);

    */
   
    /*console.log('check 1', socket.connected);
    socket.on('connect', function() {
      console.log('check 2', socket.connected);
    });*/
   // let { userId } = useParams();
    //socket.connect(); 
    //socket.connect();
    useEffect(() => {
       // const socket = io.connect('http://localhost:7000'); 
        
        socket.on('userList', (data) => {
            console.log('data!!!!')
            console.log(data)
            setUsers([...users, data])
            setLoad(true);
            socket.disconnect(); 
        });
      //return () => socket.disconnect();
    }, [users]);
    //useEffect(() => {
        if(load){
    
            //setUsersObject([usersObject, users[0]]);
            Object.entries(users).map(([key, user], index) => {
                Object.entries(user).map(([key1, value], i) => {
                    console.log('value');
                    console.log(value);
                    usersObject[value.user_id] = value;
                })
              }) 
            /*Object.entries(users).map(([key, user], index) => {
                userObj.name = user[user_id].firstName + " " + user[user_id].lastName;
                userObj.image = user[user_id].image;
                    //
                    console.log('user_id', user[1].firstName);
                
            })*/
            userObj.name = users[0][user_id].firstName + " " + users[0][user_id].lastName;
            userObj.image = users[0][user_id].image;
            console.log('aaaaaa');
            console.log(users[0][3]);
            console.log('usersObject');
            //console.log(usersObject);
            //setUser(obj) 
        }
        
   // }, []);
    //socket.disconnect();
    console.log("chatPage" + user_id)
    //socket.connect();
    //console.log("client socket_id" + socket.id)
    /*useEffect(() => {
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
    }, []);*/
    const handleGetAddressee = (addressee_id) => {
        setTxt(<p> 'Lorem ipsum dummy text blabla.' </p>);
       // e.preventDefault();
        console.log("addressee: " + addressee_id)
        /*if (message.trim() !== "") {
          
          // send message to WebSocket server
         
         
          setMessage("");
        }*/
      };
    const getUser = () => {
        console.log('user_id' + user_id);
          // send user_id to WebSocket server
          console.log("sending user: ")
          /*socket.emit("getUserById", {
            user_id: user_id
          });*/
    };
   // getUser(); 


    return (
      <>
      <div className="chat App-window">
      <ChatBar users={usersObject} getAddressee={handleGetAddressee}/>
        <div className="chat__main">
        <ChatHeader user={userObj} />
        <div>{txt}</div>
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
  