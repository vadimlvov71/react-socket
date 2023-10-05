import React, { useState, useEffect, useContext, useRef } from 'react';
import ChatFooter from '../components/ChatFooter';
import ChatBar from '../components/ChatBar';
import ChatHeader from '../components/ChatHeader';
import io from 'socket.io-client';
import {useSearchParams, useParams} from 'react-router-dom';
import {socket} from '../context/socket';



const ChatPage = () => {
    const [chatUsers, setChatUsers] = useState([]);
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
    const [users, setUsers] = useState([]);
    

    /*useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
        console.log("messageResponse: ")
        console.log(messages)

    //}, []);
*/
//const [users, setUsers] = useState([]);
    //const [load, setLoad] = useState(false);

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
                usersObject[value.user_id] = value;
            })
          }) 
        
        userObj.name = users[0][user_id].firstName + " " + users[0][user_id].lastName;
        userObj.image = users[0][user_id].image;
        userObj.user_id = users[0][user_id].user_id;
    }else{
       console.log("loading");
    }
        

    //socket.disconnect();
    console.log("chatPage" + user_id)
    const handleGetAddressee = (addressee_id) => {
        setAddressee("Your Addressee: " + users[0][addressee_id].firstName + " " + users[0][addressee_id].lastName)
       // e.preventDefault();
        console.log("addressee: " + addressee_id)
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
        <div>{addressee}</div>
        {load ? <ChatFooter user={userObj}/> : ""}
            </div>
        </div>
      </>
    );
  };
  
  export default ChatPage;
  