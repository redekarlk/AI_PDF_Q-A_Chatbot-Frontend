"use client";
import { useState, useRef } from "react";
import { UploadCloud, File as FileIcon, Loader2 } from "lucide-react";

const UploadCard = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const MAX_SIZE_MB = 15;

  const handleUploadClick = async () => {
    if (!file || uploading) return;

    // file size validation
    if (file.size / 1024 / 1024 > MAX_SIZE_MB) {
      setMessage(`File size exceeds ${MAX_SIZE_MB}MB`);
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      await onUpload(file);
      setMessage("Uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];

    if (!droppedFile) return;

    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "image/png",
      "image/jpeg",
      "image/jpg"
    ];

    if (!validTypes.includes(droppedFile.type)) {
      setMessage("Please upload a valid PDF, Word, Text, or Image file.");
      return;
    }

    if (droppedFile.size / 1024 / 1024 > MAX_SIZE_MB) {
      setMessage(`File size exceeds ${MAX_SIZE_MB}MB`);
      return;
    }

    setFile(droppedFile);
    setMessage("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!uploading) setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  return (
    <div className="bg-gray-900/20 backdrop-blur-xl border border-gray-800 p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-xl mx-auto mt-6 mb-6 transition-all duration-300">

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
        Upload Document
      </h1>

      {/* Upload Box */}
      <div
        onClick={() => !uploading && inputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-6 md:p-10 cursor-pointer transition-all duration-300
          ${dragActive ? "border-blue-500 bg-blue-500/10" : "border-gray-700 hover:border-gray-500"}
          ${uploading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <div className="flex flex-col items-center text-center">

          {/* Icon */}
          {!uploading ? (
            <UploadCloud size={48} className="text-gray-400 mb-4" />
          ) : (
            <Loader2 size={48} className="text-blue-400 animate-spin mb-4" />
          )}

          {/* Text */}
          {!uploading ? (
            <p className="text-gray-300 text-base md:text-lg">
              Drag & Drop PDF, Word, Text, or Image<br />
              <span className="text-gray-500 text-sm">or click to browse</span>
            </p>
          ) : (
            <p className="text-blue-400 text-lg animate-pulse">
              Uploading…
            </p>
          )}

          {/* File Preview */}
          {file && !uploading && (
            <div className="mt-4 flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 max-w-full">
              <FileIcon size={18} className="text-blue-400" />
              <span className="text-gray-200 text-sm truncate w-40 md:w-auto">
                {file.name}
              </span>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          disabled={uploading}
          accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
          onChange={(e) => {
            const selected = e.target.files[0];

            if (!selected) return;
            
            const validTypes = [
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "text/plain",
              "image/png",
              "image/jpeg",
              "image/jpg"
            ];

            if (!validTypes.includes(selected.type)) {
              setMessage("Please upload a valid PDF, Word, Text, or Image file.");
              return;
            }
            
            if (selected.size / 1024 / 1024 > MAX_SIZE_MB) {
              setMessage(`File size exceeds ${MAX_SIZE_MB}MB.`);
              return;
            }

            setFile(selected);
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
            ? "bg-gray-700/10 cursor-not-allowed"
            : "bg-gray-700 hover:bg-gray-800"}
        `}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 size={22} className="animate-spin" />
            Uploading…
          </div>
        ) : (
          "Upload Document"
        )}
      </button>

      {/* Message */}
      {message && (
        <p
          className={`mt-4 text-center text-base md:text-lg ${
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
