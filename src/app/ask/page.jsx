// "use client";

// import { useState } from "react";
// import api from "../../lib/axiosInstance";

// export default function AskPage() {
//     const [question, setQuestion] = useState("");
//     const [chat, setChat] = useState([]);

//     const docId = typeof window !== "undefined" ? localStorage.getItem("docId") : null;

//     const askQuestion = async () => {
//         if (!question) return;

//         const userMessage = { role: "user", text: question };
//         setChat((prev) => [...prev, userMessage]);

//         try {
//             const res = await api.post("/api/v1/query", {
//                 question,
//                 docId
//             });

//             const aiMessage = {
//                 role: "assistant",
//                 text: res.data.answer
//             };

//             setChat((prev) => [...prev, aiMessage]);
//             setQuestion("");

//         } catch (err) {
//             console.log(err);

//             setChat((prev) => [
//                 ...prev,
//                 { role: "assistant", text: "Could not fetch answer. Try again." }
//             ]);
//         }
//     };

//     return (
//         <div className="p-6 max-w-3xl mx-auto min-h-screen text-gray-200">
//             <h1 className="text-3xl font-bold mb-6">Ask Questions</h1>

//             {/* chat box */}
//             <div className="border border-gray-700 rounded-lg p-4 h-96 overflow-y-auto mb-5 bg-gray-800 shadow-md">
//                 {chat.map((msg, idx) => (
//                     <div
//                         key={idx}
//                         className={
//                             msg.role === "user"
//                                 ? "p-3 rounded-lg mb-3 text-sm w-fit max-w-full bg-blue-600 text-white ml-auto"
//                                 : "p-3 rounded-lg mb-3 text-sm w-fit max-w-full bg-gray-700 text-gray-200"
//                         }
//                     >
//                         <strong>{msg.role === "user" ? "You" : "AI"}: </strong>
//                         {msg.text}
//                     </div>
//                 ))}
//             </div>

//             {/* input + send */}
//             <div className="flex items-center gap-3">
//                 <input
//                     className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Ask your question..."
//                     value={question}
//                     onChange={(e) => setQuestion(e.target.value)}
//                 />

//                 <button
//                     onClick={askQuestion}
//                     className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// }

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page