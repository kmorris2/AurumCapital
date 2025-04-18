import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const poolData = [
  {
    id: 'ethpool',
    title: 'us1.ethermine.org:4444',
    coin: 'Ethereum [ETH]',
    shares: [
      { time: '08:00', accepted: 6200, rejected: 0, stale: 0 },
      { time: '09:00', accepted: 6300, rejected: 50, stale: 10 },
      { time: '10:00', accepted: 6000, rejected: 20, stale: 5 },
    ],
    accepted: '3,206,294,288',
    rejected: 0,
    stale: 0,
    rejectPercent: '0.00%'
  },
  {
    id: 'nicehash',
    title: 'grincuckaroo29.usa-new.nicehash...',
    coin: 'NiceHash V2 [CUCKAROOD29]',
    shares: [
      { time: '08:00', accepted: 3100, rejected: 0, stale: 0 },
      { time: '09:00', accepted: 3000, rejected: 0, stale: 0 },
      { time: '10:00', accepted: 2900, rejected: 10, stale: 5 },
    ],
    accepted: '1,603,147,145',
    rejected: 0,
    stale: 0,
    rejectPercent: '0.00%'
  },
  {
    id: 'slushpool',
    title: 'us-east.stratum.slushpool.com:3333',
    coin: 'Bitcoin [BTC]',
    shares: [
      { time: '08:00', accepted: 4100, rejected: 0, stale: 0 },
      { time: '09:00', accepted: 4200, rejected: 5, stale: 0 },
      { time: '10:00', accepted: 3900, rejected: 0, stale: 2 },
    ],
    accepted: '1,603,147,144',
    rejected: 0,
    stale: 0,
    rejectPercent: '0.00%'
  }
];

export default function Pools() {
  const [selectedPool, setSelectedPool] = useState('All');
  const [openTrustedModal, setOpenTrustedModal] = useState(false);

  const filteredPools = selectedPool === 'All' ? poolData : poolData.filter(p => p.id === selectedPool);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#fff' }}>Filter by Pool</InputLabel>
            <Select
              value={selectedPool}
              label="Filter by Pool"
              onChange={(e) => setSelectedPool(e.target.value)}
              sx={{ color: '#fff', borderColor: '#fff' }}
            >
              <MenuItem value="All">All</MenuItem>
              {poolData.map(p => (
                <MenuItem key={p.id} value={p.id}>{p.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} textAlign="right">
          <Button variant="outlined" onClick={() => setOpenTrustedModal(true)}>
            Configure Trusted Pools
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredPools.map(pool => (
          <Grid item xs={12} md={4} key={pool.id}>
            <Paper sx={{ p: 2, backgroundColor: '#121212', color: '#fff' }}>
              <Typography variant="subtitle1" gutterBottom>
                {pool.title} <small style={{ color: '#aaa' }}>{pool.coin}</small>
              </Typography>
              <BarChart
                height={200}
                series={[
                  { data: pool.shares.map(s => s.accepted), label: 'Accepted' },
                  { data: pool.shares.map(s => s.rejected), label: 'Rejected' },
                  { data: pool.shares.map(s => s.stale), label: 'Stale' }
                ]}
                xAxis={[{ data: pool.shares.map(s => s.time), scaleType: 'band' }]}
              />
              <Box mt={2}>
                <Typography>Accepted Shares: {pool.accepted}</Typography>
                <Typography>Rejected Shares: {pool.rejected}</Typography>
                <Typography>Stale Shares: {pool.stale}</Typography>
                <Typography>Reject Percentage: {pool.rejectPercent}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Trusted Pools Modal */}
      <Dialog open={openTrustedModal} onClose={() => setOpenTrustedModal(false)}>
        <DialogTitle>Trusted Pool Configuration</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Only allow miners to connect to the configured trusted pool(s) below:
          </Typography>
          <TextField fullWidth label="Pool Domain or IP" sx={{ mb: 2 }} />
          <TextField fullWidth label="Expected Worker Name" sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTrustedModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenTrustedModal(false)}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
