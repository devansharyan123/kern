import React, { useState } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Search, Plus, Settings, Download, MoreHorizontal } from 'lucide-react';

const AnalysisDashboard = ({ data = null }) => {
  // Default values
  const defaultData = {
    totalAnalysis: {
      count: 281,
      growth: 43,
      trend: Array(7).fill().map((_, i) => ({ value: 200 + Math.random() * 100 }))
    },
    vulnerabilities: {
      count: 312,
      growth: 19,
      trend: Array(7).fill().map((_, i) => ({ value: 250 + Math.random() * 100 }))
    },
    analysisOverview: [
      { name: 'Un-Secured Patches', value: 140, color: '#2563eb' },
      { name: 'Integrity Failure', value: 92, color: '#8b5cf6' },
      { name: 'Integrity Intact', value: 24, color: '#f43f5e' }
    ],
    integrityFailure: [
      { name: 'Google Pixel-7a', value: 17, color: '#8b5cf6' },
      { name: 'Redmi 9', value: 17, color: '#a78bfa' },
      { name: 'Samsung S21', value: 18, color: '#f43f5e' }
    ],
    devicesList: [
      {
        id: 1,
        patchName: 'Google CVE 12',
        impactScore: '358975996162015',
        status: 'Running',
        severity: 'Patch Analysis',
        testerName: 'Aditya',
        patchVersion: '2023 - v12',
        createdDate: '10 May 2024'
      },
      // Add more default items as needed
    ]
  };

  // Use provided data or fall back to default data
  const activeData = data || defaultData;
  const [sortConfig, setSortConfig] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sort function for the table
  const sortData = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    });
  };

  // Render stat card with chart
  const StatCard = ({ title, count, growth, trend, chartColor }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Settings className="w-5 h-5 text-blue-600" />
        </div>
        <span className="text-gray-600 font-medium">{title}</span>
      </div>
      <div className="mb-4">
        <span className="text-4xl font-bold">{count}</span>
        <span className="ml-2 text-sm text-green-500">↑{growth}%</span>
        <div className="text-sm text-gray-500">vs last 7 days</div>
      </div>
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={chartColor} 
              strokeWidth={2} 
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  // Render donut chart
  const DonutChart = ({ data, title, totalLabel }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Settings className="w-5 h-5 text-blue-600" />
        </div>
        <span className="text-gray-600 font-medium">{title}</span>
      </div>
      <div className="h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-2xl font-bold">{totalLabel}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
            <span className="text-sm font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Analysis Performed"
          count={activeData.totalAnalysis.count}
          growth={activeData.totalAnalysis.growth}
          trend={activeData.totalAnalysis.trend}
          chartColor="#22c55e"
        />
        <StatCard 
          title="Vulnerabilities Found"
          count={activeData.vulnerabilities.count}
          growth={activeData.vulnerabilities.growth}
          trend={activeData.vulnerabilities.trend}
          chartColor="#ef4444"
        />
        <DonutChart 
          data={activeData.analysisOverview}
          title="Analysis Overview"
          totalLabel="312"
        />
        <DonutChart 
          data={activeData.integrityFailure}
          title="Integrity Failure"
          totalLabel="52"
        />
      </div>

      {/* Devices Table Section */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Devices</h2>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                Recently Tested ↓
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search this list"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Analysis
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                Change Status
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                <Download className="w-4 h-4" />
                Import
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">S.no</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Patch Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Impact Score</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Severity</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tester Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Patch Version</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Created Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activeData.devicesList.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{device.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{device.patchName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{device.impactScore}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      device.status === 'Running' ? 'bg-green-100 text-green-800' :
                      device.status === 'Failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{device.severity}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{device.testerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{device.patchVersion}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{device.createdDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;