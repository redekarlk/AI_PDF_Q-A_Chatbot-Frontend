// "use client";

// import { useState } from "react";
// import api from "../../lib/axiosInstance";
// import { useRouter } from "next/navigation";

// export default function UploadPage() {
//   const [pdf, setPdf] = useState(null);
//   const [message, setMessage] = useState("");
//   const router = useRouter();

//   const handleFileChange = (e) => {
//     setPdf(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!pdf) return alert("Please select a PDF");

//     const formData = new FormData();
//     formData.append("pdf", pdf);

//     try {
//       const res = await api.post("/api/pdf/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });

//       setMessage("Uploaded successfully!");
//       localStorage.setItem("docId", res.data.documentId);

//       router.push("/ask");
//     } catch (err) {
//       console.error(err);
//       setMessage("Upload failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center p-6">
//       <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-lg w-full max-w-md">
        
//         <h1 className="text-3xl font-bold mb-6 text-center">Upload PDF</h1>

//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileChange}
//           className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer mb-5"
//         />

//         <button
//           onClick={handleUpload}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
//         >
//           Upload
//         </button>

//         {message && (
//           <p className={`mt-4 text-center ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
