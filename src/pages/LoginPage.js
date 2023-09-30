import React from 'react';
import { Link, useParams } from 'react-router-dom';

const LoginPage = () => {
  let { userId } = useParams();
  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

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
