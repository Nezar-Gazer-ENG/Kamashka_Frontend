import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, mt: 'auto', backgroundColor: 'grey.100' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © 2025 Kamashka. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;