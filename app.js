const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ErrorHandler = require("./middleware/error");
const user = require("./routes/user");

// Socket.io setup
const socketSetup = require("./socket");

const app = express();

// Enable CORS for REST API
app.use(
  cors({
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Load env variables
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: ".env" });
}

// Routes
app.use("/api/v1", user);

// Error handling middleware
app.use(ErrorHandler);

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO server
socketSetup(server);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
