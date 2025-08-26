const { dashboardRecords } = require("../constant/DummyData");

module.exports = {
  handleConnection: (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("send_message", (routName) => {
      socket.broadcast.emit("receive_route", routName);
    });

    socket.on("route-selected", (routName) => {
      console.log("route", routName);
      socket.broadcast.emit("receive_route", routName);
    });

    socket.on("map_view_changed", (data) => {
      socket.broadcast.emit("map_view_changed", data);
    });

    socket.on("station_selected", (stationData) => {
      socket.broadcast.emit("station_update", stationData);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  },
};
