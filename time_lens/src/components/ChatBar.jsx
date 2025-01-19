// ChatBar.jsx
import React, { useState } from "react";
import "../styles/components/ChatBar.css";

const ChatBar = ({ persona, onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput(""); // Clear input after sending
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-bar-wrapper">
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={persona ? "Type your message..." : "Select a persona to chat"}
            disabled={!persona}
            className="chat-input"
          />
          <button
            type="submit"
            disabled={!input.trim() || !persona}
            className="chat-button"
          >
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBar;