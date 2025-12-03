"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import api from "@/lib/axiosInstance";
import { useAuth } from "@/context/AuthContext";

export default function SidebarLayout({ children, onSelectHistory, selectedPdf, refreshTrigger }) {
  const { user } = useAuth();

  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [historyGroups, setHistoryGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load History Hook
  const loadHistory = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);

    try {
      const res = await api.get("/api/pdf/history");
      const all = Array.isArray(res?.data?.data) ? res.data.data : [];

      const grouped = all.reduce((acc, item) => {
        const pdf = item.docTitle || "Untitled PDF";
        if (!acc[pdf]) acc[pdf] = [];
        acc[pdf].push(item);
        return acc;
      }, {});

      const groupsArr = Object.keys(grouped).map((title) => ({
        title,
        items: grouped[title].sort((a, b) =>
          a.createdAt && b.createdAt
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : (b.id || 0) - (a.id || 0)
        ),
      }));

      // Sort groups so the one with the most recent message is at the top
      groupsArr.sort((a, b) => {
        const dateA = a.items[0]?.createdAt ? new Date(a.items[0].createdAt) : 0;
        const dateB = b.items[0]?.createdAt ? new Date(b.items[0].createdAt) : 0;
        return dateB - dateA;
      });

      setHistoryGroups(groupsArr);
    } catch (err) {
      setError("Failed to load history");
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    // If refreshTrigger > 0, it's a background update (silent)
    loadHistory(refreshTrigger > 0);
  }, [loadHistory, refreshTrigger]);

  // MUST BE AFTER HOOKS
  if (!user) {
    return (
      <p className="text-gray-300 text-center p-6 animate-pulse">
        Loading...
      </p>
    );
  }

  const isSelectedPdf = (title) =>
    selectedPdf && (selectedPdf === title || selectedPdf?.title === title);

  return (
    <div className="flex h-screen relative">

      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setMobileOpen((v) => !v)}
        className={`sm:hidden fixed top-4 z-50 bg-gray-900 text-white p-3 rounded-full shadow-lg transition-all
        ${mobileOpen ? "left-56" : "left-4"}`}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

  
          {/* DESKTOP SIDEBAR */}
      <div
        className={`hidden sm:flex flex-col bg-gray-900 text-white h-full border-r border-gray-800 shadow-xl 
        transition-all duration-300 ${open ? "w-64" : "w-16"}`}
      >
        <div className="p-4 border-b border-gray-700">
          <h2 className={`${open ? "opacity-100" : "opacity-0"} transition-all text-sm`}>
            {user?.name}
          </h2>
        </div>

        <div className="p-4 flex-1 overflow-y-auto custom-scroll">
      

          <div
            className={`
    flex items-center justify-between mb-4 
    ${open ? "opacity-100" : "opacity-0"} transition-all
  `}
          >
            <p className="text-lg font-medium">History</p>

            <button
              onClick={() => onSelectHistory({ newChat: true })}
              className="bg-gray-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition"
            >
              + New Chat
            </button>
          </div>


          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-300 text-sm">Loading...</p>
            ) : error ? (
              <p className="text-red-400 text-sm">{error}</p>
            ) : historyGroups.length === 0 ? (
              <p className="text-gray-300 text-sm">No history yet.</p>
            ) : (
              historyGroups.map((group) => (
                <div key={group.title}>
                  <p
                    onClick={() =>
                      onSelectHistory({
                        docId: group.items?.[0]?.docId,
                        title: group.title,
                      })
                    }
                    className={`cursor-pointer mb-1 text-sm font-semibold 
                    hover:text-blue-300 transition
                    ${isSelectedPdf(group.title) ? "text-yellow-300" : "text-blue-400"}
                    ${open ? "opacity-100" : "opacity-0"}`}
                  >
                    {group.title}
                  </p>

                  <div className="pl-3">
                    {group.items.map((item) => (
                      <p
                        key={item.id}
                        onClick={() =>
                          onSelectHistory({
                            docId: item.docId,
                            historyId: item.id,
                            title: group.title,
                          })
                        }
                        className={`cursor-pointer text-xs text-gray-300 hover:text-white transition
                        ${open ? "opacity-100" : "opacity-0"}`}
                      >
                        • {item.question?.slice(0, 40) ?? "(no question)"}
                        {item.question?.length > 40 && "..."}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

          {/* MOBILE SIDEBAR */}
      <div
        className={`sm:hidden fixed top-0 left-0 z-40 h-full w-64 
        bg-gray-900 text-white shadow-xl border-r border-gray-800
        transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-sm">{user.name}</h2>
        </div>

        <div className="p-4 overflow-y-auto custom-scroll">

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">History</h2>

            <button
              onClick={() => {
                onSelectHistory({ newChat: true });
                setMobileOpen(false);
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              + New Chat
            </button>
          </div>


          <div className="space-y-4">
            {historyGroups.map((group) => (
              <div key={group.title}>
                <p
                  onClick={() => {
                    onSelectHistory({
                      docId: group.items[0].docId,
                      title: group.title,
                    });
                    setMobileOpen(false);
                  }}
                  className={`cursor-pointer mb-1 text-sm font-semibold
                  ${isSelectedPdf(group.title) ? "text-yellow-300" : "text-blue-400"}`}
                >
                  {group.title}
                </p>

                <div className="pl-3">
                  {group.items.map((item) => (
                    <p
                      key={item.id}
                      onClick={() => {
                        onSelectHistory({
                          docId: item.docId,
                          historyId: item.id,
                          title: group.title,
                        });
                        setMobileOpen(false);
                      }}
                      className="cursor-pointer text-xs text-gray-300 hover:text-white"
                    >
                      • {item.question?.slice(0, 40)}
                      {item.question?.length > 40 && "..."}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

          {/* MAIN CONTENT */}
      <div className="flex-1 p-3 sm:p-6 overflow-hidden pt-16 sm:pt-6">
        {children}
      </div>
    </div>
  );
}
