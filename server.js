import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 4000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);
  io.on("connection", (socket) => {
    console.log("someone connected");

    socket.emit("message", "Hello from the server!");

    socket.on("thankYou", (data) => {
      console.log("Received message from client:", data);
    });

    socket.onAny((event, ...args) => {
      console.log("onAny");
      console.log(`server recieved event: "${event}"`, args);
      
      console.log(socket.id);
      
    });
    socket.on("joinRoom", (room) => {
      socket.join(room);
    });
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
