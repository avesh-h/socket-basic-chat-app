import React, { useState, useEffect, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { socket } from "../socket";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (msg) => {
      console.log("getMessage", msg);
      setMessages([...messages, msg]);
    });
    return () => {
      socket.off("messageResponse");
    };
  }, [socket, messages]);

  useEffect(() => {
    //scroll to the bottom everytime whenever new message arrive
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          lastMessageRef={lastMessageRef}
          typingStatus={typingStatus}
        />
        <ChatFooter />
      </div>
    </div>
  );
};

export default ChatPage;
