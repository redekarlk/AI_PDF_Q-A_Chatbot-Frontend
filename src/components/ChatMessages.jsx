"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function ChatMessages({ chatHistory }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-6 rounded-md custom-scroll">

      {[...chatHistory].map((msg) => (
        <div key={msg.id} className="flex flex-col gap-3">

          {/* USER MESSAGE */}
          <div className="flex items-start justify-end gap-2">
            <div className="flex flex-col items-end">
              <div className="max-w-full sm:max-w-md bg-black text-white px-3 py-2 md:px-4 md:py-2 rounded-2xl md:rounded-3xl rounded-br-none shadow-md text-sm md:text-base leading-relaxed">
                {msg.question}
              </div>
              <p className="text-xs text-gray-500 mt-1">You</p>
            </div>

            <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-300 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
              U
            </div>
          </div>

          {/* AI MESSAGE */}
          {msg.answer !== null && (
            <div className="flex items-start justify-start gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-300 text-gray-800 rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
                AI
              </div>

              <div className="flex flex-col">
                <div className="max-w-full sm:max-w-md text-white px-3 py-2 md:px-4 md:py-3 rounded-2xl md:rounded-3xl rounded-bl-none shadow-md text-sm md:text-base leading-relaxed prose prose-invert">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {msg.answer}
                  </ReactMarkdown>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {/* AI TYPING */}
          {msg.answer === null && (
            <div className="flex items-start justify-start gap-2 animate-pulse">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-300 text-gray-800 rounded-full flex items-center justify-center text-xs md:text-sm font-bold">
                AI
              </div>

              <div className="flex flex-col">
                <div className="max-w-full sm:max-w-md bg-gray-800 text-gray-400 px-3 py-2 md:px-4 md:py-3 rounded-2xl md:rounded-3xl rounded-bl-none shadow-md text-sm md:text-base leading-relaxed flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                </div>

                <p className="text-xs text-gray-500 mt-1">AI is typing…</p>
              </div>
            </div>
          )}

        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
