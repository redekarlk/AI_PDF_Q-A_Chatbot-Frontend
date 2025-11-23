"use client";

import React from "react";

const features = [
  {
    title: "Smart Q&A",
    description:
      "Ask any complex question and receive concise, grounded answers powered by Gemini AI, directly referencing your documents.",
    icon: (
      <svg
        className="w-8 h-8 text-purple-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-9 0a2 2 0 002 2h2m-2-2h10m0 0l-3 3m3-3l3 3"
        />
      </svg>
    ),
    bg: "from-purple-700/20 to-indigo-800/10 border-purple-600/30",
  },
  {
    title: "Vector Search RAG",
    description:
      "Blazing-fast semantic search retrieves contextually relevant information — not just keywords.",
    icon: (
      <svg
        className="w-8 h-8 text-indigo-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    bg: "from-indigo-700/20 to-purple-800/10 border-indigo-600/30",
  },
  {
    title: "Secure & Private",
    description:
      "Your data stays yours. Strong JWT-based authentication and enterprise-grade security protocols.",
    icon: (
      <svg
        className="w-8 h-8 text-teal-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    bg: "from-teal-700/20 to-gray-700/10 border-teal-600/30",
  },
];

const ChatBubble = ({ sender, text, citation }) => (
  <div
    className={`flex ${
      sender === "user" ? "justify-end" : "justify-start"
    } mb-3`}
  >
    <div
      className={`max-w-[80%] p-3 rounded-xl shadow-lg text-sm backdrop-blur-sm ${
        sender === "user"
          ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-purple-900/40"
          : "bg-gradient-to-br from-gray-700 to-gray-800 text-gray-100 shadow-black/40"
      }`}
    >
      <div dangerouslySetInnerHTML={{ __html: text }} />
      {citation && (
        <div className="mt-1 text-xs text-indigo-200">
          <span className="font-semibold">Source:</span> {citation}
        </div>
      )}
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white font-inter">

      {/* GLOBAL KEYFRAMES */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(25px, -40px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 8s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animate-card-hover:hover {
          transform: translateY(-4px) scale(1.03);
        }
      `}</style>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/30 border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
          <a className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-teal-300 bg-clip-text text-transparent">
            PDF Query AI
          </a>
          <div className="space-x-5">
            <a href="/auth" className="text-gray-300 hover:text-teal-300 transition">Sign In</a>
            <a href="/auth" className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-semibold shadow-md shadow-purple-900/30 hover:opacity-90 transition">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-28 pb-40 text-center px-6 overflow-hidden">

        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />

        <h1 className="text-6xl sm:text-7xl font-extrabold max-w-5xl mx-auto bg-gradient-to-r from-purple-300 via-indigo-300 to-teal-200 text-transparent bg-clip-text drop-shadow-xl leading-tight">
          Ask Anything Inside Your Documents
        </h1>

        <p className="mt-8 text-xl text-gray-300 max-w-3xl mx-auto">
          Query any PDF with natural language. Extract insights instantly using{" "}
          <span className="text-indigo-300 font-semibold">Gemini-powered RAG</span>.
        </p>

        <a
          // href="/upload"
          className="inline-block mt-12 px-12 py-4 rounded-full text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl shadow-purple-900/40 hover:scale-105 transition transform"
        >
          Upload PDF → Start Chatting
        </a>
      </section>

      {/* DEMO PANEL */}
      <section className="py-16 -mt-24 px-6 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-xl p-8 shadow-2xl shadow-black/60">

          <h3 className="text-3xl font-bold text-center text-indigo-300 mb-10">
            Live Demo Preview
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* PDF VIEWER MOCK */}
            <div className="rounded-xl bg-gray-800 border border-gray-700 shadow-inner p-4">
              <p className="text-xs text-teal-300 mb-2 font-mono">PDF_Technical_Report_Q2.pdf — Page 3</p>
              <div className="p-4 bg-white text-gray-900 rounded-lg text-sm h-[380px] overflow-y-auto shadow-md">
                <p className="font-bold mb-2 text-base">Section 3.1: Fusion Reactor Status</p>
                <p className="mb-4">
                  Plasma stability reached <strong>4.5 seconds</strong> in test sequence T-48. Improvement resulted from the new
                  <span className="bg-yellow-200/60 px-1 rounded"> toroidal magnetic field adjustment algorithm </span>.
                  Funding is required for **Project Titan**, estimated at **18 months**.
                </p>

                <p className="font-bold mt-4 mb-2 text-base">Section 3.2: Energy Output</p>
                <p>Peak net gain recorded at **0.8 Q**, still below break-even. Injector efficiency currently: 78%.</p>
              </div>
            </div>

            {/* CHAT MOCK */}
            <div className="rounded-xl bg-gray-800 border border-gray-700 p-4 shadow-inner flex flex-col">
              <div className="flex-grow overflow-y-auto pr-2">
                <ChatBubble sender="user" text="What is the next major project and timeline?" />
                <ChatBubble
                  sender="ai"
                  text="The next major project is <strong>Project Titan</strong> with a projected timeline of <strong>18 months</strong>."
                  citation="Page 3"
                />
                <ChatBubble sender="user" text="Reason for plasma stability improvement?" />
                <ChatBubble
                  sender="ai"
                  text="Stability improved due to the <strong>toroidal magnetic field adjustment algorithm</strong>."
                />
              </div>

              <div className="flex mt-4 opacity-50">
                <input
                  placeholder="Ask something..."
                  disabled
                  className="flex-grow p-3 rounded-l-lg bg-gray-700 text-white border border-gray-600"
                />
                <button className="p-3 bg-indigo-600 rounded-r-lg" disabled>Send</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28 px-6 bg-black/70">
        <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-indigo-300">
          The Intelligence Stack
        </h2>
        <p className="text-gray-400 text-center mt-4 mb-16 max-w-xl mx-auto">
          The fully optimized AI-RAG pipeline powering your document understanding.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl bg-gradient-to-br ${f.bg} border shadow-xl shadow-black/40 backdrop-blur-sm animate-card-hover transition`}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-900 ring-2 ring-teal-400 mx-auto mb-5 shadow-md">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">{f.title}</h3>
              <p className="text-gray-300 text-center">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-gray-800 text-center text-gray-500">
        © {new Date().getFullYear()} PDF Query AI — Powered by Gemini RAG.
      </footer>
    </div>
  );
}
