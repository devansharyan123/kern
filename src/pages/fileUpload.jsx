import React, { useState } from "react";
import { FileIcon, InfoIcon, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState(""); // Store file path
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const [isDynamicAnalysis, setIsDynamicAnalysis] = useState(false);

  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Simulating file storage and setting path (Adjust as needed for backend integration)
      const storedPath = `/uploads/${selectedFile.name}`;
      setFilePath(storedPath);
    }
  };

  // Function to send file info to backend API
  const sendFileToBackend = async () => {
    if (!filePath) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    try {
      const analysis_id = "12345"; // Static analysis ID for now
      const response = await axios.get("https://your-backend-api.com/upload", {
        params: { analysis_id, path: filePath },
      });

      console.log("File sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending file to backend:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center shadow-lg justify-center mt-5 pb-2 mx-8 rounded-lg flex-grow">
        {!file && (
          <input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={handleFileChange}
          />
        )}

        <label htmlFor="file-upload" className="w-full">
          {file ? (
            <div className="space-y-6 w-full">
              <div className="border border-dashed border-blue-400 rounded-lg p-4 flex items-center justify-center gap-3 mx-auto max-w-2xl">
                <FileIcon className="h-6 w-6 text-blue-500" />
                <span className="text-blue-500 text-lg">{file.name}</span>
              </div>
            </div>
          ) : (
            <span className="cursor-pointer w-full border-2 border-dashed border-blue-300 rounded-lg p-4 mx-4 flex flex-col items-center justify-center gap-4 bg-gray-50 hover:bg-gray-100 transition">
              <Upload className="h-8 w-5 text-gray-500" />
              <p className="text-blue-500">Drag or Upload Patch File</p>
            </span>
          )}
        </label>
      </div>

      <div className="mt-10 pt-5 pb-8 w-full shadow-[0_-5px_10px_rgba(0,0,0,0.1)] flex items-end justify-end">
        <div className="flex w-full gap-4 justify-end relative pr-10">
          <button
            onClick={sendFileToBackend}
            className="px-5 py-3 text-white rounded-3xl transition bg-blue-500 hover:bg-blue-500"
          >
            static analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;