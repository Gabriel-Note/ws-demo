"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
console.log(io);
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
    });

  },[])


  return (
    <div>
      <h1>test</h1>
    </div>
  );
}