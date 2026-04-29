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
      
      socket.emit("thankYou", "Hello we recieved your message!");
    });

    socket.onAny((event, ...args) => {
      console.log(`client recieved event: "${event}"`, args);
    });

  },[])


  return (
    <div>
      <h1>test</h1>
    </div>
  );
}