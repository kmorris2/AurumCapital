// App.js
// import React from 'react';
// import { Button, Grid } from '@mui/material';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import theme from './theme/theme';
// import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import Miners from './pages/Miners';
// import Issues from './pages/Issues';
// import Earnings from './pages/Earnings';
// import Inventory from './pages/Inventory';
// import AlertsTriggers from './pages/AlertsTriggers';
// import Pools from './pages/Pools';
// import Reports from './pages/Reports';
// import SiteMap from './pages/SiteMap';
// import PowerControl from './pages/PowerControl';
// import Security from './pages/Security';

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <Sidebar />
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/miners" element={<Miners />} />
//           <Route path="/issues" element={<Issues />} />
//           <Route path="/earnings" element={<Earnings />} />
//           <Route path="/inventory" element={<Inventory />} />
//           <Route path="/alerts-triggers" element={<AlertsTriggers />} />
//           <Route path="/pools" element={<Pools />} />
//           <Route path="/reports" element={<Reports />} />
//           <Route path="/site-map" element={<SiteMap />} />
//           <Route path="/power-control" element={<PowerControl />} />
//           <Route path="/security" element={<Security />} />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;

// src/pages/Placeholder.js

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import Placeholder from './pages/Placeholder';
import Dashboard from './pages/Dashboard';
import Miners from './pages/Miners';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard title="Dashboard" />} />
            <Route path="/miners" element={<Miners title="Miners" />} />
            <Route path="/issues" element={<Placeholder title="Issues" />} />
            <Route path="/earnings" element={<Placeholder title="Earnings" />} />
            <Route path="/inventory" element={<Placeholder title="Inventory" />} />
            <Route path="/alerts-triggers" element={<Placeholder title="Alerts & Triggers" />} />
            <Route path="/pools" element={<Placeholder title="Pools" />} />
            <Route path="/reports" element={<Placeholder title="Reports" />} />
            <Route path="/site-map" element={<Placeholder title="Site Map" />} />
            <Route path="/power-control" element={<Placeholder title="Power Control" />} />
            <Route path="/security" element={<Placeholder title="Security" />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
