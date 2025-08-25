const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins for testing
      methods: ["GET", "POST"],
    },
  });

  // Import event handlers
  const { handleConnection } = require("./events");

  // Setup connection listener
  io.on("connection", handleConnection);

  return io;
};
