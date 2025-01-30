


import React, { useState, useEffect } from "react";
import { FileImage } from "lucide-react";

const StaticAnalysis = () => {
  // State definitions
  const [image, setImage] = useState(null);
  const [saveConfig, setSaveConfig] = useState(false);
  const [isDynamicAnalysis, setIsDynamicAnalysis] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [permissions, setPermissions] = useState({
    verifyHashes: false,
    codeDuplication: false,
    cyclomaticComplexity: false,
    securityStandards: false
  });

  // Default logs
  const [logs, setLogs] = useState([
    {
      timestamp: "2024-08-26 12:45:49, 657.5305-16598",
      message: "/? D/ Downloader 2: New Request, running queue :",
      url: "https://dl.google.com/mdt/serving/rubbidium-adverices-ui-ota-starings/4625/53d07be6dd647ede9gjk64kdncb7"
    },
    {
      timestamp: "2024-08-26 12:45:49, 657.5305-16598",
      message: "/? D/ Downloader 2: New Request, running queue :",
      url: "https://dl.google.com/mdt/serving/rubbidium-adverices-ui-ota-starings/4625/53d07be6dd647ede9gjk64kdncb7"
    },
    {
      timestamp: "2024-08-26 12:45:49, 657.5305-16598",
      message: "/? D/ Downloader 2: New Request, running queue :",
      url: "https://dl.google.com/mdt/serving/rubbidium-adverices-ui-ota-starings/4625/53d07be6dd647ede9gjk64kdncb7"
    }
  ]);

  // Image upload handler
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImage(fileUrl);
    }
  };

  // Permission change handler
  const handlePermissionChange = (key) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Start analysis handler
  const startAnalysis = async () => {
    setIsDynamicAnalysis(true);
    setProgress(0);
    setError(null);
    setIsPaused(false);
    setAnalysisCompleted(false);

    const timer = setInterval(() => {
      if (!isPaused) {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setAnalysisCompleted(true);
            return 100;
          }
          return prev + 1;
        });
      }
    }, 100);

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (err) {
      setError("Analysis failed. Please try again.");
      clearInterval(timer);
    }
  };

  // Abort analysis handler
  const abortAnalysis = () => {
    setIsPaused(true);
  };

  // Resume analysis handler
  const resumeAnalysis = () => {
    setIsPaused(false);
  };

  // Dynamic Analysis View
  if (isDynamicAnalysis) {
    const activePermissions = Object.entries(permissions)
      .filter(([_, value]) => value)
      .map(([key]) => {
        const labels = {
          verifyHashes: "Verify file and code hashes",
          codeDuplication: "Code Duplication",
          cyclomaticComplexity: "Cyclomatic Complexity",
          securityStandards: "Matches Security Standards of OWASP and CVE"
        };
        return labels[key];
      });

    if (analysisCompleted) {
      return (
        <div className="flex flex-col min-h-screen p-6 shadow-lg">
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <img src="https://res.cloudinary.com/dwwbx27ts/image/upload/v1738242590/Online_report-rafiki_1_zis5mj.jpg" alt="Analysis completed" className="mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Patch Analysis completed!</h2>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full">
                View Reports
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col min-h-screen p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Static Analysis</h2>
          <div className="flex gap-4">
            <button className="text-blue-600">Detailed Status</button>
            <button className="text-blue-600">Live Log Viewer</button>
            <button className="text-blue-600">Generate Report</button>
            <button className="text-blue-600">Export Findings</button>
            <button className="text-blue-600">Summary</button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Static analysis in Progress</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0">
              <img src="https://res.cloudinary.com/dwwbx27ts/image/upload/v1738242359/Data_report-pana_1_izvdzv.jpg" alt="Analysis preview" className="rounded" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
            <span className="absolute right-0 -top-6 text-sm text-gray-600">{progress}%</span>
          </div>

          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}

          {/* Control Buttons */}
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-red-400 text-white rounded-full"
              onClick={abortAnalysis}
            >
              Abort Analysis
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-full"
              onClick={resumeAnalysis}
            >
              Resume Analysis
            </button>
          </div>
        </div>

        {/* Permissions Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Allowed Permission</h3>
          <div className="flex flex-wrap gap-4">
            {activePermissions.map((permission, index) => (
              <span key={index} className="text-sm text-gray-600">
                • {permission}
              </span>
            ))}
          </div>
        </div>

        {/* Log View */}
        <div className="bg-blue-50 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium p-4 border-b">Live Log View</h3>
          <div className="p-4">
            {logs.map((log, index) => (
              <div key={index} className="space-y-1 mb-3">
                <div className="text-gray-600 font-mono text-sm">
                  {log.timestamp} {log.message}
                </div>
                <div className="text-blue-500 font-mono text-sm hover:underline cursor-pointer">
                  {log.url}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Initial View
  return (
    <div className="flex flex-col min-h-screen shadow-lg m-6">
      <div className="mx-6 mt-6 p-10 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-900">Static Analysis</h2>
        <p className="text-sm text-gray-500">Configure how you want to check this patch</p>

        <div className="mt-6 space-y-4">
          {/* File Hash Verification */}
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={permissions.verifyHashes}
              onChange={() => handlePermissionChange('verifyHashes')}
              className="accent-blue-500"
            />
            Verify file and code hashes
          </label>

          {/* Image Upload */}
          <label
            htmlFor="image-upload"
            className="border-2 border-dashed border-blue-400 rounded-lg p-6 flex items-center justify-center gap-3 w-full cursor-pointer hover:bg-blue-50 transition"
          >
            {image ? (
              <img src={image} alt="Uploaded" className="w-40 h-28 object-cover rounded-md" />
            ) : (
              <div className="flex items-center gap-2 text-blue-600">
                <FileImage className="h-6 w-6" />
                <span>Select Golden Image of patch paoip-123. eesh.patch</span>
              </div>
            )}
          </label>
          <input
            type="file"
            id="image-upload"
            className="hidden"
            onChange={handleImageUpload}
            accept="image/*"
          />

          {/* Other Permissions */}
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={permissions.codeDuplication}
              onChange={() => handlePermissionChange('codeDuplication')}
              className="accent-green-500"
            />
            Code Duplication
          </label>

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={permissions.cyclomaticComplexity}
              onChange={() => handlePermissionChange('cyclomaticComplexity')}
              className="accent-green-500"
            />
            Cyclomatic Complexity
          </label>

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={permissions.securityStandards}
              onChange={() => handlePermissionChange('securityStandards')}
              className="accent-green-500"
            />
            Matches Security Standards of OWASP and CVE
          </label>
        </div>

        {/* Save Configuration */}
        <div className="mt-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="save-config"
            checked={saveConfig}
            onChange={(e) => setSaveConfig(e.target.checked)}
            className="accent-blue-500"
          />
          <label htmlFor="save-config" className="text-blue-600 cursor-pointer">
            Save Configuration for future analysis
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 pt-5 w-full shadow-[0_-5px_10px_rgba(0,0,0,0.1)] flex items-end justify-end">
        <div className="flex w-full gap-4 justify-end items-center relative pr-10">
          <button
            onClick={startAnalysis}
            className="mt-10 px-5 py-3 text-white rounded-3xl transition bg-gradient-to-r from-blue-500 to-indigo-600"
          >
            Dynamic Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaticAnalysis;