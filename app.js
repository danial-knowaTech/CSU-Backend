const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ErrorHandler = require("./middleware/error");
const user = require("./routes/user");

const app = express();
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: ".env" });
}

// Routes
app.use("/api/v1", user);
app.use(ErrorHandler);

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO server
const { broadcastAlert, broadcastNotification, alerts, notifications } = require("./socket")(server);

// 🚨 API to trigger alert manually
app.get("/send-alert", (req, res) => {
  const alert = alerts[Math.floor(Math.random() * alerts.length)];
  broadcastAlert(alert);
  res.json({ success: true, message: "Alert sent manually!", alert });
});

// 🔔 API to trigger notification manually
app.get("/send-notification", (req, res) => {
  const notification = notifications[Math.floor(Math.random() * notifications.length)];
  broadcastNotification(notification);
  console.log('notification', notification);
  
  res.json({ success: true, message: "Notification sent manually!", notification });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
