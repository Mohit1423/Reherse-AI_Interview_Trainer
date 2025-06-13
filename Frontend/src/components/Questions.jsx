import React, { useEffect, useState, useRef } from "react";

export default function Questions({ question, onTTSFinish }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const words = question.question.split(" ");

  useEffect(() => {
    setCurrentWordIndex(-1);
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(question.question);

    const wordBoundaryHandler = (event) => {
      const charIndex = event.charIndex;
      const upto = question.question.slice(0, charIndex);
      const words = upto.match(/\b\w+\b/g) || [];
      const wordIndex = words.length;
      setCurrentWordIndex(wordIndex);
    };

    utterance.onboundary = (event) => {
      if (event.name === "word") wordBoundaryHandler(event);
    };

    utterance.onend = () => {
      setCurrentWordIndex(-1);
      if (onTTSFinish) onTTSFinish();
    };

    speechSynthesis.speak(utterance);

    return () => speechSynthesis.cancel();
  }, [question.question]);

  return (
    <div className="w-full h-full  p-6 rounded-xl bg-[#0f1a12] text-white shadow-xl border border-green-800 flex items-center justify-center min-h-[350px]">
      <div className="max-w-full text-xl leading-relaxed text-center break-words flex flex-wrap justify-center">
        {words.map((word, index) => (
          <span
            key={index}
            className={`mr-2 mb-1 transition-colors duration-200 ${
              index === currentWordIndex
                ? "text-green-400 font-semibold"
                : "text-white"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
