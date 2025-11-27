// "use client";

// import { useEffect, useState } from "react";
// import api from "../../lib/axiosInstance";

// export default function HistoryPage() {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadHistory = async () => {
//     try {
//       const res = await api.get("/api/pdf/history");
//       setHistory(res.data.data);
//     } catch (err) {
//       console.error("Error loading history: ", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadHistory();
//   }, []);

//   if (loading)
//     return (
//       <p className="p-6 text-gray-300 text-lg animate-pulse">
//         Loading...
//       </p>
//     );

//   return (
//     <div className="p-6 max-w-3xl mx-auto text-gray-200 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">History</h1>

//       {history.length === 0 && (
//         <p className="text-gray-400">No previous questions found</p>
//       )}

//       <div className="mt-4 space-y-4">
//         {history.map((item) => (
//           <div
//             key={item.id}
//             className="border border-gray-700 bg-gray-800 p-5 rounded-xl shadow-md transition hover:bg-gray-750"
//           >
//             <p className="mb-2">
//               <strong className="text-blue-400">PDF:</strong>{" "}
//               {item.docTitle || "Unknown Document"}
//             </p>

//             <p className="mb-2">
//               <strong className="text-green-400">Question:</strong>{" "}
//               {item.question}
//             </p>

//             <p className="mb-2">
//               <strong className="text-purple-400">Answer:</strong>{" "}
//               {item.answer}
//             </p>

//             <p className="text-xs text-gray-500 mt-2">
//               {new Date(item.createdAt).toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page