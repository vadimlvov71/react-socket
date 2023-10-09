import React, { useState, useEffect, useContext, useRef } from 'react';
import ChatSocket from '../components/ChatSocket';
import ChatBar from '../components/ChatBar';
import ChatHeader from '../components/ChatHeader';
import io from 'socket.io-client';
import {useNavigate, useSearchParams, useParams} from 'react-router-dom';
import {socket} from '../context/socket';



const ChatPage = () => {
    const [chatUsers, setChatUsers] = useState([]);
    const [addressee, setAddressee] = useState([]);
    const [messages, setMessages] = useState([]);
    const [receiverSelected, setReceiverSelected] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const { user_id } = useParams();
    const [load, setLoad] = useState(false);
    const [user, setUser] = useState({});
    const [txt, setTxt] = useState("");
    const navigate = useNavigate();
    const userObj = {};
    const usersObject = {}
    const [users, setUsers] = useState([]);
    const socketState = useRef()
    
    console.log("chatPage" + user_id)

  useEffect(() => {
      fetch('http://localhost:7000/get_users')
      .then(response => response.json())
      .then(data => {
          //console.log('data');
          //console.log(data);
          setUsers([...users, data]);
          setLoad(true);
      })
      .catch(error => {
        // Handle the error
      });
  
  }, []);

    //socket.connect();

    if(load){
        Object.entries(users).map(([key, user], index) => {
            Object.entries(user).map(([key1, value], i) => {
                //console.log('value');
                //console.log(value);
                if(value.user_id != user_id){
                  usersObject[value.user_id] = value;
                }
                
            })
          }) 
        
        userObj.name = users[0][user_id].firstName + " " + users[0][user_id].lastName;
        userObj.image = users[0][user_id].image;
        userObj.user_id = users[0][user_id].user_id;
    }else{
       console.log("loading");
    }
        

    //socket.disconnect();
    const  leaveChat = (user_id) => {
      console.log("leaveChat: " + user_id);
      navigate('/', { replace: true });
      socketState.current()
    };
   
    const handleGetAddressee = (addressee_id) => {
        setAddressee("Your Addressee: " + users[0][addressee_id].firstName + " " + users[0][addressee_id].lastName)
        console.log("addressee: " + addressee_id);
        setReceiverSelected(true);
    };
 

    return (
      <>
      <div className="chat App-window">
      <ChatBar users={usersObject} getAddressee={handleGetAddressee}/>
        <div className="chat__main">
          
            <ChatHeader user={userObj} leaveChat={leaveChat}/>
          
        <div>{addressee}</div>
        {receiverSelected ? (
          load ? <ChatSocket socketState={socketState} user={userObj}/> : ""
            ) : (
              " select a man to chat with"
            )
        }
          </div>
        </div>
      </>
    );
  };
  
  export default ChatPage;
  