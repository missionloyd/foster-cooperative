const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const index = require("../pages/api/routes/index");
const moment = require("moment");
const app = express();
app.use(index);
app.use(cors());
const server = http.createServer(app);


// socket setup
const io = socket(server, {
    cors: {
       origin: "http://localhost:3000",
       methods: ["GET", "POST"],
       allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

//const mongo = require('mongodb').MongoClient;
// const dev = process.env.NODE_ENV != 'production';

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
});


let users = [];
io.on("connection", (socket) => {

    socket.on("login", (userName) => {
        users.push({ id: socket.id, userName: userName, connectionTime: new moment().format("YYYY-MM-DD HH:mm:ss") });
        socket.emit("connecteduser", JSON.stringify(users[users.length - 1]));
        io.emit("users", JSON.stringify(users));
    });

    socket.on("sendMsg", msgTo => {
        msgTo = JSON.parse(msgTo);
        const minutes = new Date().getMinutes();
        io.emit("getMsg",
            JSON.stringify({
                id: socket.id,
                userName: users.find(e => e.id == msgTo.id).userName,
                msg: msgTo.msg,
                time: new Date().getHours() + ":" + (minutes < 10 ? "0" + minutes : minutes)
            }));
    });

    socket.once("disconnect", () => {
        let index = -1;
        if (users.length >= 0) {
            index = users.findIndex(e => e.id == socket.id);
        }
        if (index >= 0)
            users.splice(index, 1);
        io.emit("users", JSON.stringify(users));
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));