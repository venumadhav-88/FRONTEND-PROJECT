import React from 'react'
import { Grid, Card, CardContent, Typography, Box } from '@mui/material'
import { useData } from '../context/DataContext'

export default function AdminCards() {
  const data = useData()
  const activeJobs = data.jobs.length
  const applications = data.applications.length
  const companies = new Set(data.jobs.map((j) => j.company)).size
  const students = data.users.filter((u) => u.role === 'Student').length

  const stat = (title: string, value: number) => (
    <Card>
      <CardContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h6">{value}</Typography>
      </CardContent>
    </Card>
  )

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>{stat('Active Jobs', activeJobs)}</Grid>
        <Grid item xs={6} sm={3}>{stat('Applications', applications)}</Grid>
        <Grid item xs={6} sm={3}>{stat('Companies', companies)}</Grid>
        <Grid item xs={6} sm={3}>{stat('Students', students)}</Grid>
      </Grid>
    </Box>
  )
}
