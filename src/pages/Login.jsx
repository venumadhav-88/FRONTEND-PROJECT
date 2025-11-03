import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../state/AppState.jsx'

const roleToPath = (role) => {
  switch (role) {
    case 'student': return '/app/student'
    case 'employer': return '/app/employer'
    case 'officer': return '/app/officer'
    case 'admin': return '/app/admin'
    default: return '/'
  }
}

export default function Login() {
  const { state, actions } = useAppState()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    try {
      actions.loginWithCredentials({ email, password })
      const user = state.users.find((u) => u.email === email)
      navigate(roleToPath(user.role))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth auth-center">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="muted" style={{ marginTop: -6 }}>Sign in to your account</p>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={onSubmit} className="form-grid" style={{ maxWidth: 520 }}>
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="employer">Employer</option>
            <option value="officer">Placement Officer</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="btn primary large">Sign In</button>
        </form>

        <p className="muted" style={{ textAlign: 'center' }}>No account? <a href="/signup">Create one</a></p>

        <div className="muted demo-head">Demo credentials:</div>
        <div className="demo-grid">
          {state.users.map((u) => (
            <div key={u.id} className="demo-item"><strong>{u.email}</strong> / <span>{u.password}</span> <em className="muted">({u.role})</em></div>
          ))}
        </div>
      </div>
    </div>
  )
}


