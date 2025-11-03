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

export default function Signup() {
  const { actions } = useAppState()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) return
    try {
      actions.signup({ name, email, password, role })
      navigate(roleToPath(role))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth">
      <h2>Create your account</h2>
      {error && <div className="card-box" style={{ borderColor: '#c75151', color: '#ffdcdc' }}>{error}</div>}
      <form onSubmit={onSubmit} className="form-grid" style={{ maxWidth: 520 }}>
        <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="employer">Employer</option>
          <option value="officer">Placement Officer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign up</button>
      </form>
      <p className="muted">Already have an account? <a href="/login">Login</a></p>
    </div>
  )
}


