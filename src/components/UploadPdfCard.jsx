// import { useState } from "react";

// const UploadCard = ({ onUpload }) => {
//     const [file, setFile] = useState(null);
//     const [message, setMessage] = useState("");

//     const handleUploadClick = async () => {
//         if (!file) return alert("Please select a PDF");

//         try {
//             await onUpload(file);
//             setMessage("Uploaded successfully!");
//         } catch (err) {
//             console.error(err);
//             setMessage("Upload failed");
//         }
//     };

//     return (
//         <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-lg w-full max-w-md mx-auto mt-10">
//             <h1 className="text-2xl font-bold mb-6 text-center text-white">
//                 Upload PDF
//             </h1>

//             <input
//                 type="file"
//                 accept="application/pdf"
//                 onChange={(e) => setFile(e.target.files[0])}
//                 className="block w-full text-sm text-gray-300 
//           file:mr-4 file:py-2 file:px-4 
//           file:rounded-lg file:border-0 
//           file:text-sm file:font-semibold 
//           file:bg-blue-600 file:text-white 
//           hover:file:bg-blue-700 
//           cursor-pointer mb-5"
//             />

//             <button
//                 onClick={handleUploadClick}
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
//             >
//                 Upload
//             </button>

//             {message && (
//                 <p
//                     className={`mt-4 text-center ${message.includes("success") ? "text-green-400" : "text-red-400"
//                         }`}
//                 >
//                     {message}
//                 </p>
//             )}
//         </div>
//     );
// };

// export default UploadCard;



import { useState, useRef } from "react";
import { UploadCloud, File as FileIcon, Loader2 } from "lucide-react";

const UploadCard = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false); // ⬅ NEW
  const inputRef = useRef(null);

  const handleUploadClick = async () => {
    if (!file || uploading) return;

    setUploading(true); // ⬅ Start animation
    setMessage("");

    try {
      await onUpload(file); // wait for API
      setMessage("Uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    } finally {
      setUploading(false); // ⬅ stop animation
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!uploading) setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
      setMessage("");
    } else {
      setMessage("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="bg-gray-900 bg-opacity-60 backdrop-blur-xl border border-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-xl mx-auto mt-10 transition-all duration-300">

      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-100">
        Upload PDF
      </h1>

      {/* Upload Zone */}
      <div
        onClick={() => !uploading && inputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all duration-300 
          ${dragActive ? "border-blue-500 bg-blue-500/10" : "border-gray-700 hover:border-gray-600"}
          ${uploading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <div className="flex flex-col items-center text-center">

          {/* ICON */}
          {!uploading ? (
            <UploadCloud size={50} className="text-gray-400 mb-4" />
          ) : (
            <Loader2 size={50} className="text-blue-400 animate-spin mb-4" />
          )}

          {/* TEXT */}
          {!uploading ? (
            <p className="text-gray-300 text-lg">
              Drag & Drop your PDF here <br />
              <span className="text-gray-500 text-sm">or click to browse</span>
            </p>
          ) : (
            <p className="text-blue-400 text-lg animate-pulse">
              Uploading…
            </p>
          )}

          {/* File Selected */}
          {file && !uploading && (
            <div className="mt-4 flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
              <FileIcon size={18} className="text-blue-400" />
              <span className="text-gray-200 text-sm">{file.name}</span>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          disabled={uploading}
          onChange={(e) => {
            setFile(e.target.files[0]);
            setMessage("");
          }}
          className="hidden"
        />
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUploadClick}
        disabled={!file || uploading}
        className={`w-full mt-6 py-3 rounded-xl text-white font-semibold text-lg transition-all shadow-lg
          ${!file || uploading 
            ? "bg-gray-700 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-700"}
        `}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={22} />
            Uploading…
          </div>
        ) : (
          "Upload PDF"
        )}
      </button>

      {/* Message */}
      {message && (
        <p
          className={`mt-4 text-center text-lg ${
            message.includes("success") ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default UploadCard;
