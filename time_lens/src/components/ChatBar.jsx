// ChatBar.jsx
import React, { useState } from "react";
import { getPersonaDialogue } from "../services/api";
import "../styles/components/ChatBar.css";

const ChatBar = ({ selectedPersona, setChatResponse }) => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim() || !selectedPersona) return;

    try {
      setIsLoading(true);
      const jsonResponse = await getPersonaDialogue(selectedPersona, userInput);
      setChatResponse(jsonResponse.content);
      setUserInput("");
    } catch (error) {
      console.error("Error getting persona dialogue:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-bar-wrapper">
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={
              selectedPersona
                ? "Type your message..."
                : "Select a persona to chat"
            }
            disabled={!selectedPersona || isLoading}
            className="chat-input"
          />
          <button
            type="submit"
            disabled={!selectedPersona || isLoading || !userInput.trim()}
            className="chat-button"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBar;
