import React from 'react'
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material'
import { useData } from '../context/DataContext'

export default function AdminJobs() {
  const data = useData()
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Jobs Management</Typography>
      <List>
        {data.jobs.map((j) => (
          <ListItem key={j.id} secondaryAction={<Button variant="outlined" onClick={() => data.deleteJob(j.id)}>Delete</Button>}>
            <ListItemText primary={j.title} secondary={j.company} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
