const express = require(`express`);
const http = require(`http`);
const sockeIo = require(`socket.io`);
const path = require(`path`);

const app = express();
const server = http.createServer(app);
const io = sockeIo(server, {
    cors: {
        origin: "http://localhost:3000/",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

let users = {}; //{'s1':'jihoon', 's2':'younghi'}
let rooms = {}; // {'room1': '', 'room2'}

io.on('connection', (socket) => {   //한 사람이 들어오면 소켓 생성
    console.log(`user connected: 
        ${JSON.stringify(users)}, ${JSON.stringify(rooms)}`);
   
    // 1. login  sendlogin
    socket.on(`login`, (username) => {
        users[socket.id] = username;   
        socket.emit(`login:success`, {username, rooms:Object.keys(rooms)}); //들어온 한 사람에게 알려줌 
        io.emit('update:users', Object.values(users)); //새로운 사람이 들어왔음을 다른 사용자들에게 알림
    });

    // 2. create room room name, key rooms['room1'] = [], room['room2'] = []
    socket.on(`create:room`, (room) => {
        if(!rooms[room]) {
            rooms[room] = [];
            socket.join(room);  //socket을 roomd에 넣어줌
            socket.emit(`room:created`, room);
            io.emit(`update:rooms`, Object.keys(rooms)); //[room1, room2]
        }else{
            socket.emit('room:exists', room);
        }
    })
    // 3. join room
    socket.on(`join:room`, (room)=>{
        if(room[room]){
            socket.join(room);
            socket.emit('room:joined', room);
            socket.to(room).emit('user:joined', users[socket.id]); //jihoon, younghi
        }else{
            socket.emit(`room:notfound`, room);
        }
    });
    // 4. send message, sendMessage
    socket.on(`chat:message`, ({room, message})=>{
        io.to(room).emit(`chat:message`, {user: users[socket.id], message});
    });   

    // 5. disconnect user
    socket.on(`disconnect`, ()=>{
        if(users[socket.id]){
            io.emit('user:left', users[socket.id]); // jihoon
            delete users[socket.id]
            io.emit(`update:users`, Object.values(users)); // 남아있는 유저 목록
        }
    });
});

server.listen(3030, ()=>{
    console.log(`server is running on 3030`);
})

