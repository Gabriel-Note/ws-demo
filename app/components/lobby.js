// app/page.js — lobby where players click "Join Game"
"use client";
import { useEffect, useState } from "react";
import { getSocket } from "./socketStuff/connectsocket";
import Player1View from "./playerOneView";
import Player2View from "./playerTwoView";

export default function Home() {
  const [status, setStatus] = useState("idle"); // idle | waiting | playing
  const [role, setRole] = useState(null);       // player1 | player2
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    const socket = getSocket();

    socket.on("waitingForOpponent", () => {
      setStatus("waiting");
    });

    socket.on("gameStart", ({ role, roomId }) => {
      setRole(role);
      setRoomId(roomId);
      setStatus("playing");
    });

    return () => {
      socket.off("waitingForOpponent");
      socket.off("gameStart");
    };
  }, []);

//   function joinGame() {
//     const socket = getSocket();
//     socket.emit("joinGame");
//   }

  // Show different UI based on state
  if (status === "idle") return (
    <div>
      <h1>Idle</h1>
    </div>
  );

  if (status === "waiting") return (
    <div>
      <h1>Waiting for opponent...</h1>
    </div>
  );

  if (status === "playing") {
    return role === "player1"
      ? <Player1View/>
      : <Player2View/>;
    //   ? <Player1View roomId={roomId} />
    //   : <Player2View roomId={roomId} />;
  }
}