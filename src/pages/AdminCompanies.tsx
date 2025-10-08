import React from 'react'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'
import { useData } from '../context/DataContext'

export default function AdminCompanies() {
  const data = useData()
  const companies = Array.from(new Set(data.jobs.map((j) => j.company)))
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Companies</Typography>
      <List>
        {companies.map((c) => (
          <ListItem key={c}><ListItemText primary={c} /></ListItem>
        ))}
      </List>
    </Box>
  )
}
