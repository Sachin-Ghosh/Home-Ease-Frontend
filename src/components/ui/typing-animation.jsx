import { useEffect, useState } from "react";

const TypingAnimation = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = 100; // speed in ms
    const resetDelay = 1000; // delay before resetting the animation

    const typeText = () => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }
    };

    const interval = setInterval(() => {
      typeText();
    }, typingSpeed);

    // Reset the animation after completing the text
    if (index === text.length) {
      clearInterval(interval);
      setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, resetDelay);
    }

    return () => clearInterval(interval);
  }, [index, text]);

  return <span className={className}>{displayedText}</span>;
};

export default TypingAnimation;
