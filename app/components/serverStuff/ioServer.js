let io;

export function setIO(server) {
  io = server;
}

export function getIO() {
  if (!io) throw new Error("io not initialized yet!");
  return io;
}