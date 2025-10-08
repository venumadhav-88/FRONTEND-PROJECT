import React from 'react'
import { Box, Typography, Button } from '@mui/material'

export default function AdminReports() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Reports</Typography>
      <Button variant="contained">Download Placement Report</Button>
    </Box>
  )
}
