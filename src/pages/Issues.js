// src/pages/Issues.js
import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Button, TextField,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';

const minerStatusData = [
  { label: 'Healthy', value: 5, color: '#00FF00' },
  { label: 'Warning', value: 0, color: '#00BFFF' },
  { label: 'Danger', value: 2, color: '#FF6347' },
  { label: 'Disabled', value: 1, color: '#FF8C00' },
  { label: 'Pending', value: 0, color: '#1E90FF' },
];

const issuesData = [
  { id: 1, issue: 'Miner not updating', warning: 0, failing: 2 },
  { id: 2, issue: 'Overheating', warning: 0, failing: 1 },
  { id: 3, issue: 'Power draw spike', warning: 0, failing: 1 },
];

export default function Issues() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRows = issuesData.filter(
    (row) =>
      row.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMiners = minerStatusData.reduce((acc, s) => acc + s.value, 0);
  const problematicMiners = minerStatusData
    .filter(s => s.label !== 'Healthy')
    .reduce((acc, s) => acc + s.value, 0);

  const columns = [
    { field: 'issue', headerName: 'Issue', flex: 2 },
    { field: 'warning', headerName: 'Warning', flex: 1 },
    { field: 'failing', headerName: 'Failing', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Button variant="outlined" size="small" onClick={() => alert(`Show Miners for "${params.row.issue}"`)}>
          Show Miners
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Miner Status Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, backgroundColor: '#121212' }}>
            <Typography variant="h6" gutterBottom>
              Miner Status
            </Typography>
            <PieChart
              series={[{
                data: minerStatusData.map(({ label, value, color }) => ({
                  id: label,
                  value,
                  label,
                  color,
                })),
                innerRadius: 40,
                outerRadius: 80,
              }]}
              width={350}
              height={250}
              colors={minerStatusData.map(d => d.color)}
              legend={{
                direction: 'column',
                position: { vertical: 'middle', horizontal: 'right' },
              }}
            />
          </Paper>
        </Grid>

        {/* Miners Needing Attention */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, backgroundColor: '#121212', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              <span style={{ color: '#ef5350' }}>{problematicMiners}</span> / {totalMiners}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Miners Needing Attention
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Issues Table */}
      <Grid container spacing={2} sx={{ mt: 3 }} alignItems="center">
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Button
            variant="outlined"
            onClick={() => alert('Exporting issues to CSV...')}
          >
            Download CSV
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, backgroundColor: '#121212', borderRadius: 1, overflowX: 'auto' }}>
        <DataGrid
          autoHeight
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          sx={{
            backgroundColor: '#121212',
            color: '#fff',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#1e1e1e',
            },
          }}
        />
      </Box>
    </Box>
  );
}
