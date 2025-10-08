import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import PlacementOverview from '../ui/PlacementOverview'

export default function PODashboard() {
  return (
    <Box>
      <Typography variant="h4">Placement Officer Dashboard</Typography>
      <Box sx={{ mt: 2 }}>
        <Button sx={{ mr: 1 }}>Download Placement Report</Button>
      </Box>
      <PlacementOverview />
    </Box>
  )
}
