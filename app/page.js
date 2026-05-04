"use client";

import Test from "./components/test";
import { getSocket } from "./components/connectsocket"; // ← same shared socket
import { useState } from "react";
import Lobby from "./components/lobby";
console.log("yesyesyes");

export default function Home() {
  const [message, setMessage] = useState("");

  const handleMessageButton = (e) => {
    e.preventDefault();
    const socket = getSocket(); // ← reuses existing connection, no new one
    // socket.emit("message", message);
    // console.log("sent:", message);
    socket.emit("joinGame");
  };

  return (
    <div>
      
      {/* <form onSubmit={handleMessageButton}>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form> */}
      <div>
        <h1>BATTLESHIP</h1>
        <p>Naval Combat Simulation System 2.306</p>
        <button onClick={handleMessageButton}>New Game</button>
        <div className="Label">
          Current turn:
          <span id="currentTurnLabel"></span>
        </div>
        <div className="Label" id="currentModeLabel"></div>
        <div className="board-container">
          <Lobby />
        </div>
      </div>
    </div>
  );
}
