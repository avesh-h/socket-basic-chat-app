import React, { useState } from "react";
import { socket } from "../socket";

const ChatFooter = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log({ userName: localStorage.getItem("userName"), message });
    if (message) {
      const content = {
        name: localStorage.getItem("userName"),
        text: message,
        _id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      };
      socket.emit("sendMessage", content);
    }
    setMessage("");
  };

  const handleTyping = () => {
    socket.emit("typing", `${localStorage.getItem("userName")} is typing...`);
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
