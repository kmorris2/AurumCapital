import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function SecurityPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Security & Compliance</Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Responsible Disclosure</Typography>
        <Typography>
          If you discover a security vulnerability, please report it privately to the Foreman team.
          All issues are handled with confidentiality. High severity issues are fixed under embargo,
          while lower severity issues may be disclosed publicly after review.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Issue Handling & Release Cycle</Typography>
        <Typography>
          We support one major (x.y) release at a time. Critical fixes may be backported to a prior release
          if it was recently replaced. Security announcements are posted here and in our forums.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Researcher Credit</Typography>
        <Typography>
          We publicly acknowledge security researchers who report vulnerabilities, provided they wish to be credited.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Audit Logs</Typography>
        <Typography>
          Audit logs in Foreman track login attempts, configuration changes, and user activity. These logs
          support compliance, monitoring, and incident response.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>User Permissions</Typography>
        <Typography>
          Use Role-Based Access Control (RBAC) to manage permissions. Limit access to sensitive data
          and enforce visibility rules for pages like Workers and Security.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Compliance Best Practices</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Data Security" secondary="Use RBAC, enforce strong passwords and MFA, and review audit logs regularly." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Regulatory Compliance" secondary="Track maintenance, verify certifications, and produce reports using custom fields." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Asset & Inventory Management" secondary="Track serials, audits, and depreciation for compliance and financial reporting." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Training & Awareness" secondary="Provide ongoing user training and promote compliance awareness across your team." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Audits" secondary="Perform regular internal reviews and prepare for external audits with organized data." />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}
