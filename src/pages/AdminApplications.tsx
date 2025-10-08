import React from 'react'
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material'
import { useData } from '../context/DataContext'

export default function AdminApplications() {
  const data = useData()
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Applications</Typography>
      <List>
        {data.applications.map((a) => (
          <ListItem key={a.id} secondaryAction={<>
            <Button onClick={() => data.updateApplicationStatus(a.id, 'Shortlisted')}>Shortlist</Button>
            <Button onClick={() => data.updateApplicationStatus(a.id, 'Placed')}>Mark Placed</Button>
            <Button onClick={() => data.deleteApplication(a.id)}>Delete</Button>
          </>}>
            <ListItemText primary={`${a.studentId} -> ${a.jobId}`} secondary={a.status} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
