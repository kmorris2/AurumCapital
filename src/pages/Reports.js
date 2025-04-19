import React, { useState } from 'react';
import {
  Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const initialReports = [
  { id: 1, email: 'user1@aurumcapital@gmail.com', type: 'Profit Report', frequency: 'Daily' },
  { id: 2, email: 'user2@aurumcaptial@gmail.com', type: 'Profit Report', frequency: 'Weekly' },
];

const sampleData = {
  columns: ['5/5/2021', '5/6/2021', '5/7/2021', '5/8/2021', '5/9/2021', '5/10/2021', '5/11/2021'],
  fiatProfit: [5.45, 0.00, 14.45, 92.45, 93.97, 119.67, 185.95],
  powerCost: [0, 0, 0.92, 4.05, 5.62, 5.62, 5.62]
};

export default function Reports() {
  const [reports, setReports] = useState(initialReports);
  const [openAdd, setOpenAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ email: '', type: 'Profit Report', frequency: 'Daily' });
  const [openPreview, setOpenPreview] = useState(false);

  const handleOpenEdit = (report) => {
    setForm(report);
    setEditing(report.id);
    setOpenAdd(true);
  };

  const handleSave = () => {
    if (editing) {
      setReports(prev => prev.map(r => r.id === editing ? { ...form, id: editing } : r));
    } else {
      setReports(prev => [...prev, { ...form, id: Date.now() }]);
    }
    setOpenAdd(false);
    setForm({ email: '', type: 'Profit Report', frequency: 'Daily' });
    setEditing(null);
  };

  const handleDelete = (id) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Email Reports</Typography>

      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <Button variant="contained" onClick={() => setOpenAdd(true)}>Add Report</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => setOpenPreview(true)}>Preview Report</Button>
        </Grid>
      </Grid>

      <Paper sx={{ overflowX: 'auto', mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Recipient</TableCell>
              <TableCell>Report</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.email}</TableCell>
                <TableCell>{r.type}</TableCell>
                <TableCell>{r.frequency}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => setOpenPreview(true)}>Send Now</Button>
                  <Button onClick={() => handleOpenEdit(r)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(r.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>{editing ? 'Edit Report' : 'Add Report'}</DialogTitle>
        <DialogContent>
          <Select
            fullWidth
            sx={{ my: 1 }}
            value={form.recipient || 'External Email'}
            onChange={() => { }}
            disabled
          >
            <MenuItem value="External Email">External Email</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="External Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            sx={{ my: 1 }}
          />
          <Select
            fullWidth
            sx={{ my: 1 }}
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <MenuItem value="Profit Report">Profit Report</MenuItem>
            <MenuItem value="Power Report">Power Report</MenuItem>
            <MenuItem value="Pool Audit Report">Pool Audit Report</MenuItem>
          </Select>
          <Select
            fullWidth
            sx={{ my: 1 }}
            value={form.frequency}
            onChange={(e) => setForm({ ...form, frequency: e.target.value })}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Report Preview Dialog */}
      <Dialog open={openPreview} onClose={() => setOpenPreview(false)} maxWidth="md" fullWidth>
        <DialogTitle>Sample Profit Report</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Last 7 Day Totals</Typography>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={4}><Paper sx={{ p: 2, textAlign: 'center' }}><strong>533.76 USD</strong><br />Fiat Revenue</Paper></Grid>
            <Grid item xs={4}><Paper sx={{ p: 2, textAlign: 'center' }}><strong>0.00930825 BTC</strong><br />BTC Revenue</Paper></Grid>
            <Grid item xs={4}><Paper sx={{ p: 2, textAlign: 'center' }}><strong>21.82 USD</strong><br />Power Cost</Paper></Grid>
          </Grid>
          <BarChart
            height={250}
            series={[
              { data: sampleData.fiatProfit, label: 'Fiat Profit' },
              { data: sampleData.powerCost, label: 'Power Cost' },
            ]}
            xAxis={[{ data: sampleData.columns, scaleType: 'band', label: 'Date'}]}
            yAxis={[{ label: 'USD' }]}
            sx={{
                '& tspan': {
                  dy: '-10px', // manually shift up the axis label
                }
              }}
          />

          <Button sx={{ mt: 2 }} variant="outlined">Download CSV</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPreview(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
