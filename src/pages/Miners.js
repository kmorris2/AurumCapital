import React, { useState } from 'react';
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, MenuItem, Select, TextField, Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const initialMiners = [
  { id: 1, name: 'Miner-01', ip: '192.168.0.1', status: 'Healthy', hashrate: '90 TH/s', temp: '65°C', power: '3200W' },
  { id: 2, name: 'Miner-02', ip: '192.168.0.2', status: 'Failing', hashrate: '40 TH/s', temp: '85°C', power: '3500W' },
  { id: 3, name: 'Miner-03', ip: '192.168.0.3', status: 'Warning', hashrate: '70 TH/s', temp: '75°C', power: '3000W' },
];

export default function Miners() {
  const [miners, setMiners] = useState(initialMiners);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedMiner, setSelectedMiner] = useState(null);

  const handleEditOpen = (miner) => {
    setSelectedMiner(miner);
    setOpenEdit(true);
  };

  const handleAddOpen = () => {
    setSelectedMiner({ name: '', ip: '', status: 'Healthy', hashrate: '', temp: '', power: '' });
    setOpenAdd(true);
  };

  const handleSave = () => {
    setMiners((prev) => {
      if (selectedMiner.id) {
        return prev.map(m => m.id === selectedMiner.id ? selectedMiner : m);
      }
      return [...prev, { ...selectedMiner, id: prev.length + 1 }];
    });
    setOpenEdit(false);
    setOpenAdd(false);
  };

  const handleDelete = (id) => {
    setMiners(prev => prev.filter(m => m.id !== id));
  };

  const filteredMiners = miners.filter(m =>
    (filter === 'All' || m.status === filter) &&
    (m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.ip.includes(searchTerm))
  );

  const columns = [
    { field: 'name', headerName: 'Miner', flex: 1 },
    { field: 'ip', headerName: 'IP Address', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'hashrate', headerName: 'Hashrate', flex: 1 },
    { field: 'temp', headerName: 'Temp', flex: 1 },
    { field: 'power', headerName: 'Power', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" onClick={() => handleEditOpen(params.row)}>Edit</Button>
          <Button size="small" color="error" onClick={() => handleDelete(params.row.id)}>Delete</Button>
        </Box>
      ),
    },
  ];

  const miner = selectedMiner || {};

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Miners</Typography>

      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search miners"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Select fullWidth value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Healthy">Healthy</MenuItem>
            <MenuItem value="Warning">Warning</MenuItem>
            <MenuItem value="Failing">Failing</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={4} textAlign="right">
          <Button variant="contained" onClick={handleAddOpen}>Add Miner</Button>
        </Grid>
      </Grid>

      <DataGrid
        rows={filteredMiners}
        columns={columns}
        // autoHeight
        pageSize={5}
        sx={{ backgroundColor: '#121212', color: '#fff' }}
      />

      {(openEdit || openAdd) && (
        <Dialog open onClose={() => { setOpenEdit(false); setOpenAdd(false); }}>
          <DialogTitle>{miner.id ? 'Edit Miner' : 'Add Miner'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              sx={{ mt: 2 }}
              value={miner.name || ''}
              onChange={(e) => setSelectedMiner({ ...miner, name: e.target.value })}
            />
            <TextField
              label="IP"
              fullWidth
              sx={{ mt: 2 }}
              value={miner.ip || ''}
              onChange={(e) => setSelectedMiner({ ...miner, ip: e.target.value })}
            />
            <Select
              fullWidth
              label="hello"
              sx={{ mt: 2 }}
              value={miner.status || ''}
              onChange={(e) => setSelectedMiner({ ...miner, status: e.target.value })}
            >
              <MenuItem value="Healthy">Healthy</MenuItem>
              <MenuItem value="Warning">Warning</MenuItem>
              <MenuItem value="Failing">Failing</MenuItem>
            </Select>
            <TextField
                label="Hashrate (TH/s)"
                fullWidth
                sx={{ mt: 2 }}
                value={miner.hashrate || '0 TH/s'}
                onChange={(e) => setSelectedMiner({ ...miner, hashrate: e.target.value })}
            />
            <TextField
                label="Temperature (°C)"
                fullWidth
                sx={{ mt: 2 }}
                value={miner.temp || '0°C'}
                onChange={(e) => setSelectedMiner({ ...miner, temp: e.target.value })}
            />
            <Select
              fullWidth
              sx={{ mt: 2 }}
              value={miner.power || '3200W'}
              onChange={(e) => setSelectedMiner({ ...miner, power: e.target.value })}
            >
              <MenuItem value="3200W">3200W</MenuItem>
              <MenuItem value="3500W">3500W</MenuItem>
              <MenuItem value="5500W">5500W</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpenEdit(false); setOpenAdd(false); }}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
