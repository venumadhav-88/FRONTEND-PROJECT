import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Typography, Alert, Paper, Tabs, Tab } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { registerUser } from '../data/mock'

export default function LoginPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState(0) // 0 = login, 1 = signup

  // login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  // signup
  const [sName, setSName] = useState('')
  const [sPassword, setSPassword] = useState('')
  const [sRole, setSRole] = useState<'Student'|'Employer'|'PO'|'Admin'>('Student')
  const [signupMsg, setSignupMsg] = useState<string | null>(null)

  const redirectByRole = (role?: string) => {
    if (role === 'Student') navigate('/student-dashboard')
    else if (role === 'Employer') navigate('/employer-dashboard')
    else if (role === 'PO') navigate('/officer-dashboard')
    else if (role === 'Admin') navigate('/admin-dashboard')
    else navigate('/')
  }

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const res = auth.login(username.trim(), password)
    if (!res.ok) return setError(res.message || 'Login failed')
    setError(null)
    redirectByRole(auth.user?.role)
  }

  const submitSignup = (e: React.FormEvent) => {
    e.preventDefault()
    const r = registerUser(sName.trim(), sPassword, sRole)
    if (!r.ok) return setSignupMsg(r.message)
    // auto-login newly registered user
    const res = auth.login(sName.trim(), sPassword)
    if (res.ok) redirectByRole(sRole)
    else setSignupMsg('Registered but auto-login failed')
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }} className="hero">
      <Box className="left">
        <Paper elevation={6} className="glass-card enter-up" sx={{ width: 440 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
          <Tab label="Login" />
          <Tab label="Sign up" />
        </Tabs>

        {tab === 0 && (
          <Box component="form" onSubmit={submitLogin} sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Welcome back</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ mb: 2 }} />
            <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
            <Button fullWidth type="submit">Login</Button>
            <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>Use alice/bob/carol/admin (pass/admin) or sign up</Typography>
          </Box>
        )}

        {tab === 1 && (
          <Box component="form" onSubmit={submitSignup} sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Create an account</Typography>
            {signupMsg && <Alert severity="info" sx={{ mb: 2 }}>{signupMsg}</Alert>}
            <TextField fullWidth label="Username" value={sName} onChange={(e) => setSName(e.target.value)} sx={{ mb: 2 }} />
            <TextField fullWidth label="Password" type="password" value={sPassword} onChange={(e) => setSPassword(e.target.value)} sx={{ mb: 2 }} />
            <TextField select fullWidth label="Role" value={sRole} onChange={(e) => setSRole(e.target.value as any)} SelectProps={{ native: true }} sx={{ mb: 2 }}>
              <option value="Student">Student</option>
              <option value="Employer">Employer</option>
              <option value="PO">Placement Officer</option>
              <option value="Admin">Admin</option>
            </TextField>
            <Button fullWidth type="submit">Sign up</Button>
          </Box>
        )}
        </Paper>
      </Box>
      <Box className="right">
        <div style={{ width: 360, height: 280, borderRadius: 18, overflow: 'hidden' }} className="enter-up">
          {/* decorative colorful panel */}
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(124,58,237,0.9), rgba(6,182,212,0.7))', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', color:'#fff' }}>
            <div style={{ width: 120, height: 120, borderRadius: 20, background: 'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom: 12, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="white" fill-opacity="0.12"/></svg>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Welcome to FEDF</div>
            <div style={{ opacity: 0.9, fontSize: '0.85rem', marginTop: 6 }}>Placement portal — colorful, fast & modern</div>
          </div>
        </div>
      </Box>
    </Box>
  )
}
