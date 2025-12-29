"use client";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full px-3 py-3 md:px-4 md:py-4 bg-transparent backdrop-blur-xl border-t border-gray-800 flex items-center gap-2 md:gap-3 sticky bottom-0 z-40 pb-[env(safe-area-inset-bottom)]">
      <textarea
        placeholder="Ask here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        className="flex-1 resize-none text-gray-100 bg-white/5 backdrop-blur-xl border border-gray-700/50 rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-white/30 transition shadow-lg shadow-black/15"
        style={{ maxHeight: "150px" }}
      />

      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className={`
          p-2 md:p-3 rounded-xl 
          transition flex items-center justify-center 
          shadow-md backdrop-blur-xl
          ${
            message.trim()
              ? "bg-blue-100/40 text-white shadow-white/40"
              : "bg-gray-700/30 text-gray-400 cursor-not-allowed"
          }
        `}
        title="Send"
      >
        <Send size={18} className="md:w-5 md:h-5" />
      </button>
    </div>
  );
}
