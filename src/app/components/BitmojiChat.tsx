'use client';
import { useState } from 'react';
import { chatBotAnswers } from '../data/chatBotAnswers';

export const BitmojiChat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = () => {
    const cleanedInput = input.toLowerCase();

    const matched = chatBotAnswers.find((item) =>
      item.keywords.some((keyword) => cleanedInput.includes(keyword.toLowerCase()))
    );

    setResponse(
      matched
        ? matched.answer
        : "Hmm... I don’t have an answer for that yet! Try asking about Ipsita's projects, tools, or goals."
    );

    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="rounded-full overflow-hidden shadow-xl"
      >
        <img src="/bitmoji/chat.png" alt="Bitmoji" className="w-16 h-16" />
      </button>

      {chatOpen && (
        <div className="mt-2 bg-white shadow-lg rounded-xl p-4 w-80">
          <p className="text-sm text-gray-700 mb-2">Ask me something about Ipsita 👇</p>
          <input
            className="w-full p-2 border rounded-md mb-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Projects, tools, goals..."
          />
          <button
            className="bg-black text-white px-3 py-1 rounded text-sm"
            onClick={handleAsk}
          >
            Ask
          </button>
          {response && (
            <p className="mt-3 text-sm text-gray-800 leading-relaxed">{response}</p>
          )}
        </div>
      )}
    </div>
  );
};
