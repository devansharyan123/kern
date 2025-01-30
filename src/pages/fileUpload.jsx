import React, { useState } from "react";
import { FileIcon, InfoIcon, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const [isDynamicAnalysis, setIsDynamicAnalysis] = useState(false);

  const handleButtonClick = (e) => {
    if (!isDynamicAnalysis) {
      setIsDynamicAnalysis(true);
      setTimeout(() => {
        setIsDynamicAnalysis(false);
      }, 2000);
    }

    // Hide the notification after 2 seconds

  };

  // Function to handle button click
  const handleClick = (path) => {
    if (!file) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); // Hide after 3 sec
      return;
    }
    navigate(path);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Upload Section */}
      <div className="flex flex-col items-center shadow-lg justify-center mt-8 pb-2   mx-8 rounded-lg  flex-grow">
        {!file && (
          <img
            src="https://res.cloudinary.com/dwwbx27ts/image/upload/v1738217501/2933152_1_llimue.jpg"
            alt="Upload illustration"
            width={500}
            height={400}
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
              <div className="border border-dashed border-blue-400 rounded-lg p-4  flex items-center justify-center gap-3 mx-auto max-w-2xl">
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
                        <th className="border p-3 text-left text-gray-600">
                          Patch Name
                        </th>
                        <th className="border p-3 text-left text-gray-600">
                          Patch Version
                        </th>
                        <th className="border p-3 text-left text-gray-600">
                          Patch Source
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border">
                        <td className="border p-3 text-blue-500">
                          paoip-123.eesh.patch
                        </td>
                        <td className="border p-3 text-blue-500">
                          0.16.7.2.tar.bz2
                        </td>
                        <td className="border p-3 text-blue-500">
                          Np1-i your-patch-file.patch
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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

      {/* Bottom Action Buttons with Top Shadow */}
      <div className="mt-10 pt-5 pb-8 w-full shadow-[0_-5px_10px_rgba(0,0,0,0.1)] flex items-end justify-end">
        <div className="flex w-full gap-4 justify-end relative pr-10">
          {/* Buttons */}

          <div className="flex  items-center gap-2">
            {isDynamicAnalysis && (
              <div className=" absolute -top-10 bg-gray-800 text-white text-sm py-2 px-4 rounded-lg shadow-lg animate-fade-in">
                Work in Progress...
              </div>
            )}
            <button
              onClick={handleButtonClick}
              className="px-5 py-3 text-white rounded-3xl transition bg-red-500 hover:bg-red-600"
            >
              Dynamic Analysis
            </button>
            </div >





            <button
              onClick={() => handleClick("/analytics/static-analysis")}
              className="px-5 py-3 text-white rounded-3xl transition bg-blue-700 hover:bg-blue-800"
            >
              Static Analysis
            </button>

            {/* Notification Pop-up */}
            {showNotification && (
              <div className="absolute -top-10 right-0 bg-gray-800 text-white text-sm py-2 px-4 rounded-lg shadow-lg animate-fade-in">
                Please upload a file first!
              </div>
            )}


          </div>
        </div>

      </div>
      );
};

      export default FileUpload;
