const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

// const cors = require("cors");
// app.use(cors()); // Add cors middleware

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
    methods: ["GET", "POST"],
  },
});

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(3000, () => "Server is running on port 3000");
