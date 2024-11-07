import './App.css';
import io from 'socket.io-client';
import React, {useState, useEffect} from 'react';

//cros 혀용 --> io.on('connetion', (socket))
const socket = io("http://localhost:3030/", {    
  withCredentials: true,
}); // (1)

function App() {
  const [username, setUserName] = useState('');
  const [isLogined, setIsLogined] = useState(false);
  const [roomName, setRoomName] = useState(''); 
  const [currentRoom, setCurrentRoom] = useState('');
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]); // 입력된 메시지 목록
  const [message, setMessage] = useState(""); //전송할 메시지

 
//리스너 등록
//socket 객체가 서버로부터 chat:message 이벤트를 받았을 때 실행될 콜백 함수를 등록.
//서버에서 io.emit('chat:message', msg)와 같은 방식으로 메시지를 전송하면, 이 코드를 통해 해당 메시지(msg)를 수신.
//콜백 함수는 새 메시지를 기존 메시지 리스트에 추가하여 화면에 표시하도록 setMessages를 호출.
//서버에서 보낸 리스너 작업을 useEffect에서
useEffect(()=>{
  socket.on(`login:success`, (data) => {  // login success
    setIsLogined(true);
    setRooms(data.rooms);
  });
  socket.on(`room:created`, (room) => {  
    setRooms((prevRooms) => [...prevRooms, room]);  //room created
  });
  socket.on('room:joined', (room) => {   //room joined
    alter(`joined room: ${room}`);
    setCurrentRoom(room);
  });
  socket.on('update:rooms', (rooms) => {  // other room update
    setRooms(rooms);
  });
  socket.on(`update:users`, (users)=>{
    setUsers(users);
  });
  socket.on(`user:joined`, (user)=>{
    setMessage((prevMessage)=>[...prevMessage, `${user} joined this room`]);
  });
  socket.on(`user:left`, (user)=>{
    setMessage((prevMessage)=>[...prevMessage, `${user} left this room`]);
  });
  //server : io.emit(`chat:message`, msg)
  socket.on(`chat:message`, (msg) => {   // (6)  receive chat message
    setMessages((prevMessage) => [...prevMessage, msg]);
  });

  return () => {
    socket.off(`chat:message`); // 컴포넌트가 unmount될 때 socket 리스닝 해제
    socket.off('user:joined');
    socket.off(`user:left`);
    socket.off(`room:joined`);
    socket.off(`update:users`);
    socket.off(`update:rooms`);
  };
}, []);

// 사용자가 메시지를 전송할 때 호출되는 sendMessage 함수. 
// 메시지 전송 시 메시지 내용을 서버로 보내고, 전송 후 입력 필드를 초기화하는 역할
const sendMessage = (e) => {
  if(message.trim()) {  //메시지 양옆의 공백 제거
    socket.emit(`chat:message`, message); // (3)
    setMessage("");
  }
}

const handleLogin = () => {
  if(username) {
    socket.emit(`login`, username);
  }
}
const handleCreatRoom = () => {
  
}

  return (
    <div className="App">
      {!isLogined? (
        <div clasName="login">
          <h2>Login</h2>
          <input
            type="text"
            placeholder='Enter username'
            value={username}
            onChange={(e)=> setUserName(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>    
      ): (
        <div className='chat-container'>
          <div className='creat-room'>
            <h2>Create Room</h2>
            <input
              type = "text"
              placeholder='enter the room'
              value={roomName}
              onChange={(e)=> setRoomName(e.target.value)}
            />
            <button onClick={(handleCreatRoom)}>Create Room</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
