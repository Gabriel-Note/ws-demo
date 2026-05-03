"use client";

import Test from "./components/test";
import { getSocket } from "./components/connectsocket"; // ← same shared socket
import { useState } from "react";
console.log("yesyesyes");

export default function Home() {
  const [message, setMessage] = useState("");

  const handleMessageButton = (e) => {
    e.preventDefault();
    const socket = getSocket(); // ← reuses existing connection, no new one
    socket.emit("message", message);
    console.log("sent:", message);
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
