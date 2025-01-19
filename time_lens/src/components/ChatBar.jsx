// ChatBar.jsx
import React, { useState } from "react";
import { getPersonaDialogue } from "../services/api";

const ChatBar = ({ selectedPersona }) => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim() || !selectedPersona) return;

    try {
      setIsLoading(true);
      await getPersonaDialogue(selectedPersona, userInput);
      setUserInput("");
    } catch (error) {
      console.error("Error getting persona dialogue:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBarWrapper}>
        <form onSubmit={handleSubmit} style={styles.form}>
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
            style={styles.input}
          />
          <button
            type="submit"
            disabled={!selectedPersona || isLoading || !userInput.trim()}
            style={styles.button}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "auto", // This is important to allow interaction
  },
  chatBarWrapper: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "60%",
    maxWidth: "800px",
  },
  form: {
    display: "flex",
    gap: "10px",
    width: "100%",
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s",
    ":focus": {
      borderColor: "#2b5278",
    },
  },
  button: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2b5278",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#1a3f5c",
    },
    ":disabled": {
      backgroundColor: "#cccccc",
      cursor: "not-allowed",
    },
  },
};

export default ChatBar;
