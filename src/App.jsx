import { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// Import the necessary components
import Layout from './layout';
import Home from './pages/home';
import Analytics from './pages/analytics';
import Reports from './pages/reports';
import Configurations from './pages/configurations';
import Inferences from './pages/inferences';
import DeviceManagement from './pages/deviceManagement';
import Dashboard from './pages/Dashboard';
import OSICM  from './pages/osicm';
import PatchAnalysis from './pages/fileUpload';
import StaticAnalysis from './pages/staticAnalysis';
import FileTable from './pages/fileTable';
function App() {
  const [count, setCount] = useState(0);

  // Define the router outside of the return block
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
          <Route path='' element={<OSICM/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/analytics/patch-analysis" element={<PatchAnalysis />} />
        <Route path="/analytics/static-analysis" element={<StaticAnalysis/>} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/file-table" element={<FileTable />} />
        <Route path="/configurations" element={<Configurations />} />
        <Route path="/inferences" element={<Inferences />} />
        <Route path="/device-management" element={<DeviceManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    )
  );

  return (
    <div>
      {/* Provide the router */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
