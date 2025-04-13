import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import {
  LineChart,
  BarChart,
} from '@mui/x-charts';

import './Dashboard.css'

const hashRateData = [
  { time: '08:00', hash: 0.4 },
  { time: '10:00', hash: 0.6 },
  { time: '12:00', hash: 0.8 },
  { time: '14:00', hash: 0.65 },
  { time: '16:00', hash: 0.9 },
  { time: '18:00', hash: 0.7 },
  { time: '20:00', hash: 0.5 },
];

const poolStats = [
  { time: '08:00', accepted: 0.5, rejected: 0.1, stale: 0.05 },
  { time: '12:00', accepted: 0.7, rejected: 0.05, stale: 0.02 },
  { time: '16:00', accepted: 0.6, rejected: 0.08, stale: 0.01 },
  { time: '20:00', accepted: 0.8, rejected: 0.03, stale: 0.02 },
];

const Dashboard = () => {
  return (
    
    <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={3} sx={{ p:2 }}>
        {/* Header boxes */}
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#121212' }}>
            <Typography variant="subtitle2" color="text.secondary">CURRENT HASH RATE</Typography>
            <Typography variant="h5" color="primary">0.00 Hs</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#121212' }}>
            <Typography variant="subtitle2" color="text.secondary">DAILY MIN HASH RATE</Typography>
            <Typography variant="h5" color="error">0.00 Hs</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#121212' }}>
            <Typography variant="subtitle2" color="text.secondary">DAILY MAX HASH RATE</Typography>
            <Typography variant="h5" sx={{ color: '#00FF00' }}>0.00 Hs</Typography>
          </Paper>
        </Grid>
        </Grid>
        <Grid container spacing={3}>
          {/* Line Chart: Hash Rate */}
          <Grid item xs={12} md={6}>
          <Box sx={{width: '100%'}}>
            <Paper sx={{ p: 2, backgroundColor: '#121212'}}>
              <Typography variant="h6" gutterBottom>
                Hash Rates
              </Typography>
              <Box sx={{width: '100%', overflow: 'auto'}}>
                <LineChart
                  height={300}
                  series={[{ data: hashRateData.map((d) => d.hash), label: 'Hash Rate' }]}
                  xAxis={[{ scaleType: 'point', data: hashRateData.map((d) => d.time) }]}
                  colors={['#FFD700']}
                />
              </Box>
            </Paper>
          </Box>
        </Grid>

          {/* Bar Chart: Pool Stats */}
          <Grid item xs={12} md={6}>
          <Box>
            <Paper sx={{ p: 2, backgroundColor: '#121212' }}>
              <Typography variant="h6" gutterBottom>
                Pool Statistics
              </Typography>
              <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <BarChart
                height={300}
                series={[
                  { data: poolStats.map(d => d.accepted), label: 'Accepted', stack: 'a', color: '#00FF00' },
                  { data: poolStats.map(d => d.rejected), label: 'Rejected', stack: 'a', color: '#FF8C00' },
                  { data: poolStats.map(d => d.stale), label: 'Stale', stack: 'a', color: '#FF0000' }
                ]}
                xAxis={[{ scaleType: 'band', data: poolStats.map(d => d.time) }]}
              />
              </Box>
            </Paper>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ pt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, backgroundColor: '#121212', height: '100%' }}>
              <Typography variant="h6" gutterBottom>Miner Status</Typography>
              <Typography color="text.secondary">There are no active miners</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, backgroundColor: '#121212', height: '100%' }}>
              <Typography variant="h6" gutterBottom>Pool Status</Typography>
              <Typography color="text.secondary">There are no active pools</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, backgroundColor: '#121212', height: '100%' }}>
              <Typography variant="h6" gutterBottom>Miner Reboots</Typography>
              <Typography sx={{ color: '#00FF00', fontSize: '1.25rem' }}>No reboots today!</Typography>
            </Paper>
          </Grid>
        </Grid>
    </Box>
  );
};

export default Dashboard;