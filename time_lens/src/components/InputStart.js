import React, { useState, useEffect, useRef } from "react";
import "../styles/components/InputStart.css";

const InputStart = ({
  phrases,
  onSubmit,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [inputValue, setInputValue] = useState("");
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
          setDisplayText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else if (!isDeleting && charIndex >= currentPhrase.length) {
          clearInterval(typingRef.current);
          setTimeout(() => {
            setIsDeleting(true);
          }, 1000);
        } else if (isDeleting && charIndex > 0) {
          setDisplayText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }, 100);
    }

    return () => clearInterval(typingRef.current);
  }, [isFocused, charIndex, phraseIndex, isDeleting, phrases]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit(inputValue);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      className="typing-input"
      type="text"
      value={isFocused ? inputValue : displayText}
      onChange={handleChange}
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
        setInputValue(""); // Clear input value on blur
      }}
      onKeyDown={handleKeyDown}
    />
  );
};

export default InputStart;