import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Typography, Button, Box } from '@mui/material'
import JobsList from '../ui/JobsList'
import ApplicationTracker from '../ui/ApplicationTracker'

export default function StudentDashboard() {
  return (
    <Box>
      <Typography variant="h4">Student Dashboard</Typography>
      <Box sx={{ mt: 2 }}>
        <Button component={Link} to="jobs">Explore Jobs</Button>
        <Button component={Link} to="applications">My Applications</Button>
      </Box>

      <Routes>
        <Route path="jobs" element={<JobsList />} />
        <Route path="applications" element={<ApplicationTracker />} />
        <Route path="" element={<Typography sx={{ mt: 2 }}>Select an option.</Typography>} />
      </Routes>
    </Box>
  )
}
