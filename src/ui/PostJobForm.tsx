import React from 'react'
import { TextField, Button, Box, Alert } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

export default function PostJobForm() {
  const auth = useAuth()
  const [title, setTitle] = React.useState('')
  const [company, setCompany] = React.useState('')
  const [description, setDescription] = React.useState('')

  const [msg, setMsg] = React.useState<string | null>(null)
  const data = useData()
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth.user) return
    data.postJob(auth.user.id, { title, company, description })
    setTitle('')
    setCompany('')
    setDescription('')
    setMsg('Job posted')
    setTimeout(() => setMsg(null), 2000)
  }

  return (
    <Box component="form" onSubmit={submit} sx={{ maxWidth: 600 }}>
      {msg && <Alert severity="success" sx={{ mb: 2 }}>{msg}</Alert>}
      <TextField fullWidth label="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Company" value={company} onChange={(e) => setCompany(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 2 }} multiline rows={4} />
      <Button type="submit" variant="contained">Post Job</Button>
    </Box>
  )
}
