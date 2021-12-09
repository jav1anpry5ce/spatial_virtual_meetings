const { createServer } = require("https");
const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
require("cors");
const { instrument } = require("@socket.io/admin-ui");

const server = createServer({
  key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
});

// const server = createServer();
const socketsStatus = [];

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const socketId = socket.id;
  const user = {
    id: socketId,
    name: null,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    mute: false,
    colour: "#fff",
  };
  socketsStatus.push(user);

  socket.emit("welcome", { id: socketId, users: socketsStatus });

  socket.broadcast.emit("newUserConnected", {
    new_user_id: socketId,
    user: socketsStatus.find((user) => user.id === socketId),
  });

  socket.on("usersData", (data) => {
    const user = socketsStatus.find((user) => user.id === socketId);
    user.mute = data.mute;
    user.name = data.name;
    user.colour = data.userColour;
  });

  socket.on("move", (pos) => {
    const user = socketsStatus.find((user) => user.id === socketId);
    if (
      user.position.x !== pos.x ||
      user.position.y !== pos.y ||
      user.position.z !== pos.z
    ) {
      user.position = pos;
      socket.broadcast.emit("userPositions", socketsStatus);
    }
  });

  socket.on("voice", (data) => {
    let newData = data.data.split(";");
    newData[0] = "data:audio/ogg;";
    newData = newData[0] + newData[1];
    socketsStatus.map((user) => {
      if (!user.mute && user.id != socketId) {
        socket.broadcast
          .to(user.id)
          .emit("send", { id: data.id, data: newData });
      }
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("userDisconnected", socketId);
    const index = socketsStatus.findIndex((user) => user.id === socketId);
    if (index !== -1) socketsStatus.splice(index, 1)[0];
  });
});

instrument(io, {
  auth: {
    type: "basic",
    username: "admin",
    password: "$2a$12$JTt3LfCNhfkXe4yoRrY/5eE33fqDfpRDHNjYPtK5ClY9/HaU7bU3y",
  },
});

server.listen(process.env.PORT || 5000, process.env.IP, () =>
  console.log(
    `Server has started on ${process.env.IP} using port ${process.env.PORT}`
  )
);
