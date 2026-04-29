"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
console.log("testese");
export default function Test() {

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("connected to server here");
      console.log(socket.id);
      
    });
    socket.on("message", (data) => {
      console.log("Received message from server:", data);
      
      console.log("before thank you");
      socket.emit("thankYou", "Hello we recieved your message!");
      console.log("after thank you");
    });

    socket.onAny((event, ...args) => {
      console.log(`client recieved event: "${event}"`, args);
    });

    // this is to prevent the StrictMode from connecting twice and creating multiple listeners
    return () => {
      socket.disconnect();
    };
  },[])


  return (
    <div>
      <h1>test</h1>
    </div>
  );
}