import React from 'react'
import { useAuth } from '../context/AuthContext'
import { List, ListItem, ListItemText, Button } from '@mui/material'
import { useData } from '../context/DataContext'

export default function EmployerApplications() {
  const auth = useAuth()
  if (!auth.user) return null
  const data = useData()
  const myJobs = data.jobs.filter((j) => j.employerId === auth.user!.id).map((j) => j.id)
  const apps = data.applications.filter((a) => myJobs.includes(a.jobId))

  return (
    <div>
      <List>
        {apps.map((a) => {
          const student = data.users.find((u) => u.id === a.studentId)
          const job = data.jobs.find((j) => j.id === a.jobId)
          return (
            <ListItem key={a.id} secondaryAction={(
              <>
                <Button onClick={() => { data.updateApplicationStatus(a.id, 'Shortlisted') }}>Shortlist</Button>
                <Button onClick={() => { data.updateApplicationStatus(a.id, 'Placed') }}>Mark Placed</Button>
              </>
            )}>
              <ListItemText primary={`${student?.name} applied for ${job?.title}`} secondary={`Status: ${a.status}`} />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}
