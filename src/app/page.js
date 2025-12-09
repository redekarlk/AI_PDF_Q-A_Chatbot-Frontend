
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const features = [
  {
    title: "Smart Q&A",
    description:
      "Ask any complex question and receive concise, grounded answers powered by Gemini AI, directly referencing your documents.",
    icon: (
      <svg className="w-8 h-8 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-9 0a2 2 0 002 2h2m-2-2h10m0 0l-3 3m3-3l3 3" />
      </svg>
    ),
    bg: "bg-red-950/10 border-red-600/30",
  },
  {
    title: "Vector Search RAG",
    description:
      "Blazing-fast semantic search retrieves contextually relevant information — not just keywords.",
    icon: (
      <svg className="w-8 h-8 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    bg: "bg-red-950/10 border-red-600/30",
  },
  {
    title: "Secure & Private",
    description:
      "Your data stays yours. Strong JWT-based authentication and enterprise-grade security protocols.",
    icon: (
      <svg className="w-8 h-8 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    bg: "bg-red-950/10 border-red-600/30",
  },
];



// How it works
const howItWorks = [
  {
    id: 1,
    title: "Upload Document",
    description: "Drag and drop your PDF. We securely process and encrypt your data instantly.",
    color: "bg-black/10",
    icon: (
      <svg className="w-8 h-8 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 12l-4-4m0 0l-4 4m4-4v12" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "AI Analysis",
    description: "Our engine chunks text and creates vector embeddings for semantic search.",
    color: "bg-black/10",
    icon: (
      <svg className="w-8 h-8 text-indigo-200" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15M19 9l-5 5m0 0L9 9m5 5v6" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Context Retrieval",
    description: "When you ask a question, we find the most relevant paragraphs.",
    color: "bg-black/10",
    icon: (
      <svg className="w-8 h-8 text-blue-200" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 17a7 7 0 100-14 7 7 0 000 14z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Instant Answer",
    description: "Gemini generates a precise response with citations to the source.",
    color: "bg-black/10",
    icon: (
      <svg className="w-8 h-8 text-teal-200" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8m-8 4h5m-9 6l1.5-3H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-5l1.5 3" />
      </svg>
    )
  },

  // NEW STEPS

  {
    id: 5,
    title: "Smart Follow-Up",
    description: "Ask deeper follow-up questions. The AI keeps conversation memory for accuracy.",
    color: "bg-black/10",
    icon: (
      <svg className="w-8 h-8 text-emerald-200" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M4 20v-6h6M20 4v6h-6" />
      </svg>
    )
  },
  {
    id: 6,
    title: "Multi-Document Support",
    description: "Upload multiple PDFs and let the system analyze them together.",
    color: "bg-black/10",
    icon: (
      <svg className="w-8 h-8 text-green-200" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8m-8 4h8m-8 4h5M4 6V4a2 2 0 012-2h10l4 4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
      </svg>
    )
  },
  {
    id: 7,
    title: "Citation Mapping",
    description: "Every answer links to exact page numbers and highlighted source text.",
    color: "bg-black/10",
    icon: (
      <svg className="w-8 h-8 text-lime-200" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 7-7 7-7-7 7-7zm0 14v6" />
      </svg>
    )
  },
  // {
  //   id: 8,
  //   title: "Export Insights",
  //   description: "Download summaries, key points, and extracted insights as files.",
  //   color: "bg-black/10",
  //   icon: (
  //     <svg className="w-8 h-8 text-yellow-200" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
  //       <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l4-4m-4 4l-4-4M4 21h16" />
  //     </svg>
  //   )
  // },
  {
    id: 9,
    title: "Secure Storage",
    description: "Your files stay encrypted with auto-expiry & full deletion control.",
    color: "bg-black/10",
    icon: (
      <svg className="w-8 h-8 text-amber-200" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.1 0 2 .9 2 2v3H10v-3c0-1.1.9-2 2-2zm0-6a4 4 0 00-4 4v2h8V9a4 4 0 00-4-4z" />
      </svg>
    )
  },
  // {
  //   id: 10,
  //   title: "Team Collaboration",
  //   description: "Share chats and documents with teammates for research and review.",
  //   color: "bg-black/10",
  //   icon: (
  //     <svg className="w-8 h-8 text-orange-200" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
  //       <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-4M7 20H2v-2a4 4 0 015-4m5-10a4 4 0 110 8 4 4 0 010-8z" />
  //     </svg>
  //   )
  // }
];




const HorizontalScrollCarousel = () => {
  const targetRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  const [xRange, setXRange] = React.useState(["0px", "0px"]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  React.useEffect(() => {
    if (scrollRef.current) {
      const updateWidth = () => {
        const scrollWidth = scrollRef.current.scrollWidth;
        const clientWidth = window.innerWidth;
        const distance = scrollWidth - clientWidth;
        setXRange(["0px", `-${distance + 50}px`]);
      };

      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], xRange);

  return (
    <section ref={targetRef} className="relative h-[500vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        
        {/* Top Heading */}
        <div className="w-full flex justify-center mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-indigo-300">
              How It Works
            </h2>
            <p className="text-gray-400 text-center mt-4 max-w-xl mx-auto">
              A smooth visual walkthrough of the AI-DOC intelligence pipeline.
            </p>
          </motion.div>
        </div>

        {/* Scroll Section */}
        <motion.div
          ref={scrollRef}
          style={{ x }}
          className="flex gap-10 pl-[40vw] md:pl-[30vw] pr-[10vw]"
        >
          {howItWorks.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative flex-shrink-0 w-[300px] md:w-[380px] bg-gradient-to-br ${card.color} rounded-sm shadow-xl shadow-black/40 p-8 border border-violet-500/30 bg-violet-950/10 backdrop-blur-sm`}
            >
              <div className="relative z-10 flex flex-col items-center text-center">

                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-900 ring ring-teal-400 mb-10 mt-2 shadow-md">
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm sm:text-base">
                  {card.description}
                </p>
              </div>

              {/* overlay */}
              <div className="absolute inset-0 bg-black/20 rounded-lg" />
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

const phrases = [
  "Summarize this financial report...",
  "What are the key clauses in this contract?",
  "Explain the technical architecture...",
  "Find the termination date..."
];

const TypewriterTagline = () => {
  const [text, setText] = React.useState("");
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const speed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        setText(currentPhrase.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);

  return (
    <div className="h-8 mt-4 text-lg sm:text-xl text-indigo-200 font-mono">
      <span className="mr-2 text-gray-500">$</span>
      {text}
      <span className="animate-pulse">_</span>
    </div>
  );
};


const ChatBubble = ({ sender, text, citation }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] p-3 rounded-xl shadow-lg text-sm backdrop-blur-sm ${isUser ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-purple-900/40" : "bg-gradient-to-br from-gray-700 to-gray-800 text-gray-100 shadow-black/40"}`}
      >
        {/* FIX: wrapper div with className */}
        <div className="prose prose-invert m-0 break-words">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {text}
          </ReactMarkdown>
        </div>

        {citation && (
          <div className="mt-1 text-xs text-indigo-200">
            <span className="font-semibold">Source:</span> {citation}
          </div>
        )}
      </div>
    </div>
  );
};






export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white font-sans">
      {/* Global keyframes + tiny helpers */}
      <style>{`@keyframes blob{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(25px,-40px) scale(1.1)}66%{transform:translate(-20px,20px) scale(0.9)}}.animate-blob{animation:blob 8s infinite ease-in-out}.animation-delay-2000{animation-delay:2s}.animate-card-hover:hover{transform:translateY(-4px) scale(1.03)} `}</style>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/20 border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
            <Image src="/DocDrip.svg" alt="Logo" width={32} height={32} className="w-8 h-8 hover:scale-110 transition" /> |
            <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-teal-300 bg-clip-text text-transparent">
              DocDrip AI
            </span>
          </Link>

          <div className="space-x-4 flex items-center">
            {user ? (
              <button
                onClick={logout}
                className="text-gray-300 hover:text-red-400 hover transition"
                aria-label="Logout"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth"
                className="text-gray-300 hover:text-teal-300 transition"
                aria-label="Sign in"
              >
                Sign In
              </Link>
            )}
            <Link href="/chat" className="px-4 py-2 hidden sm:inline-block bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-semibold shadow-md shadow-purple-900/30 hover:opacity-90 transition" aria-label="Get started">
              Get Started
            </Link>
            {/* Mobile CTA */}
            <Link href="/chat" className="px-3 py-2 sm:hidden bg-indigo-600 rounded-sm" aria-label="Get started mobile">
              Start
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-24 pb-20 text-center px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-12 right-6 w-56 h-56 rounded-full blur-3xl animate-blob" aria-hidden />
        <div className="absolute bottom-6 left-6 w-56 h-56 rounded-full blur-3xl animate-blob animation-delay-2000" aria-hidden />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight mx-auto bg-gradient-to-r from-purple-300 via-indigo-300 to-teal-200 text-transparent bg-clip-text drop-shadow-xl"
          >
            Ask Anything Inside Your Documents
          </motion.h1>

          <TypewriterTagline />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-base sm:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Query any PDF with natural language. Extract insights instantly using{" "}
            <span className="text-indigo-300 font-semibold">Gemini-powered RAG</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <Link href="/auth" className="inline-block px-8 py-3 rounded-sm text-lg font-bold ring ring-red-500 hover:ring-0 hover:bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl shadow-purple-900/40 hover:scale-105 transition" aria-label="Upload PDF and start chatting">
              Upload PDF → Start Chatting
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* DEMO PANEL */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-sm border border-gray-700/50 bg-gray-900/10 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/60"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-indigo-300 mb-8">Live Demo Preview</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PDF VIEWER MOCK */}
            <div className="rounded-sm bg-gray-800/10 border border-gray-700 shadow-inner p-3 sm:p-4">
              <p className="text-xs text-teal-300 mb-2 font-mono">PDF_Technical_Report_Q2.pdf — Page 3</p>
              <div className="p-3 bg-white/60 text-gray-900 rounded-sm text-sm h-64 sm:h-[380px] overflow-y-auto shadow-md">
                <p className="font-bold mb-2 text-sm sm:text-base">Section 3.1: Fusion Reactor Status</p>
                <p className="mb-3 text-sm sm:text-base">
                  Plasma stability reached <strong>4.5 seconds</strong> in test sequence T-48. Improvement resulted from the new
                  <span className="bg-yellow-200/40 px-1 rounded"> toroidal magnetic field adjustment algorithm </span>.
                  Funding is required for <strong>Project Titan</strong>, estimated at <strong>18 months</strong>.
                </p>

                <p className="font-bold mt-4 mb-2 text-sm sm:text-base">Section 3.2: Energy Output</p>
                <p className="text-sm sm:text-base">Peak net gain recorded at <strong>0.8 Q</strong>, still below break-even. Injector efficiency currently: 78%.</p>
              </div>
            </div>

            {/* CHAT MOCK */}
            <div className="rounded-sm bg-gray-800/10 border border-gray-700 p-3 sm:p-4 shadow-inner flex flex-col">
              <div className="flex-grow overflow-y-auto pr-2 space-y-2">
                <ChatBubble sender="user" text="What is the next major project and timeline?" />
                <ChatBubble sender="ai" text="The next major project is **Project Titan** with a projected timeline of **18 months**." citation="Page 3" />
                <ChatBubble sender="user" text="Rerason for plasma stability impovement?" />
                <ChatBubble sender="ai" text="Stability improved due to the **toroidal magnetic field adjustment algorithm**." />
              </div>

              <div className="flex mt-3 opacity-60">
                <input placeholder="Ask something..." disabled className="flex-grow p-2 rounded-l-md bg-gray-700 text-white border border-gray-600 text-sm" aria-disabled />
                <button className="p-2 bg-indigo-600 rounded-r-md text-sm" disabled aria-disabled>Send</button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>



      {/* SCROLL SECTION */}
      <HorizontalScrollCarousel />



      {/* FEATURES */}
      <section className="py-16 px-4 sm:px-6 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-indigo-300">The Intelligence Stack</h2>
          <p className="text-gray-400 text-center mt-4 mb-8 max-w-xl mx-auto">The fully optimized AI-RAG pipeline powering your document understanding.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className={`p-6 sm:p-8 rounded-sm bg-gradient-to-br ${f.bg} border shadow-xl shadow-black/40 backdrop-blur-sm animate-card-hover transition`}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-900 ring ring-teal-400 mx-auto mb-4 shadow-md">
                {f.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-2">{f.title}</h3>
              <p className="text-gray-300 text-center text-sm sm:text-base">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 border-t border-gray-800 text-center text-gray-400">
        <span>© {new Date().getFullYear()} PDF Query AI — Powered by Gemini RAG.</span>
      </footer>
    </div>
  );
}
