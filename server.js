import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { log } from "node:console";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 4000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  let waitingPlayer = null; // holds the first player until someone joins
  io.on("connection", (socket) => {
    // console.log("connected:", socket.id); // ← should only fire ONCE per tab
    // console.log("total:", io.engine.clientsCount); // ← should be 1 with one tab open
    console.log("someone connected");

    socket.on("joinGame", () => {
      if (!waitingPlayer) {
        waitingPlayer = socket;
        console.log("1 player is now waiting to join a room");
      } else if (waitingPlayer.id !== socket.id) {
        const roomId = `hardcoded-room-id`; // in production, generate a unique ID
        waitingPlayer.join(roomId);
        socket.join(roomId); // <-- second player joins the same room
        waitingPlayer.emit("gameStart", { role: "player1", roomId });
        socket.emit("gameStart", { role: "player2", roomId });
        waitingPlayer = null; // reset for the next pair of players
      } else {
        console.log("same Id i suppose");
      }
    });

    // Testing events =====================================================
    socket.emit("message", "Hello from the server!");
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

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
