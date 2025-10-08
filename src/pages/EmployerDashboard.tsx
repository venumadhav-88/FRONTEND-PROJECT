import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Typography, Button, Box } from '@mui/material'
import PostJobForm from '../ui/PostJobForm'
import EmployerApplications from '../ui/EmployerApplications'

export default function EmployerDashboard() {
  return (
    <Box>
      <Typography variant="h4">Employer Dashboard</Typography>
      <Box sx={{ mt: 2 }}>
        <Button component={Link} to="post">Post Job</Button>
        <Button component={Link} to="apps">Review Applications</Button>
      </Box>

      <Routes>
        <Route path="post" element={<PostJobForm />} />
        <Route path="apps" element={<EmployerApplications />} />
        <Route path="" element={<Typography sx={{ mt: 2 }}>Select an option.</Typography>} />
      </Routes>
    </Box>
  )
}
