const { dashboardRecords } = require("../constant/DummyData");

module.exports = {
  handleConnection: (socket) => {
    console.log("New client connected:", socket.id);

    // Listen for "send_message" event
    socket.on("send_message", (routName) => {
      // Broadcast to all connected clients except the sender
      socket.broadcast.emit("receive_route", routName);
    });
    socket.on("route-selected", (routName) => {
      console.log("route", routName);

      // Broadcast to all connected clients except the sender
      socket.broadcast.emit("receive_route", routName);
    });
    socket.on("map_view_changed", (data) => {
      console.log('map_view_changed',data);
      
      socket.broadcast.emit("map_view_changed", data);
    });

    socket.on("station_selected", (stationData) => {
      console.log("Station selected:", stationData);

      // Broadcast the updated station data to all other connected clients
      socket.broadcast.emit("station_update", stationData);
    });
    // Disconnect handler
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  },
};
