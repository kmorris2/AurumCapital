import React, { useState } from 'react';
import {
  Box, Typography, Grid, Select, MenuItem, Button, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, Paper
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Papa from 'papaparse';

const getColor = (status) => {
  switch (status.toLowerCase()) {
    case 'ok':
    case 'healthy': return '#00cc44';
    case 'warning': return '#ffcc00';
    case 'overheat':
    case 'danger': return '#ff3300';
    case 'disabled': return '#999999';
    default: return '#cccccc';
  }
};

export default function SiteMap() {
  const [expandedRack, setExpandedRack] = useState(null);
  const [infraFilter, setInfraFilter] = useState('All');
  const [phaseFilter, setPhaseFilter] = useState('All');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [miners, setMiners] = useState([]);

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const formatted = results.data.map(row => ({
          rack: row.Rack.toLowerCase(),
          row: parseInt(row.Row, 10),
          col: parseInt(row.Column, 10),
          ip: row['Miner IP'],
          temp: parseInt(row.Temperature, 10),
          status: row.Status,
          hashrate: row.Hashrate,
          phase: row.Phase || '1'
        }));
        setMiners(formatted);
      }
    });
  };

  const racks = [...new Set(miners.map(m => m.rack))];
  const filteredRacks = racks.filter(rack =>
    miners.some(m =>
      (infraFilter === 'All' || m.rack === infraFilter) &&
      (phaseFilter === 'All' || m.phase === phaseFilter) &&
      m.rack === rack
    )
  );

  const filteredMiners = miners.filter(m =>
    (infraFilter === 'All' || m.rack === infraFilter) &&
    (phaseFilter === 'All' || m.phase === phaseFilter)
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Site Map</Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item>
          <Select value={infraFilter} onChange={e => setInfraFilter(e.target.value)}>
            <MenuItem value="All">All Infrastructure</MenuItem>
            {racks.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
          </Select>
        </Grid>
        <Grid item>
          <Select value={phaseFilter} onChange={e => setPhaseFilter(e.target.value)}>
            <MenuItem value="All">All Phases</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <Button component="label" variant="outlined" startIcon={<UploadFileIcon />}>Upload Layout
            <input type="file" hidden accept=".csv" onChange={handleCSVUpload} />
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredRacks.map(rack => (
          <Grid item key={rack}>
            <Paper sx={{ p: 1, backgroundColor: expandedRack === rack ? '#ffcccc' : '#f0f0f0' }}>
              <Button fullWidth variant="text" sx={{ color: '#000', fontWeight: 'bold' }} onClick={() => setExpandedRack(rack === expandedRack ? null : rack)}>
                {rack.toUpperCase()}
              </Button>
              <Grid container spacing={0.5} sx={{ mt: 1 }}>
                {expandedRack === rack && filteredMiners.filter(m => m.rack === rack).map((m, i) => (
                  <Grid item key={i}>
                    <Tooltip
                      arrow
                      title={(
                        <>
                          <div><strong>IP:</strong> {m.ip}</div>
                          <div><strong>Temp:</strong> {m.temp} °C</div>
                          <div><strong>Status:</strong> {m.status}</div>
                          <div><strong>Hashrate:</strong> {m.hashrate || 'N/A'}</div>
                          <Button size="small" variant="outlined" sx={{ mt: 1 }}>Create Repair Ticket</Button>
                        </>
                      )}
                    >
                      <Box sx={{ width: 35, height: 35, backgroundColor: getColor(m.status), borderRadius: 0.5, textAlign: 'center', lineHeight: '35px', color: '#fff', fontWeight: 'bold' }}>
                        {m.temp}
                      </Box>
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={uploadOpen} onClose={() => setUploadOpen(false)}>
        <DialogTitle>Upload Site Layout</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Please upload a CSV file matching Foreman's layout format.</Typography>
          <Button component="label" variant="contained" sx={{ mt: 2 }}>Choose File
            <input type="file" hidden accept=".csv" onChange={handleCSVUpload} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setUploadOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
