const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
require("cors");
const { instrument } = require("@socket.io/admin-ui");

// const server = createServer({
//   key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
//   cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
// });

const server = createServer();
const usersConnected = [];
const firstClient = {
  id: null,
  currentTime: 0,
};

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(
    `Connection from ${socket.request.socket._peername.address}:${socket.request.socket._peername.port}`
  );
  io.emit("usersConnected", { connected: usersConnected.length });
  const socketId = socket.id;

  if (usersConnected.length === 0) {
    firstClient.id = socketId;
  }

  socket.emit("welcome", {
    id: socketId,
    users: usersConnected,
    currentTime: firstClient.currentTime,
  });

  socket.on("usersData", (data) => {
    const user = {
      id: socketId,
      name: data.name,
      position: {
        x: -67,
        y: 1.5,
        z: 26,
      },
      rotation: [0, 0, 0],
      mute: data.mute,
      microphone: data.microphone,
      colour: data.userColour,
      image: data.imageUrl,
    };
    usersConnected.push(user);
    socket.broadcast.emit("newUserConnected", {
      user: user,
    });
    io.emit("usersConnected", { connected: usersConnected.length });
  });

  socket.on("userDataUpdated", (data) => {
    const user = usersConnected.find((user) => user.id === socketId);
    if (user) {
      user.mute = data.mute;
      user.microphone = data.microphone;
      socket.broadcast.emit("userPositions", usersConnected);
    }
  });

  socket.on("move", (data) => {
    const user = usersConnected.find((user) => user.id === socketId);
    if (user) {
      if (
        user.position.x !== data.position.x ||
        user.position.y !== data.position.y ||
        user.position.z !== data.position.z
      ) {
        user.position = data.position;
        socket.broadcast.emit("userPositions", usersConnected);
      }
    }

    if (
      data.position.x < -6 &&
      data.position.x > -27 &&
      data.position.z > -7 &&
      data.position.z < 1
    ) {
      socket.emit("megaphone", true);
    } else socket.emit("megaphone", false);
  });

  socket.on("songTime", (data) => {
    if (socketId === firstClient.id) {
      firstClient.currentTime = data;
    }
  });

  socket.on("voice", (userVoice) => {
    let newData = userVoice.data.split(";");
    newData[0] = "data:audio/ogg;";
    newData = newData[0] + newData[1];
    usersConnected.map((user) => {
      if (!user.mute && user.id != socketId) {
        socket.to(user.id).emit("send", {
          id: userVoice.id,
          data: newData,
          isAddressAll: userVoice.isAddressAll,
        });
      }
    });
  });

  socket.on("disconnect", () => {
    console.log(
      `${socket.request.socket._peername.address}:${socket.request.socket._peername.port} Disconnected`
    );
    if (socketId === firstClient.id) {
      const newClient = usersConnected.slice(-1);
      if (usersConnected.length > 0) firstClient.id = newClient[0].id;
    }
    if (usersConnected.length < 1) {
      firstClient.id = null;
      firstClient.currentTime = 0;
    }
    const user = usersConnected.find((user) => user.id === socketId);
    if (user) {
      socket.broadcast.emit("userDisconnected", user);
      const index = usersConnected.findIndex((user) => user.id === socketId);
      if (index !== -1) usersConnected.splice(index, 1)[0];
    }
    io.emit("usersConnected", { connected: usersConnected.length });
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
