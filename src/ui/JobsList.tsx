import React from 'react'
import { Card, CardContent, Typography, Button, Grid, TextField, Alert } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

export default function JobsList() {
  const auth = useAuth()
  const data = useData()
  const [query, setQuery] = React.useState('')
  const [msg, setMsg] = React.useState<string | null>(null)

  const filtered = data.jobs.filter((j) => j.title.toLowerCase().includes(query.toLowerCase()) || j.company.toLowerCase().includes(query.toLowerCase()))

  const onApply = (jobId: string) => {
    if (!auth.user) return
    const res = data.applyToJob(auth.user.id, jobId)
    if (!res.ok) setMsg(res.message)
    else setMsg('Applied')
    setTimeout(() => setMsg(null), 1500)
  }

  return (
    <div>
      <TextField label="Search jobs" value={query} onChange={(e) => setQuery(e.target.value)} sx={{ mb: 2 }} fullWidth />
      {msg && <Alert severity="info" sx={{ mb: 2 }}>{msg}</Alert>}
      <Grid container spacing={2}>
        {filtered.map((j) => (
          <Grid item xs={12} md={6} key={j.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{j.title}</Typography>
                <Typography color="text.secondary">{j.company}</Typography>
                <Typography sx={{ mt: 1 }}>{j.description}</Typography>
                <Button sx={{ mt: 2 }} onClick={() => onApply(j.id)}>Apply</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
