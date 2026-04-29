"use client";

import Test from "./components/test";
import { io } from "socket.io-client";
console.log("yesyesyes");

const handleMessageButton = (e) => {
  e.preventDefault();
  console.log("we pressed the button and sent a message");
}



export default function Home() {
  return (
    <div>
      <h1>Battleship Websocket Demo</h1>
      <Test />
      <form onSubmit={handleMessageButton} >
        <input type="text" placeholder="Enter message" />
        <button type="submit">Send</button>
      </form>
    </div>
    
  );
}