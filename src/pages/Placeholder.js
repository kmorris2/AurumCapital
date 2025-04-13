// src/pages/Placeholder.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const Placeholder = ({ title }) => {
  return (
    <Box p={4}>
      <Typography variant="h4" color="primary">
        {title} Page
      </Typography>
      <Typography variant="body1" mt={2}>
        This is a placeholder page. You can build this out later.
      </Typography>
    </Box>
  );
};

export default Placeholder;
