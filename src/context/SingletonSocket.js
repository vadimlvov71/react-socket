// Singleton
import { io } from 'socket.io-client';

class SingletonSocket {
    public socket:Socket;
    public static instance: MySocket = new MySocket();
 
    private constructor() {
       socket = io("http://localhost:8081");
    }
 
    public doSomething(){
       //...
    }
 
    public doOtherThings(){
       //...
    }
 }
 