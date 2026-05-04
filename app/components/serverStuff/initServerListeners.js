import { getIO } from "./ioServer.js";
import matchMaking from "./matchMaking.js";

export function serverTest() {
  const io = getIO();
  let waitingPlayer = null; 

  io.on("connection", (socket) => {
    // console.log("connected:", socket.id); // ← should only fire ONCE per tab
    // console.log("total:", io.engine.clientsCount); // ← should be 1 with one tab open
    console.log("someone connected");

    matchMaking(socket); 

    // socket.on("joinGame", () => {
    //   if (!waitingPlayer) {
    //     waitingPlayer = socket;
    //     console.log("1 player is now waiting to join a room");
    //   } else if (waitingPlayer.id !== socket.id) {
    //     const roomId = `room-with-${waitingPlayer.id}-and-${socket.id}`; // create a unique room ID based on both players' socket IDs

    //     waitingPlayer.join(roomId);
    //     socket.join(roomId); // <-- second player joins the same room

    //     waitingPlayer.emit("gameStart", { role: "player1", roomId });
    //     socket.emit("gameStart", { role: "player2", roomId });

    //     waitingPlayer = null; // reset for the next pair of players
    //   } else {
    //     console.log("same Id i suppose");
    //   }
    // });

    // Testing events =====================================================
    socket.on("thankYou", (data) => {
      console.log("Received message from client:", data);
    });

    socket.onAny((event, ...args) => {
      console.log("onAny");
      console.log(`server recieved event: "${event}"`, args);

      console.log(socket.id);
    });
    socket.on("message", (data) => {
      console.log("Received your fucking message this time:", data);
      // socket.emit("message", "Hello we recieved your message yet again!");
    });
    // =====================================================================
  });
}
