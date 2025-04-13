// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, InputBase, Paper } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search'; 

const Header = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#1a1a1a',
        borderBottom: '1px solid #2a2a2a',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Logo Circle + Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: '#FFD700', width: 32, height: 32, mr: 2 }} />
          <Typography variant="h6" noWrap component="div">
            Aurum Capital Mining
          </Typography>
        </Box>
        {/* Center: Search Bar */}
        <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 300,
            height: 36,
            px: 1.5,
            borderRadius: '20px',
            backgroundColor: '#2a2a2a',
          }}
        >
          <SearchIcon sx={{ color: '#888', mr: 1 }} />
          <InputBase
            placeholder="Search miners, issues..."
            sx={{ color: '#fff', width: '100%' }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Paper>

        {/* Right: Action Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <InfoOutlinedIcon />
          </IconButton>
          <IconButton color="inherit">
            <FilterListIcon />
          </IconButton>
          <IconButton color="inherit">
            <PersonOutlineIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
