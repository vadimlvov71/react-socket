//import React, { createContext } from 'react';
import { io } from 'socket.io-client';
//import { SOCKET_URL } from "./config.js";
const SOCKET_URL = "http://localhost:7000";
//const SOCKET_URL= process.env.REACT_APP_SOCKET_URL;
//SocketContext = createContext<Socket>(socket);


export const socket = io(SOCKET_URL);
//export const socket = io.connect(SOCKET_URL);
//export const SocketContext = React.createContext();
//export { SocketContext, SocketProvider };
/*
  export const socket = io("http://localhost:7000", {
    query: {
        "my-key": "my-value"
      }
  });*/
  //.listen(7000);
//export const socket = io(URL);
