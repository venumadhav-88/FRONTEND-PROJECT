import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import PublicLayout from './components/PublicLayout.jsx'
import Home from './pages/Home.jsx'
import Jobs from './pages/Jobs.jsx'
import Placements from './pages/Placements.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Student from './pages/Student.jsx'
import Employer from './pages/Employer.jsx'
import Officer from './pages/Officer.jsx'
import Admin from './pages/Admin.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { AppStateProvider } from './state/AppState.jsx'
import './App.css'

import { useAppState } from './state/AppState.jsx'

function RequireAuth({ children }) {
  const { currentUser } = useAppState()
  if (!currentUser) return <Navigate to="/login" replace />
  return children
}

const roleToPath = (role) => {
  switch (role) {
    case 'student': return '/app/student'
    case 'employer': return '/app/employer'
    case 'officer': return '/app/officer'
    case 'admin': return '/app/admin'
    default: return '/'
  }
}

function RequireRole({ role, children }) {
  const { currentUser } = useAppState()
  if (!currentUser) return <Navigate to="/login" replace />
  if (currentUser.role !== role) return <Navigate to={roleToPath(currentUser.role)} replace />
  return children
}

export default function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <Routes>
          {/* Home is public; all other content pages require login */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* Protected public sections */}
          <Route path="/" element={<RequireAuth><PublicLayout /></RequireAuth>}>
            <Route path="jobs" element={<Jobs />} />
            <Route path="placements" element={<Placements />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          <Route path="/app" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route index element={<Navigate to="student" replace />} />
            <Route path="student" element={<RequireRole role="student"><Student /></RequireRole>} />
            <Route path="employer" element={<RequireRole role="employer"><Employer /></RequireRole>} />
            <Route path="officer" element={<RequireRole role="officer"><Officer /></RequireRole>} />
            <Route path="admin" element={<RequireRole role="admin"><Admin /></RequireRole>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppStateProvider>
  )
}
