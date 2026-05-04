import { getIO } from "./ioServer.js";
let waitingPlayer = null;

export default function matchMaking(socket) {
  socket.on("joinGame", () => {
    console.log("Imatchmaking");
    
    if (!waitingPlayer) {
      waitingPlayer = socket;
      console.log("1 player is now waiting to join a room");
    } else if (waitingPlayer.id !== socket.id) {
      const roomId = `room-with-${waitingPlayer.id}-and-${socket.id}`; // create a unique room ID based on both players' socket IDs

      waitingPlayer.join(roomId);
      socket.join(roomId); // <-- second player joins the same room

      waitingPlayer.emit("gameStart", { role: "player1", roomId });
      socket.emit("gameStart", { role: "player2", roomId });

      waitingPlayer = null; // reset for the next pair of players
    } else {
      console.log("same Id i suppose");
    }
  });
}
