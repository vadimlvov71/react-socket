import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {socket} from '../context/socket';

const LoginPage = ({usersList}) => {
  //const [text, setText] = React.useState("waiting...");
  const [users, setUsers] = useState([]);
  let { userId } = useParams();
 // console.log('LoginPage');
 // let object = usersList[0];
  //console.log(array);
  //console.log('usersList');
  //console.log(object);

  //console.log('object1');
 // console.log(object1);
 
  useEffect(() => {
    socket.on('userList', (data) => {
      console.log('data')
      console.log(data)
      //const object = data[1];
      setUsers([...users, data])
    });
    //console.log("usersRequest: ")
   // console.log(users)

  }, [users]);
    function renderObject(){
      
     /* for (const [key, user] of users.entries()) {
          <div key={user[1].user_id}>
             
                  {user[1].firstName} {user[1].lastName}
               
          </div>
        console.log('user');
        console.log(user[1].user_id);
      }*/
     // {value.firstName} {value.lastName}
     return  (
      Object.entries(users).map(([key, user], index) => {
        return Object.entries(user).map(([key1, value], i) => {
          console.log('user');
        console.log(user);
      return (
          <div key={key1}>
           {value.firstName} {value.lastName}
             
          </div>
      )
    })
    }) 
     )
    }

       
  
  var user_id = ["user_id:1", "user_id:2"];
  const liste_album = user_id.map((alb_id, index) => {
    return (
      <div>
        <li key={alb_id}><Link to={"/chat/" + alb_id}>Album : { alb_id }</Link></li>
        {/* <Route path="/photolist" component={Photolist}/> */}
      </div> 
    )
  });
  return (
    <div className="chat__sidebar">
      <h2>Test Chat from Vadim</h2>
      <ul>{renderObject()}</ul>
      <div>
        <h4 className="chat__header">SELECT A USER:</h4>
        <div className="chat__users">
          <ul>
          <li><Link to="/chat/1">User 1</Link></li>
          <li><Link to="/chat/2">User 2</Link></li>
          <p>User 3</p>
          <p>User 4</p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
