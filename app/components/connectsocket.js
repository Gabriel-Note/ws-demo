import { io } from "socket.io-client";

let socket;

export function getSocket() {
  if (typeof window === "undefined") return null;

  if (!socket || socket.disconnected) {
    socket = io("http://localhost:4000", { autoConnect: false });
  }

  if (!socket.connected) socket.connect();

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}