"use client";

import { useState, useEffect, useCallback } from "react";
// Assuming you have an axios instance setup in this path
import api from "../../lib/axiosInstance"; 

// --- Component: UploadPDFView ---
const UploadPDFView = ({ onUploadSuccess }) => {
    const [pdf, setPdf] = useState(null);
    const [message, setMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        setPdf(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!pdf) {
            setMessage("Please select a PDF file.");
            return;
        }
        
        setIsUploading(true);
        setMessage("Uploading...");

        const formData = new FormData();
        formData.append("pdf", pdf);

        try {
            const res = await api.post("/api/pdf/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setMessage("Uploaded successfully! You can now ask questions.");
            localStorage.setItem("docId", res.data.documentId);
            onUploadSuccess(res.data.documentId);
        } catch (err) {
            console.error(err);
            setMessage("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-6 text-center">Upload PDF</h2>
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg">
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer mb-5"
                />
                <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUploading ? "Processing..." : "Upload and Chat"}
                </button>
                {message && (
                    <p className={`mt-4 text-center ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

// --- Component: AskChatView ---
const AskChatView = ({ docId }) => {
    const [question, setQuestion] = useState("");
    const [chat, setChat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const askQuestion = async () => {
        if (!question || !docId || isLoading) return;

        const userMessage = { role: "user", text: question };
        
        // Add user message to chat immediately
        setChat((prev) => [...prev, userMessage]);
        setQuestion("");
        setIsLoading(true);

        try {
            const res = await api.post("/api/v1/query", {
                question: question,
                docId: docId,
            });

            const aiMessage = {
                role: "assistant",
                text: res.data.answer,
            };

            setChat((prev) => [...prev, aiMessage]);

        } catch (err) {
            console.error("Query failed: ", err);

            setChat((prev) => [
                ...prev,
                { role: "assistant", text: "Could not fetch answer. Try again." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Auto-scroll to the latest message
    useEffect(() => {
        const chatBox = document.getElementById("chat-box");
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [chat]);


    if (!docId) {
        return (
            <div className="p-4 text-center text-red-400">
                Please upload a PDF document first in the **Upload** tab to start asking questions.
            </div>
        );
    }

    return (
        <div className="p-4 flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4">Ask about your PDF</h2>
            
            {/* Chat Box */}
            <div id="chat-box" className="border border-gray-700 rounded-lg p-4 flex-1 overflow-y-auto mb-5 bg-gray-800 shadow-inner h-96">
                {chat.length === 0 && !isLoading && (
                    <p className="text-gray-400 text-center mt-20">Start by asking a question about your uploaded document.</p>
                )}
                {chat.map((msg, idx) => (
                    <div
                        key={idx}
                        className={
                            msg.role === "user"
                                ? "p-3 rounded-xl mb-3 text-sm w-fit max-w-[80%] bg-blue-600 text-white ml-auto break-words"
                                : "p-3 rounded-xl mb-3 text-sm w-fit max-w-[80%] bg-gray-700 text-gray-200 break-words"
                        }
                    >
                        <strong>{msg.role === "user" ? "You" : "AI"}: </strong>
                        {msg.text}
                    </div>
                ))}
                {isLoading && (
                     <div className="p-3 rounded-xl mb-3 text-sm w-fit bg-gray-700 text-gray-200">
                        <span className="animate-pulse">AI is typing...</span>
                    </div>
                )}
            </div>

            {/* Input + Send */}
            <div className="flex items-center gap-3 mt-auto">
                <input
                    className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ask your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
                    disabled={isLoading}
                />
                <button
                    onClick={askQuestion}
                    disabled={isLoading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

// --- Component: HistoryView ---
const HistoryView = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadHistory = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get("/api/pdf/history");
            setHistory(res.data.data);
        } catch (err) {
            console.error("Error loading history: ", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    if (loading)
        return (
            <div className="p-4 text-center">
                <p className="p-6 text-gray-300 text-lg animate-pulse">
                    Loading history...
                </p>
            </div>
        );

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-6">History</h2>

            {history.length === 0 && (
                <p className="text-gray-400">No previous questions found.</p>
            )}

            <div className="mt-4 space-y-4">
                {history.map((item) => (
                    <div
                        key={item.id}
                        className="border border-gray-700 bg-gray-800 p-5 rounded-xl shadow-md transition hover:bg-gray-750"
                    >
                        <p className="mb-2">
                            <strong className="text-blue-400">PDF:</strong>{" "}
                            {item.docTitle || "Unknown Document"}
                        </p>
                        <p className="mb-2">
                            <strong className="text-green-400">Question:</strong>{" "}
                            {item.question}
                        </p>
                        <p className="mb-2">
                            <strong className="text-purple-400">Answer:</strong>{" "}
                            {item.answer}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            {new Date(item.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Main Component: ChatInterface ---
export default function ChatInterface() {
    const [activeTab, setActiveTab] = useState("ask");
    const [docId, setDocId] = useState(null);

    // Load docId from localStorage on mount
    useEffect(() => {
        const storedDocId = localStorage.getItem("docId");
        if (storedDocId) {
            setDocId(storedDocId);
        }
    }, []);

    // Function to handle successful upload and switch to 'ask' tab
    const handleUploadSuccess = (newDocId) => {
        setDocId(newDocId);
        setActiveTab("ask");
    };

    const renderContent = () => {
        switch (activeTab) {
            case "upload":
                return <UploadPDFView onUploadSuccess={handleUploadSuccess} />;
            case "ask":
                return <AskChatView docId={docId} />;
            case "history":
                return <HistoryView />;
            default:
                return <AskChatView docId={docId} />;
        }
    };
    
    const tabs = [
        { id: "upload", label: "📄 Upload" },
        { id: "ask", label: "💬 Ask" },
        { id: "history", label: "📚 History" },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
            <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-xl shadow-2xl">
                <h1 className="text-4xl font-extrabold p-6 border-b border-gray-700 text-center">
                    PDF AI Chat Assistant
                </h1>

                {/* Tab Navigation */}
                <div className="flex justify-around border-b border-gray-700">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-3 px-6 text-lg font-medium transition-colors duration-200 ${
                                activeTab === tab.id
                                    ? "text-blue-400 border-b-4 border-blue-500"
                                    : "text-gray-400 hover:text-gray-200"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-4 h-[70vh] min-h-[500px]">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}