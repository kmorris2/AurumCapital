// src/pages/Earnings.js
import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import { LineChart, PieChart } from '@mui/x-charts';

const mockMinersActive = true; // Toggle to false to test empty state

const revenueData = [
  { time: '00:00', btc: 0.42, usd: 41600 },
  { time: '06:00', btc: 0.43, usd: 41800 },
  { time: '12:00', btc: 0.41, usd: 41400 },
  { time: '18:00', btc: 0.425, usd: 41550 },
];

const donutData = [
  { label: '100% Updating', value: 100 },
  { label: '0% Unknown', value: 0 },
];

const Earnings = () => {
  if (!mockMinersActive) {
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>
        <Typography variant="h6">No earnings data to display.</Typography>
        <Typography variant="body2" color="text.secondary">Please activate miners to see earnings statistics.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#121212' }}>
            <Typography variant="subtitle2" color="text.secondary">BITCOIN</Typography>
            <Typography variant="h5">97,635.90 USD</Typography>
          </Paper>
        </Grid>
    </Grid>
    <Grid container spacing={3} sx={{p:2}}>
    {/* Revenue Line Chart */}
    <Grid item xs={12}>
      <Paper sx={{ p: 3, backgroundColor: '#121212', maxWidth: 900 }}>
        <Typography variant="h6" gutterBottom>Revenue</Typography>
        <LineChart
          height={300}
          series={[{ data: revenueData.map(d => d.btc), label: 'BTC' }]}
          xAxis={[{ scaleType: 'point', data: revenueData.map(d => d.time) }]}
        />
      </Paper>
    </Grid>
  
    {/* Correlation and Revenue Accuracy as two side-by-side charts */}
    <Grid item xs={12} sm={6}>
      <Paper sx={{ p: 3, backgroundColor: '#121212', maxWidth: 900, width: '100%', mx: 'auto' }}>
        <Typography variant="h6" gutterBottom>Correlation</Typography>
        <PieChart
          height={250}
          series={[{
            innerRadius: 60,
            outerRadius: 100,
            data: donutData,
          }]}
          slotProps={{
            legend: {
              direction: 'column',
              position: { vertical: 'middle', horizontal: 'right' },
              itemGap: 16,
              markGap: 12,
              padding: 90,
            },
          }}
        />
      </Paper>
    </Grid>
  
    <Grid item xs={12} sm={6}>
      <Paper sx={{ p: 3, backgroundColor: '#121212', maxWidth: 900, width: '100%', mx: 'auto' }}>
        <Typography variant="h6" gutterBottom>Revenue Accuracy</Typography>
        <PieChart
          height={250}
          series={[{
            innerRadius: 60,
            outerRadius: 100,
            data: donutData,
          }]}
          slotProps={{
            legend: {
              direction: 'column',
              position: { vertical: 'middle', horizontal: 'right' },
              itemGap: 16,
              markGap: 12,
              padding: 90,
            },
          }}
        />
      </Paper>
    </Grid>
  </Grid>
  
        

        {/* Summary Blocks */}
        <Grid container spacing={3} sx={{p:2}}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#121212' }}>
            <Typography variant="h6">0.42577998 BTC</Typography>
            <Typography variant="caption" color="text.secondary">BTC / Day</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#121212' }}>
            <Typography variant="h6">41,633.08 USD</Typography>
            <Typography variant="caption" color="text.secondary">USD / Day</Typography>
          </Paper>
        </Grid>
        </Grid>
    </Box>
  );
};

export default Earnings;
