"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Menu, X, RefreshCw } from "lucide-react";
import api from "@/lib/axiosInstance";

export default function SidebarLayout({ children, onSelectHistory, selectedPdf }) {
  const [open, setOpen] = useState(true);
  const [historyGroups, setHistoryGroups] = useState([]); // array of { title, items }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/pdf/history");
      // defensive: ensure res.data.data exists and is an array
      const all = Array.isArray(res?.data?.data) ? res.data.data : [];

      // group by docTitle (fallback "Untitled PDF")
      const grouped = all.reduce((acc, item) => {
        const pdf = item.docTitle || "Untitled PDF";
        if (!acc[pdf]) acc[pdf] = [];
        acc[pdf].push(item);
        return acc;
      }, {});

      // transform to array for stable rendering order + easier mapping
      const groupsArr = Object.keys(grouped).map((title) => ({
        title,
        items: grouped[title].sort((a, b) => {
          // put latest first if you have timestamp (fallback to id)
          if (a.createdAt && b.createdAt) return new Date(b.createdAt) - new Date(a.createdAt);
          return (b.id || 0) - (a.id || 0);
        }),
      }));

      setHistoryGroups(groupsArr);
    } catch (err) {
      console.error("Error loading history:", err);
      setError("Failed to load history");
      setHistoryGroups([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // small helper to check selection, compatible with either title string or object
  const isSelectedPdf = useCallback(
    (title) => {
      if (!selectedPdf) return false;
      // selectedPdf might be string or object like { title: '...' }
      if (typeof selectedPdf === "string") return selectedPdf === title;
      if (selectedPdf?.title) return selectedPdf.title === title;
      return false;
    },
    [selectedPdf]
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white transition-all duration-300 
        ${open ? "w-64" : "w-20"} flex flex-col relative`}
      >
        {/* Toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle sidebar"
          className="absolute -right-3 top-4 bg-gray-800 border border-gray-700 rounded-full p-2 hover:bg-gray-700"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {/* <h2 className={`${open ? "opacity-100" : "opacity-0"} transition-all text-sm`}>
            Sidebar
          </h2> */}

         
          {/* <button
            onClick={loadHistory}
            title="Refresh history"
            className="ml-2 p-1 rounded hover:bg-gray-800"
          >
            <RefreshCw size={16} />
          </button> */}
        </div>

        {/* CONTENT */}
        <div className="p-4 flex-1 flex flex-col">
          {/* <button
            onClick={() => onSelectHistory({ newChat: true })}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg mb-4 text-sm hover:bg-blue-700 transition 
              ${open ? "opacity-100" : "opacity-0"} duration-300`}
          >
            + New Chat
          </button>

         
          <p className={`text-md mb-3 ${open ? "opacity-100" : "opacity-0"} transition-all`}>
            History
          </p> */}

          {/* HEADER ROW: History + New Chat */}
          <div
            className={`flex items-center justify-between mb-4 mt-4
  ${open ? "opacity-100" : "opacity-0"} transition-all`}
          >
            <p className="text-md font-medium">History</p>

            <button
              onClick={() => onSelectHistory({ newChat: true })}
              className="bg-blue-950 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
            >
              + New Chat
            </button>
          </div>


          {/* SCROLLABLE HISTORY LIST */}
          <div className="space-y-4 pl-3 mt-7 overflow-y-auto max-h-[75vh] pr-2 custom-scroll">
            {loading ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : error ? (
              <p className="text-red-400 text-sm">{error}</p>
            ) : historyGroups.length === 0 ? (
              <p className="text-gray-400 text-sm">No history yet. Upload a PDF to start.</p>
            ) : (
              historyGroups.map((group) => (

                <div key={group.title}>
                  {console.log(group)}
                  <p
                    onClick={() => onSelectHistory({ docId: group.items?.[0]?.docId || null, title: group.title })}
                    className={`font-semibold text-sm mb-1 cursor-pointer 
                      hover:text-blue-300
                      ${open ? "opacity-100" : "opacity-0"} 
                      transition-all
                      ${isSelectedPdf(group.title) ? "text-yellow-400" : "text-blue-400"}
                    `}
                  >
                    {group.title}
                  </p>

                  <div className="pl-3">
                    {group.items.map((item) => (
                      <p
                        key={item.id ?? item._id ?? `${group.title}-${Math.random()}`}
                        onClick={() => onSelectHistory({ docId: item.docId, title: group.title, historyId: item.id })}
                        className={`text-xs cursor-pointer hover:text-white text-gray-300 ${open ? "opacity-100" : "opacity-0"} transition-all`}
                        title={item.question}
                      >
                        • {item.question ? item.question.slice(0, 40) + (item.question.length > 40 ? "..." : "") : "(no question)"}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
