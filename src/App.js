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
import React from 'react';
import { Typography, Box } from '@mui/material';

const Placeholder = ({ title }) => {
  return (
    <Box p={4}>
      <Typography variant="h4" color="primary">
        {title} Page
      </Typography>
      <Typography variant="body1" mt={2}>
        This is a placeholder page. You can build this out later.
      </Typography>
    </Box>
  );
};

export default Placeholder;

