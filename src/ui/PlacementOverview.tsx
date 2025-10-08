import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useData } from '../context/DataContext'

export default function PlacementOverview() {
  const data = useData()
  const students = data.users.filter((u: any) => u.role === 'Student')
  return (
    <div>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Placement Overview</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            <TableCell>Applied Jobs</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((s: any) => {
            const apps = data.applications.filter((a) => a.studentId === s.id)
            const status = apps.find((a) => a.status === 'Placed') ? 'Placed' : apps.length ? 'Applied' : 'No Applications'
            return (
              <TableRow key={s.id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{apps.map((a) => (data.jobs.find((j) => j.id === a.jobId)?.title || 'Unknown')).join(', ')}</TableCell>
                <TableCell>{status}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
