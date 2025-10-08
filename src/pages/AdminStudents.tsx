import React from 'react'
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material'
import { useData } from '../context/DataContext'

export default function AdminStudents() {
  const data = useData()
  const students = data.users.filter((u: any) => u.role === 'Student')
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Students</Typography>
      <List>
        {students.map((s: any) => (
          <ListItem key={s.id} secondaryAction={<Button variant="outlined" onClick={() => data.changeUserRole(s.id, 'PO')}>Make PO</Button>}>
            <ListItemText primary={s.name} secondary={s.role} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
