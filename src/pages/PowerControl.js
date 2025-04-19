import React, { useState } from 'react';
import {
  Box, Typography, Grid, Button, Paper, Table, TableHead, TableRow,
  TableCell, TableBody, MenuItem, Select, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, FormControl, InputLabel
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

export default function PowerControl() {
  const [controls, setControls] = useState([]);
  const [history, setHistory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    runTime: 'Now',
    scheduledTime: dayjs(),
    direction: 'Down',
    target: 'All',
    strategy: 'Random',
    controlTarget: 'All Target Miners',
    targetTimeValue: 5,
    targetTimeUnit: 'Minutes'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const entry = {
      ...formData,
      scheduledLabel: formData.runTime === 'Now' ? 'Now' : formData.scheduledTime.format('MMM D, YYYY, h:mm A')
    };
    setControls(prev => [...prev, entry]);
    setHistory(prev => [...prev, { ...entry, status: 'Complete', date: new Date().toLocaleString() }]);
    setModalOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Power Control</Typography>

        {/* Overview Widgets */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item><Paper sx={{ p: 2 }}>6887 / 6907<br /><small>Available Miners</small></Paper></Grid>
          <Grid item><Paper sx={{ p: 2 }}>22.282 MW<br /><small>Total Power Draw</small></Paper></Grid>
          <Grid item><Paper sx={{ p: 2 }}>$26,738.91 USD<br /><small>Power Cost (24 hrs)</small></Paper></Grid>
        </Grid>

        {/* Power Controls */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6">Power Controls</Typography>
          <Button variant="contained" onClick={() => setModalOpen(true)}>Add New</Button>
        </Grid>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Direction</TableCell>
              <TableCell>Target Miners</TableCell>
              <TableCell>Selection Strategy</TableCell>
              <TableCell>Control Target</TableCell>
              <TableCell>Target Time</TableCell>
              <TableCell>Scheduled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {controls.map((c, i) => (
              <TableRow key={i}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.direction}</TableCell>
                <TableCell>{c.target}</TableCell>
                <TableCell>{c.strategy}</TableCell>
                <TableCell>{c.controlTarget}</TableCell>
                <TableCell>{`${c.targetTimeValue} ${c.targetTimeUnit}`}</TableCell>
                <TableCell>{c.scheduledLabel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* History */}
        <Box sx={{ mt: 4 }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6">Power Controls History</Typography>
            <Button variant="outlined">Export</Button>
          </Grid>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Direction</TableCell>
                <TableCell>Control Target</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((h, i) => (
                <TableRow key={i}>
                  <TableCell>{h.name}</TableCell>
                  <TableCell>{h.date}</TableCell>
                  <TableCell>{h.direction}</TableCell>
                  <TableCell>{h.controlTarget}</TableCell>
                  <TableCell>{h.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Start Run Modal */}
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Start Run</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Name" value={formData.name} onChange={e => handleChange('name', e.target.value)} sx={{ mt: 2 }} />

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>When to Run</InputLabel>
              <Select
                value={formData.runTime}
                label="When to Run"
                onChange={e => handleChange('runTime', e.target.value)}
              >
                <MenuItem value="Now">Now</MenuItem>
                <MenuItem value="Future">In the Future</MenuItem>
              </Select>
            </FormControl>

            {formData.runTime === 'Future' && (
              <DateTimePicker
                label="Scheduled Time"
                value={formData.scheduledTime}
                onChange={(newValue) => handleChange('scheduledTime', newValue)}
                sx={{ mt: 2, width: '100%' }}
              />
            )}

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Power Direction</InputLabel>
              <Select
                value={formData.direction}
                label="Power Direction"
                onChange={e => handleChange('direction', e.target.value)}
              >
                <MenuItem value="Down">Power Down</MenuItem>
                <MenuItem value="Up">Power Up</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Target Miners</InputLabel>
              <Select
                value={formData.target}
                label="Target Miners"
                onChange={e => handleChange('target', e.target.value)}
              >
                <MenuItem value="All">All Miners</MenuItem>
                <MenuItem value="Subset">A Subset of Miners</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Miner Selection Method</InputLabel>
              <Select
                value={formData.strategy}
                label="Miner Selection Method"
                onChange={e => handleChange('strategy', e.target.value)}
              >
                <MenuItem value="Random">Random</MenuItem>
                <MenuItem value="Phase Balanced">Random (Phase Balanced)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Control Target</InputLabel>
              <Select
                value={formData.controlTarget}
                label="Control Target"
                onChange={e => handleChange('controlTarget', e.target.value)}
              >
                <MenuItem value="All Target Miners">All Target Miners</MenuItem>
                <MenuItem value="Reduce Wattage">Reduce Wattage</MenuItem>
              </Select>
            </FormControl>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  fullWidth
                  label="Target Time"
                  value={formData.targetTimeValue}
                  onChange={(e) => handleChange('targetTimeValue', e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Time Unit</InputLabel>
                  <Select
                    value={formData.targetTimeUnit}
                    label="Time Unit"
                    onChange={e => handleChange('targetTimeUnit', e.target.value)}
                  >
                    <MenuItem value="Minutes">Minutes</MenuItem>
                    <MenuItem value="Hours">Hours</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>Run Now</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
}
