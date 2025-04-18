import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

const defaultReport = {
  recipient: 'External Email',
  email: '',
  type: 'Profit Report',
  frequency: 'Daily',
};

export default function Reports() {
  const [reports, setReports] = useState([
    { ...defaultReport, email: 'user1@aurum-capital@gmail.com', frequency: 'Daily' },
    { ...defaultReport, email: 'user2@aurum-capital@gmail.com', frequency: 'Weekly' },
  ]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openCustomize, setOpenCustomize] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState(defaultReport);

  const [previewData] = useState({
    fiatProfit: '533.76 USD',
    btcRevenue: '0.00930825 BTC',
    powerCost: '21.82 USD',
    daily: [
      {
        date: '5/5/2021',
        fiatProfit: '5.45 USD',
        fiatRevenue: '5.45 USD',
        btcRevenue: '0.00009478',
        btcHigh: '58212.00 USD',
        btcClose: '57631.25 USD',
        powerCost: '0.00 USD',
        powerPerBTC: 'N/A',
        hashRate: '51.83 MH/s',
        totalMiners: 4,
        active: 3,
        mining: 1,
        service: '33%'
      }
      // More rows can be added...
    ]
  });

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...reports];
      updated[editIndex] = formData;
      setReports(updated);
    } else {
      setReports([...reports, formData]);
    }
    handleCloseAdd();
  };

  const handleEdit = (index) => {
    setFormData(reports[index]);
    setEditIndex(index);
    setOpenAdd(true);
  };

  const handleDelete = (index) => {
    setReports(reports.filter((_, i) => i !== index));
  };

  const handleCloseAdd = () => {
    setFormData(defaultReport);
    setEditIndex(null);
    setOpenAdd(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Email Reports</Typography>

      <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={() => setOpenCustomize(true)}>Customize Reports</Button>
        <Button variant="contained" onClick={() => setOpenAdd(true)}>Add Report</Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: '#121212', color: '#fff' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Recipient</TableCell>
              <TableCell>Report</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((r, idx) => (
              <TableRow key={idx}>
                <TableCell>{r.email}</TableCell>
                <TableCell>{r.type}</TableCell>
                <TableCell>{r.frequency}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => alert('Sending Report...')}>Send Now</Button>
                  <Button size="small" onClick={() => handleEdit(idx)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(idx)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Report Modal */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>{editIndex !== null ? 'Edit' : 'Add'} Report</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Here you can add reports that will be delivered to the recipient via email at the specified interval.
          </Typography>
          <Select fullWidth value={formData.recipient} onChange={(e) => setFormData({ ...formData, recipient: e.target.value })} sx={{ mb: 2 }}>
            <MenuItem value="External Email">External Email</MenuItem>
          </Select>
          <TextField fullWidth label="External Email Address" sx={{ mb: 2 }} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <Select fullWidth value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} sx={{ mb: 2 }}>
            <MenuItem value="Profit Report">Profit Report</MenuItem>
          </Select>
          <Select fullWidth value={formData.frequency} onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}>
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Quarterly">Quarterly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Customize Reports Modal */}
      <Dialog open={openCustomize} onClose={() => setOpenCustomize(false)}>
        <DialogTitle>Customize Reports</DialogTitle>
        <DialogContent>
          <Button variant="contained" sx={{ mb: 2 }}>Upload</Button>
          <TextField fullWidth label="Report Primary Color" sx={{ mb: 2 }} />
          <TextField fullWidth label="Report Secondary Color" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCustomize(false)}>Cancel</Button>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Report Preview */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">Sample Profit Report Preview</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={4}><Paper sx={{ p: 2 }}>{previewData.fiatProfit}<br />Fiat Revenue</Paper></Grid>
          <Grid item xs={4}><Paper sx={{ p: 2 }}>{previewData.btcRevenue}<br />BTC Revenue</Paper></Grid>
          <Grid item xs={4}><Paper sx={{ p: 2 }}>{previewData.powerCost}<br />Power Cost</Paper></Grid>
        </Grid>

        <Table sx={{ mt: 3 }}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Fiat Profit</TableCell>
              <TableCell>BTC Revenue</TableCell>
              <TableCell>BTC High</TableCell>
              <TableCell>BTC Close</TableCell>
              <TableCell>Power Cost</TableCell>
              <TableCell>Hash Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {previewData.daily.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.fiatProfit}</TableCell>
                <TableCell>{row.btcRevenue}</TableCell>
                <TableCell>{row.btcHigh}</TableCell>
                <TableCell>{row.btcClose}</TableCell>
                <TableCell>{row.powerCost}</TableCell>
                <TableCell>{row.hashRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={() => alert('Downloading CSV...')}>Download CSV</Button>
        </Box>
      </Box>
    </Box>
  );
}
