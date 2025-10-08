import React from 'react'
import { Box, Grid, Paper, Typography, Button } from '@mui/material'
import AdminSidebar from '../ui/AdminSidebar'
import AdminCards from '../ui/AdminCards'
import RecentActivity from '../ui/RecentActivity'
import PostJobForm from '../ui/PostJobForm'
import EmployerApplications from '../ui/EmployerApplications'

export default function AdminPortal() {
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <AdminSidebar />
      <Box sx={{ flex: 1 }}>
        <AdminCards />
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <RecentActivity />
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Quick Actions</Typography>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="contained" href="#post">Post New Job</Button>
                <Button variant="outlined" href="#apps">Review Applications</Button>
                <Button variant="outlined" href="#companies">Manage Companies</Button>
                <Button variant="outlined" href="#students">Student Profiles</Button>
              </Box>
            </Paper>
            <Paper sx={{ p: 2, mt: 2 }}>
              <Typography variant="subtitle1">Post a Job</Typography>
              <PostJobForm />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
