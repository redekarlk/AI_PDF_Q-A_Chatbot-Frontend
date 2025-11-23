"use client";

import { useState, useEffect } from "react";
import SidebarLayout from "@/components/Sidebar";
import ChatInput from "@/components/ChatInput";
import api from "@/lib/axiosInstance";
import ChatMessages from "@/components/ChatMessages";
import UploadCard from "@/components/UploadPdfCard";

export default function HomePage() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [showUploadCard, setShowUploadCard] = useState(false);


  // PDF Upload Card Component


  // Handle NEW CHAT or existing chat selection
  const loadChatForPdf = async (data) => {

    // NEW CHAT CLICKED
    if (data.newChat) {
      setChatHistory([]);
      setSelectedPdf("New Chat");
      setSelectedDocId(null);
      setShowUploadCard(true); // show upload UI
      return;
    }

    // EXISTING CHAT CLICKED
    setShowUploadCard(false);

    const { docId, title } = data;

    setSelectedPdf(title);
    setSelectedDocId(docId);

    try {
      const res = await api.get(`/api/pdf/history?docId=${docId}&limit=200`);
      setChatHistory(res.data.data);
    } catch (error) {
      console.error("Error loading chat:", error);
    }
  };


  // Handle PDF Upload
  const handlePdfUpload = async (file) => {
    const formData = new FormData();
    formData.append("pdf", file);

    const res = await api.post("/api/pdf/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    const { documentId, title } = res.data;

    // Set new chat data
    setSelectedDocId(documentId);
    setSelectedPdf(title || "New PDF");
    setChatHistory([]);
    setShowUploadCard(false);

    return res;
  };


 
  // Send message to AI
  const handleSendMessage = async (userMessage) => {
    if (!selectedDocId) {
      alert("Select or upload a PDF first!");
      return;
    }

    const tempMsg = {
      id: "temp-" + Date.now(),
      question: userMessage,
      answer: null,
      createdAt: new Date().toISOString(),
    };

    setChatHistory((prev) => [...prev, tempMsg]);

    try {
      const res = await api.post("/api/v1/query", {
        question: userMessage,
        docId: selectedDocId,
      });

      const aiMessage = {
        id: res.data.historyId || "ai-" + Date.now(),
        question: userMessage,
        answer: res.data.answer,
        createdAt: new Date().toISOString(),
      };

      setChatHistory((prev) => [...prev.slice(0, -1), aiMessage]);
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          question: userMessage,
          answer: "Error: Could not fetch response",
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };


  // UI Rendering
  return (
    <SidebarLayout onSelectHistory={loadChatForPdf} selectedPdf={selectedPdf}>
      <div className="flex flex-col h-full">

        {/* Header */}
        <h1 className="text-xl font-bold mb-4">
          {selectedPdf ? `Chat for: ${selectedPdf}` : "Select a PDF from Sidebar"}
        </h1>

        {/* If new chat → show Upload Card */}
        {showUploadCard ? (
          <UploadCard onUpload={handlePdfUpload} />
        ) : (
          <>
            {/* Messages */}
            <ChatMessages chatHistory={chatHistory} />

            {/* Input */}
            <ChatInput
              onSend={handleSendMessage}
              onFileUpload={(file) => console.log("File uploaded:", file)}
            />
          </>
        )}
      </div>
    </SidebarLayout>
  );
}
