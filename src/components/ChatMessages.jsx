"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { User, Bot } from "lucide-react";
import TextWrapper from "./ChatMarkdown";
import ChatMarkdown from "./ChatMarkdown";

export default function ChatMessages({ chatHistory }) {
  const bottomRef = useRef(null);

  const test = null

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-6 rounded-md custom-scroll">

      {[...chatHistory].map((msg) => (
        <div key={msg.id} className="flex flex-col gap-6">

          {/* USER MESSAGE */}
          <div className="flex items-start justify-end gap-3">
            <div className="flex flex-col items-end max-w-[85%] sm:max-w-[75%]">
              <div className="bg-zinc-700/10 text-white px-5 py-3 rounded-3xl rounded-br-sm shadow-sm text-base leading-relaxed">
                {msg.question}
              </div>
            </div>

            <div className="w-8 h-8 bg-zinc-600/10 text-white rounded-full flex items-center justify-center shadow-sm mt-1">
              <User size={18} />
            </div>
          </div>

          {/* AI MESSAGE */}
          {/* {msg.answer !== null && (
            <div className="flex items-start justify-start gap-4 max-w-4xl">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center shadow-sm mt-1 flex-shrink-0">
                <Bot size={18} />
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="text-gray-100 text-base leading-relaxed prose prose-invert max-w-none prose-p:my-3 prose-headings:my-4 prose-headings:font-semibold prose-ul:my-3 prose-li:my-1 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-700 prose-pre:rounded-lg">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw]} 
                    remarkPlugins={[remarkGfm]}
                  >
                    {msg.answer}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )} */}
          {/* 
          {msg.answer !== null && (
            <div className="flex items-start justify-start gap-4 max-w-4xl animate-[fadeIn_0.3s_ease]">

              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center shadow-sm mt-1">
                <Bot size={18} />
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="px-5 py-4 rounded-2xl shadow-sm border border-zinc-700/5">

                  <div className="prose prose-invert max-w-none text-gray-100 leading-relaxed break-words prose-p:my-3 prose-headings:my-4 prose-headings:font-semibold prose-ul:my-3 prose-li:my-1 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-700 prose-pre:rounded-lg prose-code:bg-zinc-900 prose-code:text-green-400 prose-code:px-1 prose-code:rounded">
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw]}
                      remarkPlugins={[remarkGfm]}
                    >
                      {msg.answer}
                    </ReactMarkdown>
                  </div>

                </div>
              </div>

            </div>
          )} */}


          {msg.answer && (
            <div className="flex items-start gap-4 max-w-4xl animate-[fadeIn_0.3s_ease]">

              <div className="w-8 h-8 bg-white/10 text-white rounded-full flex items-center justify-center shadow-sm mt-1">
                <Bot size={18} />
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="px- py-2 rounded-2xl shadow-sm border border-zinc-700/5">
                  {/* <TextWrapper>{msg.answer}</TextWrapper> */}
                  <ChatMarkdown content={msg.answer} />
                </div>
              </div>

            </div>
          )}



          {/* AI TYPING */}
          {/* {test=== null && ( */}
          {msg.answer === null && (
            <div className="flex items-start justify-start gap-4">
              <div className="w-8 h-8 bg-white/10 text-white rounded-full flex items-center justify-center shadow-sm mt-1">
                <Bot size={18} />
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          )}

        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
