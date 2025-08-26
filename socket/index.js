const { Server } = require("socket.io");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins for testing
      methods: ["GET", "POST"],
    },
  });

  // Import event handlers
  const { handleConnection } = require("./events");
  io.on("connection", handleConnection);

  console.log("✅ Socket.IO server started");

  // Load alerts + notifications
  const alerts = JSON.parse(fs.readFileSync("alerts.json", "utf-8"));
  const notifications = JSON.parse(fs.readFileSync("notification.json", "utf-8"));

  let alertIndex = 0;
  let notificationIndex = 0;

  // Function to broadcast alerts
  function broadcastAlert(alert) {
    console.log('elert', alert);
    
    io.emit("alert", {
      ...alert,
      id: uuidv4(),
      uuid: Date.now() - 34 * 60 * 1000,
    });
  }

  // Function to broadcast notifications
  function broadcastNotification(notification) {
    io.emit("notification", {
      ...notification,
      id: uuidv4(),
      uuid: Date.now() - 34 * 60 * 1000,
    });
  }

  // Send alerts every 2 minutes
  setInterval(() => {
    if (alerts.length === 0) return;

    const alert = alerts[alertIndex];
    broadcastAlert(alert);

    console.log("📢 Sent alert:", alert.title);
    alertIndex = (alertIndex + 1) % alerts.length;
  }, 1000);

  // Send notifications every 1 minute
  setInterval(() => {
    if (notifications.length === 0) return;

    const notificationData = notifications[notificationIndex];
    if (notificationData.priority) {
      broadcastNotification(notificationData);
      console.log("📢 Sent notification:", notificationData.title);
    }

    notificationIndex = (notificationIndex + 1) % notifications.length;
  }, 1 * 60 * 1000);

  return io;
};
