import React, { useState } from 'react';
import {
  Box, Button, Typography, Paper, Grid, TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const cycleCounts = [
  {
    type: 'ASIC Miner',
    summary: 'Each asset counted 1 time per year with 4 cycles per count',
    last: 'April 1, 2023',
    next: 'July 1, 2023'
  }
];

const initialAssets = [
  {
    id: 1,
    name: 'Antminer S19',
    type: 'ASIC',
    client: 'KMORR Holdings',
    location: 'Rack A01',
    color: 'Black',
    purchaseDate: '2023-06-15',
    quantity: 5,
    sku: 'S19-110T'
  }
];

export default function Inventory() {
  const [assets, setAssets] = useState(initialAssets);
  const [search, setSearch] = useState('');

  const filteredAssets = assets.filter((asset) =>
    Object.values(asset).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  const columns = [
    { field: 'id', headerName: 'Asset ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'client', headerName: 'Client', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'color', headerName: 'Color', flex: 1 },
    { field: 'purchaseDate', headerName: 'Purchase Date', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 1 },
    { field: 'sku', headerName: 'SKU', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: () => (
        <Button size="small" variant="outlined">Edit</Button>
      ),
    }
  ];

  return (
    <Box 
    sx={{
        px: 2,
        py: 4,
        mx: 'auto',
        width: '100%',
        maxWidth: {
          xs: '100%',    // full width on mobile
          sm: '95%',
          md: '90%',
          lg: '1200px',  // locked on larger screens
        },
      }}
    >
      <Typography variant="h5" gutterBottom>Inventory</Typography>

      {/* --- Cycle Count Summary --- */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, backgroundColor: '#121212', color: '#fff' }}>
            <Typography variant="h6">1 / 1</Typography>
            <Typography>Unlinked Assets</Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Button variant="outlined">Sync Now</Button>
              <Button variant="contained">View Now</Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, backgroundColor: '#121212', color: '#fff' }}>
            <Typography variant="h6">0 / 0</Typography>
            <Typography>Mismatched Linked Assets</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* --- Cycle Count Table (DataGrid) --- */}
        <Grid container spacing={2} sx={{ p:2, mb: 3 }}>
        <Grid item xs={12}>
        <Paper sx={{ p: 2, backgroundColor: '#121212', color: '#fff' }}>
        <Box sx={{ mt: 3, backgroundColor: '#121212', borderRadius: 1, overflowX: 'auto', maxWidth: '100%', mx: 'auto' }}>
        <Typography variant="h6" gutterBottom sx={{ px: 2, pt: 2 }}>Cycle Counts</Typography>
        <DataGrid
          autoHeight
          rows={cycleCounts.map((item, index) => ({ id: index + 1, ...item }))}
          columns={[
            { field: 'type', headerName: 'Asset Type', flex: 1 },
            { field: 'summary', headerName: 'Summary', flex: 2 },
            { field: 'last', headerName: 'Last Cycle Date', flex: 1 },
            { field: 'next', headerName: 'Next Cycle Date', flex: 1 },
            {
              field: 'actions',
              headerName: 'Actions',
              flex: 1,
              sortable: false,
              renderCell: () => <Button size="small" variant="outlined">Actions</Button>
            }
          ]}
          pageSize={5}
          sx={{
            backgroundColor: '#121212',
            color: '#fff',
            minWidth: 1000,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#1e1e1e',
            },
          }}
        />
      </Box>
      
        </Paper>
        </Grid>
        </Grid>

<Grid container spacing={2}>
  {/* --- Controls (Search + Actions) --- */}
<Grid container spacing={2} justifyContent="left" alignItems="center">
{/* Upload Button */}
<Grid item>
  <Button variant="contained">Upload Assets</Button>
</Grid>

{/* Sync Button */}
<Grid item>
  <Button variant="outlined">Sync Assets</Button>
</Grid>

{/* Add Asset Button */}
<Grid item>
  <Button variant="outlined">Add Asset</Button>
</Grid>

{/* Search Input */}
<Grid item xs={12} sm={6} md={4}>
  <TextField
    size="small"
    fullWidth
    label="Search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</Grid>
      {/* --- Export Button --- */}
      <Grid item xs={12}>
      <Button variant="outlined">Export</Button>
    </Grid>
</Grid>


      {/* --- Inventory Table --- */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <Box sx={{ mt: 3, backgroundColor: '#121212', borderRadius: 1, overflowX: 'auto', maxWidth: '100%', mx: 'auto' }}>
        <DataGrid
          autoHeight
          rows={filteredAssets}
          columns={columns}
          pageSize={5}
          sx={{
            backgroundColor: '#121212',
            color: '#fff',
            minWidth: 1000,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#1e1e1e',
            },
          }}
        />
      </Box>
      
        </Grid>
      </Grid>

      </Grid>
    </Box>
  );
}
