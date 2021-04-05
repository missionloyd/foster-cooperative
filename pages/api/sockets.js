import { Server } from 'socket.io'
import moment from 'moment';

let users = [];

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('Initializing socket.io')

    const io = new Server(res.socket.server)

    io.on('connection', socket => {
        socket.on("login", (userName) => {
            users.push({ id: socket.id, userName: userName, connectionTime: new moment().format("YYYY-MM-DD HH:mm:ss") });
            socket.emit("connecteduser", JSON.stringify(users[users.length - 1]));
            io.emit("users", JSON.stringify(users));
            //console.log('A User logged in')
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
            //console.log('A User Sent a message')
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
    })

    res.socket.server.io = io
  } else {
    console.log('Socket.io already running')
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler