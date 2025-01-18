import React, { useState, useEffect, useRef } from "react";
import "../styles/components/InputStart.css";

const InputStart = ({
  phrases,
  onSubmit,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingRef = useRef(null);

  useEffect(() => {
    if (!isFocused) {
      typingRef.current = setInterval(() => {
        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting && charIndex < currentPhrase.length) {
          // Typing effect
          setDisplayText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else if (!isDeleting && charIndex >= currentPhrase.length) {
          // Start deleting after a pause
          clearInterval(typingRef.current);
          setTimeout(() => {
            setIsDeleting(true);
          }, 1000);
        } else if (isDeleting && charIndex > 0) {
          // Deleting effect
          setDisplayText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else if (isDeleting && charIndex === 0) {
          // Switch to next phrase
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }, 100);
    }

    return () => clearInterval(typingRef.current);
  }, [isFocused, charIndex, phraseIndex, isDeleting, phrases]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit();
    }
  };

  return (
    <input
      className="typing-input"
      type="text"
      value={isFocused ? "" : displayText}
      placeholder={isFocused ? "" : displayText}
      onFocus={() => {
        setIsFocused(true);
        clearInterval(typingRef.current);
        setDisplayText("");
      }}
      onBlur={() => {
        setIsFocused(false);
        setCharIndex(0);
        setIsDeleting(false);
        setPhraseIndex(0);
        setDisplayText("");
      }}
      onKeyDown={handleKeyDown}
    />
  );
};

export default InputStart;
