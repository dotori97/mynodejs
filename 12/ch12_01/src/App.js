import './App.css';
import io from 'socket.io-client';
import React, {useState, useEffect} from 'react';

//cros 혀용 --> io.on('connetion', (socket))
const socket = io("http://localhost:3030/", {    
  withCredentials: true,
}); // (1)

function App() {
  const [messages, setMessages] = useState([]); // 입력된 메시지 목록
  const [message, setMessage] = useState(""); //전송할 메시지

//리스너 등록
//socket 객체가 서버로부터 chat:message 이벤트를 받았을 때 실행될 콜백 함수를 등록.
//서버에서 io.emit('chat:message', msg)와 같은 방식으로 메시지를 전송하면, 이 코드를 통해 해당 메시지(msg)를 수신.
//콜백 함수는 새 메시지를 기존 메시지 리스트에 추가하여 화면에 표시하도록 setMessages를 호출.
useEffect(()=>{
  //server : io.emit(`chat:message`, msg)
  socket.on(`chat:message`, (msg) => {   // (6)
    setMessages((prevMessage) => [...prevMessage, msg]);
  });

  return () => {
    socket.off(`chat:message`); // 컴포넌트가 unmount될 때 socket 리스닝 해제
  }
}, []);

// 사용자가 메시지를 전송할 때 호출되는 sendMessage 함수. 
// 메시지 전송 시 메시지 내용을 서버로 보내고, 전송 후 입력 필드를 초기화하는 역할
const sendMessage = (e) => {
  if(message.trim()) {  //메시지 양옆의 공백 제거
    socket.emit(`chat:message`, message); // (3)
    setMessage("");
  }
}

  return (
    <div className="App">
      <h1>Message List</h1>
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key = {index}>{msg}</li>  //return 없음 --> 소괄호인 이유
        ))}
      </ul>
      <h1>Send Message</h1>
      <input 
        id="input"
        type="text"
        value={message}
        onChange={(e)=> setMessage(e.target.value)}
      >      
      </input>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
