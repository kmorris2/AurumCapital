// src/components/Layout.js
import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <Toolbar /> {/* Offset for fixed AppBar */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
