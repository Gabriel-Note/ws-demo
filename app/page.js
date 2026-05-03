"use client";

import Test from "./components/test";
import ConnectSocket from "./components/connectsocket";
import { useState } from "react";
console.log("yesyesyes");

export default function Home() {
  const [message, setMessage] = useState("");

  const handleMessageButton = (e) => {
    e.preventDefault();
    ConnectSocket.emit("message", message);
    console.log("we pressed the button and sent a message");
  };

  return (
    <div>
      <h1>Battleship Websocket Demo</h1>
      <Test />
      <form onSubmit={handleMessageButton}>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
