import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Button, IconButton, Tooltip, Box, TextField } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import WorkIcon from '@mui/icons-material/Work'
import PostAddIcon from '@mui/icons-material/PostAdd'
import InsightsIcon from '@mui/icons-material/Insights'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import StudentDashboard from './pages/StudentDashboard'
import EmployerDashboard from './pages/EmployerDashboard'
import PODashboard from './pages/PODashboard'
import AdminDashboard from './pages/AdminDashboard'
import AdminPortal from './pages/AdminPortal'
import AdminJobs from './pages/AdminJobs'
import AdminCompanies from './pages/AdminCompanies'
import AdminStudents from './pages/AdminStudents'
import AdminApplications from './pages/AdminApplications'
import AdminReports from './pages/AdminReports'

function NavBar() {
  const auth = useAuth()
  return (
    <AppBar position="sticky" color="primary" elevation={3}>
      <Toolbar sx={{ px: { xs: 2, sm: 3, md: 6 } }} className="site-header">
        <Box className="brand" component={Link} to="/" sx={{ textDecoration: 'none' }}>
          <div className="logo" style={{ background: 'linear-gradient(135deg,var(--accent-1),var(--accent-2))' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'inherit' }}>
            FEDF
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          {/* subtle compact search field */}
          <TextField size="small" placeholder="Search jobs, students..." sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: 1, width: { xs: 140, sm: 260 } }} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Notifications"><IconButton color="inherit"><NotificationsIcon /></IconButton></Tooltip>
          <Tooltip title="Post Job"><IconButton color="inherit" component={Link} to="/employer-dashboard"><PostAddIcon /></IconButton></Tooltip>
          <Tooltip title="Jobs"><IconButton color="inherit" component={Link} to="/student-dashboard"><WorkIcon /></IconButton></Tooltip>
          <Tooltip title="Reports"><IconButton color="inherit" component={Link} to="/officer-dashboard"><InsightsIcon /></IconButton></Tooltip>
          <Tooltip title="Profile"><IconButton color="inherit" component={Link} to="/login"><AccountCircle /></IconButton></Tooltip>
          {!auth.user ? (
            <Button component={Link} to="/login">Login</Button>
          ) : (
            <Button color="inherit" onClick={() => auth.logout()}>Logout</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const auth = useAuth()
  if (!auth.user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(auth.user.role)) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <NavBar />
  <Container maxWidth={false} sx={{ mt: 4, px: { xs: 2, sm: 3, md: 6 } }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute roles={["Admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin-dashboard/portal" element={<ProtectedRoute roles={["Admin"]}><AdminPortal /></ProtectedRoute>} />
          <Route path="/admin-dashboard/jobs" element={<ProtectedRoute roles={["Admin"]}><AdminJobs /></ProtectedRoute>} />
          <Route path="/admin-dashboard/companies" element={<ProtectedRoute roles={["Admin"]}><AdminCompanies /></ProtectedRoute>} />
          <Route path="/admin-dashboard/students" element={<ProtectedRoute roles={["Admin"]}><AdminStudents /></ProtectedRoute>} />
          <Route path="/admin-dashboard/applications" element={<ProtectedRoute roles={["Admin"]}><AdminApplications /></ProtectedRoute>} />
          <Route path="/admin-dashboard/reports" element={<ProtectedRoute roles={["Admin"]}><AdminReports /></ProtectedRoute>} />
          <Route path="/student-dashboard" element={<ProtectedRoute roles={["Student"]}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/employer-dashboard" element={<ProtectedRoute roles={["Employer"]}><EmployerDashboard /></ProtectedRoute>} />
          <Route path="/officer-dashboard" element={<ProtectedRoute roles={["PO"]}><PODashboard /></ProtectedRoute>} />

          <Route
            path="/student/*"
            element={
              <ProtectedRoute roles={["Student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employer/*"
            element={
              <ProtectedRoute roles={["Employer"]}>
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/po/*"
            element={
              <ProtectedRoute roles={["PO"]}>
                <PODashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </AuthProvider>
  )
}

function Home() {
  const auth = useAuth()
  return (
    <div>
      <Typography variant="h4">Welcome to FEDF Mock</Typography>
      {!auth.user ? (
        <Typography>Please <Link to="/login">login</Link> to continue.</Typography>
      ) : (
        <Typography>You're logged in as {auth.user.name} ({auth.user.role}). Use navigation to go to your dashboard.</Typography>
      )}
    </div>
  )
}
