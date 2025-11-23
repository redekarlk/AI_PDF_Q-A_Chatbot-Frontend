// "use client";
// import { useState, useRef } from "react";
// import { Paperclip, Send } from "lucide-react";

// export default function ChatInput({ onSend, onFileUpload }) {
//   const [message, setMessage] = useState("");
//   const fileInputRef = useRef(null);

//   const handleSend = () => {
//     if (!message.trim()) return;
//     onSend(message);
//     setMessage("");
//   };

//   const handleKeyDown = (e) => {
//     // Send on Enter
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && onFileUpload) {
//       onFileUpload(file);
//     }
//   };

//   return (
//     <div className="w-full p-4 border-t bg-gray-900 flex items-center gap-3">

//       {/* Upload file button */}
//       {/* <button
//         onClick={() => fileInputRef.current.click()}
//         className="p-2 rounded-lg hover:bg-gray-800 transition text-gray-300"
//         title="Upload File"
//       >
//         <Paperclip size={22} />
//       </button> */}

//       {/* Hidden file input */}
//       {/* <input
//         type="file"
//         ref={fileInputRef}
//         className="hidden"
//         accept=".pdf,.png,.jpg,.jpeg"
//         onChange={handleFileChange}
//       /> */}

//       {/* Textarea input */}
//       <textarea
//         placeholder="Type a message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyDown={handleKeyDown}
//         rows={1}
//         className="flex-1 resize-none  text-gray-100 border border-gray-700 rounded-xl px-4 py-3 
//         focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//         style={{ maxHeight: "150px" }}
//       />

//       {/* Send button */}
//       <button
//         onClick={handleSend}
//         disabled={!message.trim()}
//         className={`p-3 rounded-lg transition flex items-center justify-center
//           ${message.trim()
//             ? "bg-blue-600 hover:bg-blue-700 text-white"
//             : "bg-gray-700 text-gray-400 cursor-not-allowed"}
//         `}
//         title="Send"
//       >
//         <Send size={20} />
//       </button>
//     </div>
//   );
// }




"use client";
import { useState, useRef } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend }) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) return;
        onSend(message);
        setMessage("");
    };

    const handleKeyDown = (e) => {
        // Send on Enter
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="w-full px-4 py-4 bg-transparent backdrop-blur-xl border-t border-gray-800 flex items-center gap-3">

            {/* Textarea */}
            {/* <textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        className="
          flex-1 resize-none text-gray-100 
          bg-white/5 backdrop-blur-xl 
          border border-gray-700/50 rounded-2xl px-4 py-3 
          focus:outline-none focus:ring-2 focus:ring-blue-500/50 
          transition shadow-lg shadow-black/20
        "
        style={{ maxHeight: "150px" }}
      /> */}

            <textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                className="flex-1 resize-none text-gray-100  backdrop-blur-xl border border-gray-700/50 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition shadow-lg shadow-black/20"
                style={{ maxHeight: "150px" }}
            />


            {/* Send button */}
            <button
                onClick={handleSend}
                disabled={!message.trim()}
                className={`
          p-3 rounded-xl transition flex items-center justify-center shadow-md backdrop-blur-xl
          ${message.trim()
                        ? "bg-blue-600/80 hover:bg-blue-700 text-white shadow-blue-800/40"
                        : "bg-gray-700/30 text-gray-400 cursor-not-allowed"}
        `}
                title="Send"
            >
                <Send size={20} />
            </button>
        </div>
    );
}
