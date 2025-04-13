// src/components/Sidebar.js
import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';
import WarningIcon from '@mui/icons-material/Warning';
import InsightsIcon from '@mui/icons-material/Insights';
import InventoryIcon from '@mui/icons-material/Inventory';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PoolIcon from '@mui/icons-material/Hub';
import ReportIcon from '@mui/icons-material/Assessment';
import MapIcon from '@mui/icons-material/Map';
import PowerIcon from '@mui/icons-material/FlashOn';
import SecurityIcon from '@mui/icons-material/Security';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 220;

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { label: 'Miners', icon: <StorageIcon />, path: '/miners' },
  { label: 'Issues', icon: <WarningIcon />, path: '/issues' },
  { label: 'Earnings', icon: <InsightsIcon />, path: '/earnings' },
  { label: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
  { label: 'Alerts & Triggers', icon: <NotificationsIcon />, path: '/alerts-triggers' },
  { label: 'Pools', icon: <PoolIcon />, path: '/pools' },
  { label: 'Reports', icon: <ReportIcon />, path: '/reports' },
  { label: 'Site Map', icon: <MapIcon />, path: '/site-map' },
  { label: 'Power Control', icon: <PowerIcon />, path: '/power-control' },
  { label: 'Security', icon: <SecurityIcon />, path: '/security' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1a1a1a',
          color: 'white',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navItems.map(({ label, icon, path }) => (
            <ListItemButton
              key={label}
              selected={location.pathname === path}
              onClick={() => navigate(path)}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
