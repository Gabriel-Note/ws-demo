import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { log } from "node:console";
import { setIO } from "./app/components/serverStuff/ioServer.js";
import { serverTest } from "./app/components/serverStuff/serverTest.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 4000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);
  setIO(io);
  serverTest();

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
