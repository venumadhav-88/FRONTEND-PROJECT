import React from 'react'
import { Card, CardContent, Typography, List, ListItem, ListItemText, Chip, Box } from '@mui/material'
import { useData } from '../context/DataContext'

export default function RecentActivity() {
  const data = useData()
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h6">Recent Activity</Typography>
          <List>
            {data.jobs.slice(0, 5).map((j) => (
              <ListItem key={j.id} secondaryAction={<Chip label="active" size="small" />}>
                <ListItemText primary={j.title} secondary={j.company} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}
