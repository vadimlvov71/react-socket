import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {socket} from '../context/socket';

const ChatBar = ({users, getAddressee}) => {
  //const [users, setUsers] = useState([]);
  let { userId } = useParams();
  console.log('!!!!!!!!!!!!!!!!!')
    console.log(users)
  /*useEffect(() => {
    socket.on('userList', (data) => {
      console.log('data')
      console.log(data)
      setUsers([...users, data])
    });

  }, [users]);*/
  function renderObject(){
     
    return  (
    Object.entries(users).map(([key, value], index) => {
      //return Object.entries(user).map(([key1, value], i) => {

        return (
            <div key={key}>
              <li>
              <button onClick={() => getAddressee(value.user_id)}>
                  <div>{value.firstName} {value.lastName}</div>
                  <div><img className="avatar" src={"/images/" + value.image}/></div>
                  
                </button>
              </li>
            </div>
        )
     // })
    }) 
    )
  }

  return (
    <div className="chat__sidebar">
      <h2>Test Chat from Vadim</h2>
      <div>
        <h4 className="chat__header">SELECT A USER to log in:</h4>
        <div className="chat__users">
          <ul>{users ? renderObject() : "oooooo"}</ul>
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
