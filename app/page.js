"use client";

import Test from "./components/test";
import { io } from "socket.io-client";
console.log(io);
console.log("yesyesyes");



export default function Home() {
  return (
    <div>
      <h1>Battleship Websocket Demo</h1>
      <Test />
    </div>
    
  );
}