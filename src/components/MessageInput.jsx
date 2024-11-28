import React, { useState } from "react";
import './MessageInput.css';

const MessageInput = ({ onSendMessage }) => {
  const [messageText, setMessageText] = useState("");

  const handleSend = () => {
    onSendMessage(messageText);
    setMessageText("");
  };
 
  return (
    <div className="input-section">
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        className="input"
      />
      <button onClick={handleSend} className="button">Send</button>
    </div>
  );
};

export default MessageInput;