// import { Server } from 'socket.io'
// import moment from 'moment';
// import Cors from 'cors';
// import initMiddleware from '../../lib/init-middleware'

// // Initialize the cors middleware
// const cors = initMiddleware(
//   // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
//   Cors({
//     // Only allow requests with GET, POST and OPTIONS
//     origin: "https://foster-cooperative-git-master-missionloyd.vercel.app/chat",
//     methods: ['GET', 'POST', 'OPTIONS'],
//     allowedHeaders: ["Access-Control-Allow-Origin"],
//     credentials: true
//   })
// )

// let users = [];

// export default async function ioHandler (req, res) {
//   // Run cors
//   await cors(req, res);

//   if (!res.socket.server.io) {
//     console.log('Initializing socket.io')

//     const io = new Server(res.socket.server, {
//       cors: {
//          origin: "https://foster-cooperative-git-master-missionloyd.vercel.app/chat",
//          methods: ["GET", "POST", "OPTIONS",],
//          allowedHeaders: ["Access-Control-Allow-Origin"],
//         credentials: true
//       }
//     })

//     io.on('connection', socket => {
      
//         socket.on("login", (userName) => {
//             users.push({ id: socket.id, userName: userName, connectionTime: new moment().format("YYYY-MM-DD HH:mm:ss") });
//             socket.emit("connecteduser", JSON.stringify(users[users.length - 1]));
//             io.emit("users", JSON.stringify(users));
//             //console.log('A User logged in')
//         });
    
//         socket.on("sendMsg", msgTo => {
//             msgTo = JSON.parse(msgTo);
//             const minutes = new Date().getMinutes();
//             io.emit("getMsg",
//               JSON.stringify({
//                   id: socket.id,
//                   userName: users.find(e => e.id == msgTo.id).userName,
//                   msg: msgTo.msg,
//                   time: new Date().getHours() + ":" + (minutes < 10 ? "0" + minutes : minutes)
//               }));
//             //console.log('A User Sent a message')
//         });
    
//         socket.once("disconnect", () => {
//             let index = -1;
//             if (users.length >= 0) {
//                 index = users.findIndex(e => e.id == socket.id);
//             }
//             if (index >= 0)
//                 users.splice(index, 1);
//             io.emit("users", JSON.stringify(users));
//         });
//     })

//     res.socket.server.io = io
//   } else {
//     console.log('Socket.io already running')
//   }
//   res.end()
// }

// // export const config = {
// //   api: {
// //     bodyParser: false
// //   }
// // }

// // export default ioHandler