import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Button,
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
  const [difficulty, setDifficulty] = useState('');
  const [networkHashrate, setNetworkHashrate] = useState('');
  const [internalHashrate, setInternalHashrate] = useState('');
  const [btcPrice, setBtcPrice] = useState('');
  const [fees, setFees] = useState('');
  const [revenue, setRevenue] = useState(null);

  const calculateRevenue = () => {
    const d = parseFloat(difficulty);
    const nHash = parseFloat(networkHashrate);
    const iHash = parseFloat(internalHashrate);
    const price = parseFloat(btcPrice);
    const f = parseFloat(fees);
    const blockReward = 6.25;

    if (!isNaN(d) && !isNaN(nHash) && !isNaN(iHash) && !isNaN(price) && !isNaN(f)) {
      const totalReward = blockReward + (f / price);
      const blocksPerDay = 144;
      const userShare = iHash / nHash;
      const dailyRevenueBTC = totalReward * blocksPerDay * userShare;
      const dailyRevenueUSD = dailyRevenueBTC * price;
      setRevenue(dailyRevenueUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    } else {
      setRevenue('Invalid input');
    }
  };

  const clearInputs = () => {
    setDifficulty('');
    setNetworkHashrate('');
    setInternalHashrate('');
    setBtcPrice('');
    setFees('');
    setRevenue(null);
  };

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

      <Grid container spacing={3} sx={{ p: 2 }}>
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

      <Grid container spacing={3} sx={{ p: 2 }}>
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

      {/* Revenue Calculator */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, backgroundColor: '#1e1e1e' }}>
            <Typography variant="h6" gutterBottom>Revenue Calculator</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2.4}>
                <TextField
                  fullWidth
                  label="Network Difficulty"
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value)}
                  InputProps={{ endAdornment: <InputAdornment position="end">T</InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <TextField
                  fullWidth
                  label="Total Hashrate"
                  value={networkHashrate}
                  onChange={e => setNetworkHashrate(e.target.value)}
                  InputProps={{ endAdornment: <InputAdornment position="end">EH/s</InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <TextField
                  fullWidth
                  label="Avg. Computer Hashrate"
                  value={internalHashrate}
                  onChange={e => setInternalHashrate(e.target.value)}
                  InputProps={{ endAdornment: <InputAdornment position="end">EH/s</InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <TextField
                  fullWidth
                  label="BTC Price"
                  value={btcPrice}
                  onChange={e => setBtcPrice(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2.4}>
                <TextField
                  fullWidth
                  label="Fees per Block"
                  value={fees}
                  onChange={e => setFees(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={calculateRevenue}>Calculate</Button>
                {revenue && (
                  <Button onClick={clearInputs} sx={{ ml: 2 }} variant="outlined">Clear</Button>
                )}
              </Grid>
              {revenue && (
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Estimated Revenue: ${revenue}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Earnings;
