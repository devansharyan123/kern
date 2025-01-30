import React, { useState, useEffect } from 'react';

const FileTable = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from backend
  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch('your-api-endpoint/files');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFiles(data);
      setError(null);
    } catch (err) {
      setError('');
      setFiles(getDummyData());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const getDummyData = () => ([
    {
      id: 1,
      filename: 'document',
      extension: '.pdf',
      type: 'static',
      partition: 'main',
      security: 'critical',
    },
    {
      id: 2,
      filename: 'config',
      extension: '.json',
      type: 'dynamic',
      partition: 'system',
      security: 'critical',
    },
  ]);

  const handlePrint = () => {
    window.print();
  };

  const handleRefresh = () => {
    fetchFiles();
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Print-specific styles */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #file-table, #file-table * {
              visibility: visible;
            }
            #file-table {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print {
              display: none !important;
            }
            .table-scroll {
              max-height: none !important;
              overflow: visible !important;
            }
          }
        `}
      </style>

      <div id="file-table" className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md mt-10">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">File Information</h2>
            {error && <span className="text-red-500 text-sm no-print">{error}</span>}
          </div>
          <div className="flex gap-4 no-print">
            <button
              onClick={handleRefresh}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              title="Refresh data"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                />
              </svg>
              Save as PDF
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="p-6">
          <div className="border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-gray-600">Filename</th>
                  <th className="text-left p-4 font-medium text-gray-600">Extension</th>
                  <th className="text-left p-4 font-medium text-gray-600">Type</th>
                  <th className="text-left p-4 font-medium text-gray-600">Partition</th>
                  <th className="text-left p-4 font-medium text-gray-600">Security</th>
                </tr>
              </thead>
              <tbody>
                {files.map((item) => (
                  <tr 
                    key={item.id}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="p-4 w-1/5">{item.filename}</td>
                    <td className="p-4 w-1/5">{item.extension}</td>
                    <td className="p-4 w-1/5">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        item.type === 'static'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4 w-1/5">{item.partition}</td>
                    <td className="p-4 w-1/5">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        item.security === 'critical'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.security}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileTable;