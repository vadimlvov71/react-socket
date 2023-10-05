import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import {socket} from '../context/socket';

const LoginPage = (users) => {
  //const [text, setText] = React.useState("waiting...");
 // const [users, setUsers] = useState([]);
  let { userId } = useParams();
 
  /*useEffect(() => {
    socket.on('userList', (data) => {
      console.log('data')
      console.log(data)
      setUsers([...users, data])
    });
    console.log("users1111: ");
    console.log(users.users[0]);
  }, []);*/
  /*useEffect(() => {
    fetch('http://localhost:7000/test')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setUsers([...users, data])
    })
    .catch(error => {
      // Handle the error
    });

}, []);*/
  /*return () => {
    socket.off('serList');
  };*/
  function renderObject(){
    return  (
    Object.entries(users.users).map(([key, user], index) => {
      return Object.entries(user).map(([key1, value], i) => {

        return (
            <div key={key1}>
              <li>
                <Link to={"/chat/" + value.user_id}>
                  <div>{value.firstName} {value.lastName}</div>
                  <div><img className="avatar" src={"/images/" + value.image}/></div>
                  
                </Link>
              </li>
            </div>
        )
      })
    }) 
    )
  }

  return (
    <div className="chat__sidebar">
      <h2>Test Chat from Vadim</h2>
      <div>
        <h4 className="chat__header">SELECT A USER to log in:</h4>
        <div className="chat__users">
          <ul>{renderObject()}</ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
