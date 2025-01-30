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

function App() {
  const [count, setCount] = useState(0);

  // Define the router outside of the return block
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<Reports />} />
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
