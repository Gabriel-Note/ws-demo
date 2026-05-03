// test.js ✅
"use client";
import { useEffect } from "react";
import { getSocket, disconnectSocket } from "./connectsocket"; // ← use shared socket

export default function Test() {
  useEffect(() => {
    const socket = getSocket(); // ← no new connection, reuses existing one

    socket.on("connect", () => {
      console.log("connected:", socket.id);
    });

    socket.on("message", (data) => {
      console.log("Received:", data);
      socket.emit("thankYou", "received!");
    });

    return () => {
      socket.off("message");
      socket.off("connect");
      disconnectSocket(); // ← handles StrictMode safely
    };
  }, []);

  return (
    <div>
      <h1>test</h1>
    </div>
  );
}
