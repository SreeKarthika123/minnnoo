// frontend/components/Chatbot.js
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // your backend URL

export default function Chatbot({ userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("bot_response", ({ answer }) => {
      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    socketRef.current.emit("user_query", { userId, query: input });
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 z-50">
      <div
        className={`bg-[#11162a] rounded-xl shadow-lg border border-white/20 flex flex-col ${
          isOpen ? "h-[400px]" : "h-12"
        } transition-all duration-300`}
      >
        {/* Header */}
        <div
          className="cursor-pointer p-3 flex justify-between items-center text-white font-semibold"
          onClick={() => setIsOpen(!isOpen)}
        >
          Chatbot
          <span>{isOpen ? "−" : "+"}</span>
        </div>

        {/* Chat Window */}
        {isOpen && (
          <div className="flex-1 flex flex-col p-3 overflow-y-auto">
            <div className="flex-1 space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg max-w-[80%] ${
                    msg.sender === "bot" ? "bg-gray-700 text-white self-start" : "bg-green-500/40 text-white self-end"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about jobs, skills..."
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white outline-none"
              />
              <button
                onClick={sendMessage}
                className="px-3 py-2 rounded-lg bg-green-500/40 text-white hover:bg-green-500/60 transition"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
