import React, { useState } from "react";
import { FileIcon, InfoIcon, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center max-w-full mx-auto p-8 gap-8">
      {!file && (
        <img
          src="https://res.cloudinary.com/dwwbx27ts/image/upload/v1738217501/2933152_1_llimue.jpg"
          alt="Upload illustration"
          width={400}
          height={300}
          className="mb-4"
        />
      )}

      {!file && (
        <input
          type="file"
          className="hidden"
          id="file-upload"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              console.log(selectedFile.name);
              setFile(selectedFile);
            }
          }}
        />
      )}

      <label htmlFor="file-upload" className="w-full">
        {file ? (
          <div className="space-y-8 w-full">
            {/* File Display */}
            <div className="border border-dashed border-blue-400 rounded-lg p-6 flex items-center justify-center gap-3 mx-auto max-w-2xl">
              <FileIcon className="h-6 w-6 text-blue-500" />
              <span className="text-blue-500 text-lg">{file.name}</span>
            </div>

            {/* Patch Information */}
            <div className="bg-white rounded-lg p-6 shadow-md border">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">Patch Information</h2>
                <InfoIcon className="h-4 w-4 text-gray-400" />
              </div>

              {/* Custom Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-3 text-left text-gray-600">Patch Name</th>
                      <th className="border p-3 text-left text-gray-600">Patch Version</th>
                      <th className="border p-3 text-left text-gray-600">Patch Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border">
                      <td className="border p-3 text-blue-500">paoip-123.eesh.patch</td>
                      <td className="border p-3 text-blue-500">0.16.7.2.tar.bz2</td>
                      <td className="border p-3 text-blue-500">Np1-i your-patch-file.patch</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <span className="cursor-pointer w-full border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center gap-4 bg-gray-50 hover:bg-gray-100 transition">
            <Upload className="h-8 w-8 text-gray-500" />
            <p className="text-gray-500">Drag or Upload Patch File</p>
          </span>
        )}
      </label>

      {/* Action Buttons */}
      <div className="flex w-full gap-4 justify-end">
        <button
          onClick={() => navigate("/analysis/dynamic-analysis")}
          disabled={!file}
          className={`px-5 py-2 text-white rounded-3xl transition ${
            file ? "bg-red-500 hover:bg-red-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Dynamic Analysis
        </button>

        <button
          onClick={() => navigate("/analysis/static-analysis")}
          disabled={!file}
          className={`px-5 py-2 text-white rounded-3xl transition ${
            file ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Static Analysis
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
