import React, { useState } from 'react';
import {
  Box, Button, Typography, Paper, Grid, TextField,
  MenuItem, Switch, Slider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const triggerDefaults = {
  name: '',
  enabled: true,
  minerScope: 'Any',
  condition: 'No Submitted Shares Trigger',
  interval: 20,
  action: 'Reboot Miners'
};

const triggerOptions = [
  'No Submitted Shares Trigger',
  'Miner Hardware Errors Trigger',
  'Pickaxe Offline Trigger',
  'Minute Of Day Trigger'
];

const actionOptions = [
  'Reboot Miners',
  'Change Pools',
  'Send Alert'
];

export default function AlertsAndTriggers() {
  const [triggers, setTriggers] = useState([
    { ...triggerDefaults, name: 'Reboot when Not Hashing' },
    { ...triggerDefaults, name: 'Hardware Errors Reboot', condition: 'Miner Hardware Errors Trigger', interval: 10 }
  ]);

  const [hydroModalOpen, setHydroModalOpen] = useState(false);
  const [hydroSettings, setHydroSettings] = useState({
    alerting: false,
    error: 3127,
    warning: 3518
  });

  const handleAddTrigger = () => {
    setTriggers(prev => [...prev, { ...triggerDefaults }]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...triggers];
    updated[index][field] = value;
    setTriggers(updated);
  };

  const handleRemove = (index) => {
    setTriggers(prev => prev.filter((_, i) => i !== index));
  };

  const handleFanChange = (type, value) => {
    setHydroSettings(prev => ({ ...prev, [type]: value }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Alerts & Triggers</Typography>

      {triggers.map((trigger, index) => (
        <Paper key={index} sx={{ p: 3, mb: 3, backgroundColor: '#121212', color: '#fff' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Trigger Name"
                value={trigger.name}
                onChange={(e) => handleUpdate(index, 'name', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography>Enabled</Typography>
              <Switch
                checked={trigger.enabled}
                onChange={(e) => handleUpdate(index, 'enabled', e.target.checked)}
              />
            </Grid>
            <Grid item xs={6} md={3} textAlign="right">
              <IconButton color="error" onClick={() => handleRemove(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                select fullWidth
                label="Miner Scope"
                value={trigger.minerScope}
                onChange={(e) => handleUpdate(index, 'minerScope', e.target.value)}
              >
                <MenuItem value="Any">Any</MenuItem>
                <MenuItem value="All">All</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                select fullWidth
                label="Condition"
                value={trigger.condition}
                onChange={(e) => handleUpdate(index, 'condition', e.target.value)}
              >
                {triggerOptions.map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                type="number"
                label="Interval (mins)"
                fullWidth
                value={trigger.interval}
                onChange={(e) => handleUpdate(index, 'interval', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select fullWidth
                label="Action"
                value={trigger.action}
                onChange={(e) => handleUpdate(index, 'action', e.target.value)}
              >
                {actionOptions.map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} textAlign="right">
              <Button variant="outlined" onClick={() => setHydroModalOpen(true)}>
                Hydro Heat Settings
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Box textAlign="center">
        <Button variant="contained" onClick={handleAddTrigger}>
          Add Trigger
        </Button>
      </Box>

      {/* Fan Modal */}
      <Dialog open={hydroModalOpen} onClose={() => setHydroModalOpen(false)}>
        <DialogTitle>Edit Hydro Heat Trigger</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#121212', color: '#fff' }}>
          <Typography gutterBottom>Toggle Alerting</Typography>
          <Switch
            checked={hydroSettings.alerting}
            onChange={(e) => handleFanChange('alerting', e.target.checked)}
          />

          <Typography gutterBottom>Hydro Heat Range (°C)</Typography>
          <Slider
            value={[hydroSettings.error, hydroSettings.warning]}
            onChange={(e, newValue) => handleFanChange('error', newValue[0]) || handleFanChange('warning', newValue[1])}
            min={0}
            max={110}
            step={10}
            valueLabelDisplay="auto"
          />

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Error Less Than °C"
                type="number"
                value={hydroSettings.error}
                onChange={(e) => handleFanChange('error', parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Warn Less Than °C"
                type="number"
                value={hydroSettings.warning}
                onChange={(e) => handleFanChange('warning', parseInt(e.target.value))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHydroModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setHydroModalOpen(false)}>Apply</Button>
        </DialogActions>
      </Dialog>
      {/* Communication Channels */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>Integrations</Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="outlined" color="primary">Connect Slack</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="info">Connect Telegram</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="warning">Connect Discord</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
