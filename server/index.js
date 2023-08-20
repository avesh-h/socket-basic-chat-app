const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { Server } = require("socket.io");

// connect our backend with server
const http = require("http");
const server = http.createServer(app);

dotenv.config();
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "hello world" });
});

server.listen(process.env.PORT, () => {
  console.log(`Server start on ${process.env.PORT}`);
});

//Make connection with front end
const io = new Server(server, {
  cors: {
    origin: process.env.CORS,
  },
});

// how many users are will be in this arra
let users = [];

io.on("connection", (socket) => {
  console.log("User connected!");

  socket.on("sendMessage", (msg) => {
    // console.log("getMessage", msg);
    // socket.emit("messageResponse", msg);
    io.emit("messageResponse", msg);
  });

  //whenever new user will be add
  socket.on("newUser", (user) => {
    users.push(user);

    //send lists of all user to the front end
    io.emit("newUserResponse", users);
  });

  //whenever any user typing
  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  //whenever user disconnect
  socket.on("disconnect", () => {
    console.log("user disconnect!");

    users = users.filter((u) => u.socketID !== socket.id);

    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});
