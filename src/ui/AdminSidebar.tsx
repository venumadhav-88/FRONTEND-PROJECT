import React from 'react'
import { List, ListItemButton, ListItemIcon, ListItemText, Box, Avatar, Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import WorkIcon from '@mui/icons-material/Work'
import PeopleIcon from '@mui/icons-material/People'
import AssignmentIcon from '@mui/icons-material/Assignment'
import BarChartIcon from '@mui/icons-material/BarChart'
import { Link } from 'react-router-dom'

export default function AdminSidebar() {
  return (
    <Box sx={{ width: 240, pr: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>P</Avatar>
        <div>
          <Typography variant="subtitle1">Phoenix</Typography>
          <Typography variant="caption">Admin Portal</Typography>
        </div>
      </Box>
      <List>
        <ListItemButton component={Link} to="/admin-dashboard">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin-dashboard/jobs">
          <ListItemIcon><WorkIcon /></ListItemIcon>
          <ListItemText primary="Jobs Management" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin-dashboard/companies">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Companies" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin-dashboard/students">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin-dashboard/applications">
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin-dashboard/reports">
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
      </List>
    </Box>
  )
}
