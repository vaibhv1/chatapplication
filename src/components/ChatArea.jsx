import React, { useState, useRef, useEffect } from "react";
import MessageInput from "./MessageInput";
import './ChatArea.css';
import { IoMdContact } from "react-icons/io";
import { GrPrevious } from "react-icons/gr";

const ChatArea = ({ selectedUser, messages, setMessages, onBackClick }) => {
  const [isReplyPending, setIsReplyPending] = useState(false);
  const messagesEndRef = useRef(null);

  const randomReplies = [
    "Got it!", "How are you?", "That's interesting.", "Can we talk later?",
    "Sure, let me know.", "Thanks for sharing!"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText) => {
    if (messageText.trim()) {
      const newMessage = {
        id: Date.now(),
        text: messageText,
        timestamp: new Date().toLocaleTimeString(),
        sender: "You"
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      if (!isReplyPending) {
        setIsReplyPending(true);
        setTimeout(() => {
          const randomMessage = {
            id: Date.now() + 1,
            text: randomReplies[Math.floor(Math.random() * randomReplies.length)],
            timestamp: new Date().toLocaleTimeString(),
            sender: selectedUser
          };
          setMessages((prevMessages) => [...prevMessages, randomMessage]);
          setIsReplyPending(false);
        }, 4000);
      }
    }
  };

  return (
    <div className="chat-area">
      {selectedUser ? (
        <>
          <div className="chat-header">
            <button onClick={onBackClick}>
              <GrPrevious />
            </button>
            <IoMdContact className="icon" />
            <span>{selectedUser}</span>
          </div>

          <div className="messages">
            {messages.length ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sender === "You" ? "sent" : "received"}`}
                >
                  <span className="message-text">{message.text}</span>
                  <div className="timestamp">{message.timestamp}</div>
                </div>
              ))
            ) : (
              <p className="no-messages">No messages</p>
            )}
            <div ref={messagesEndRef} />
          </div>
          <MessageInput onSendMessage={handleSendMessage} />
        </>
      ) : (
        <div className="placeholder">Select a contact to start chatting</div>
      )}
    </div>
  );
};

export default ChatArea;