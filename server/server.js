const PORT = 8888;
const http = require("http");
const server = http.createServer();
const { Server } = require("socket.io");

const io = new Server(server, {
  maxHttpBufferSize: 1e9,
  httpCompression: true,
  cors: {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
    methods: ["GET", "POST"],
  },
});

let users = [];
let messages = [];

io.on("connection", (socket) => {
  socket.on("JOIN_CHAT", (user) => {
    users.push({
      name: user.name,
      id: socket.id,
    });
    const userNames = users.map((user) => user.name);
    io.emit("GET_USERS", userNames);
  });

  socket.on("SEND_MESSAGE", (data) => {
    const message = {
      user: data.user,
      message: data.message,
      file: data.file,
      reply: data.reply,
      id: data.id,
    };
    messages.push(message);
    socket.broadcast.emit("GET_MESSAGE", message);
  });

  socket.on("disconnect", () => {
    users = [...users.filter((user) => user.id !== socket.id)];
    io.emit(
      "GET_USERS",
      users.map((item) => item.name)
    );
  });
});

server.listen(PORT, () => {
  console.log(`Start server on port ${PORT}`);
});
