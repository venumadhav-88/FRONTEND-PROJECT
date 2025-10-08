import React from 'react'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { List, ListItem, ListItemText, Typography } from '@mui/material'

export default function ApplicationTracker() {
  const auth = useAuth()
  if (!auth.user) return null
  const data = useData()
  const apps = data.applications.filter((a) => a.studentId === auth.user!.id)
  return (
    <div>
      <Typography variant="h6" sx={{ mb: 1 }}>My Applications</Typography>
      <List>
        {apps.map((a) => {
          const job = data.jobs.find((j) => j.id === a.jobId)
          return (
            <ListItem key={a.id}>
              <ListItemText primary={job?.title || 'Unknown'} secondary={`Status: ${a.status}`} />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}
