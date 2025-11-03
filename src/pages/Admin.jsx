import { useMemo, useState } from 'react'
import { useAppState } from '../state/AppState.jsx'

function BarRow({ label, value, total }) {
  const pct = Math.min(100, Math.round((value / (total || 1)) * 100))
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 60px', alignItems: 'center', gap: 12 }}>
      <div className="muted">{label}</div>
      <div style={{ height: 8, background: 'var(--layer)', borderRadius: 999, position: 'relative', border: '1px solid var(--border)' }}>
        <div style={{ width: pct + '%', height: '100%', background: 'linear-gradient(90deg, var(--accent), #66ffd1)', borderRadius: 999 }} />
      </div>
      <div className="muted" style={{ textAlign: 'right' }}>{value}</div>
    </div>
  )
}

export default function Admin() {
  const { state, actions } = useAppState()
  const [tab, setTab] = useState('dashboard')

  // Quick derived metrics
  const totalUsers = state.users.length
  const activeJobs = state.jobs.length
  const totalApps = state.applications.length
  const systemHealth = 98

  // Mock trend data
  const months = ['Jan','Feb','Mar','Apr','May','Jun']
  const appsTrend = [45,52,38,61,48,55]
  const placeTrend = [12,18,15,22,19,25]

  const departments = [
    { name: 'Computer Science', apps: 120, success: 35 },
    { name: 'Engineering', apps: 95, success: 28 },
    { name: 'Business', apps: 80, success: 22 },
    { name: 'Medicine', apps: 65, success: 18 },
    { name: 'Arts', apps: 45, success: 12 },
    { name: 'Science', apps: 55, success: 15 },
  ]

  // Manage users state
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })

  const recent = useMemo(() => {
    const first = state.applications[0]
    if (!first) return []
    const job = state.jobs.find(j => j.id === first.jobId)
    return [{ text: `${first.studentName} applied for ${job?.title}`, meta: `${job?.company} • ${new Date().toISOString().slice(0,10)}` }]
  }, [state.applications, state.jobs])

  return (
    <div className="page">
      <header className="page-header" style={{ marginBottom: 10 }}>
        <h2>Placement Management System</h2>
        <p className="muted">Track and manage student placements efficiently</p>
      </header>

      <div className="row-gap" style={{ marginBottom: 16 }}>
        <button className={tab==='dashboard'?'' :'secondary'} onClick={() => setTab('dashboard')}>Dashboard</button>
        <button className={tab==='users'?'' :'secondary'} onClick={() => setTab('users')}>Manage Users</button>
        <button className={tab==='settings'?'' :'secondary'} onClick={() => setTab('settings')}>System Settings</button>
        <button className={tab==='data'?'' :'secondary'} onClick={() => setTab('data')}>Placement Data</button>
      </div>

      <div className="route-anim">
      {tab === 'dashboard' && (
        <>
          <section className="grid stats">
            <div className="stat"><div className="stat-label">Total Users</div><div className="stat-num">{totalUsers}</div></div>
            <div className="stat"><div className="stat-label">Active Jobs</div><div className="stat-num">{activeJobs}</div></div>
            <div className="stat"><div className="stat-label">Total Applications</div><div className="stat-num">{totalApps}</div></div>
            <div className="stat"><div className="stat-label">System Health</div><div className="stat-num">{systemHealth}%</div></div>
          </section>

          <section className="grid" style={{ gridTemplateColumns: '2fr 2fr' }}>
            <div className="card-box">
              <h3>Monthly Trends</h3>
              <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 10 }}>
                {months.map((m, i) => (
                  <div key={m} className="row-between">
                    <div style={{ width: 40 }} className="muted">{m}</div>
                    <div style={{ flex: 1, marginLeft: 8 }}>
                      <BarRow label="Applications" value={appsTrend[i]} total={70} />
                      <BarRow label="Placements" value={placeTrend[i]} total={30} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-box">
              <h3>Department Performance</h3>
              <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 12 }}>
                {departments.map((d) => (
                  <BarRow key={d.name} label={d.name} value={d.success} total={40} />
                ))}
              </div>
            </div>
          </section>

          <section className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
            <div className="card-box">
              <h3>Recent Activity</h3>
              {recent.map((r, idx) => (
                <div key={idx} className="demo-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>{r.text}</div>
                  <div className="muted">{r.meta}</div>
                </div>
              ))}
            </div>
            <div className="card-box">
              <h3>Quick Actions</h3>
              <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 10 }}>
                <button onClick={() => setTab('users')}>Manage Users</button>
                <button onClick={() => setTab('settings')}>System Settings</button>
                <button onClick={() => setTab('data')}>Placement Records</button>
              </div>
            </div>
          </section>
        </>
      )}

      {tab === 'users' && (
        <>
          <section className="card-box">
            <h3>Add user</h3>
            <form className="form-grid" onSubmit={(e) => { e.preventDefault(); if (!form.name || !form.email || !form.password) return; actions.addUser(form); setForm({ name: '', email: '', password: '', role: 'student' }) }}>
              <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="student">Student</option>
                <option value="employer">Employer</option>
                <option value="officer">Placement Officer</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit">Create</button>
            </form>
          </section>

          <section>
            <h3>All users</h3>
            <table className="table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
              <tbody>
                {state.users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
                    <td className="actions">
                      <button className="secondary" onClick={() => actions.updateUser(u.id, { role: u.role === 'student' ? 'employer' : 'student' })}>Toggle role</button>
                      <button className="secondary" onClick={() => actions.removeUser(u.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {tab === 'settings' && (
        <section className="card-box">
          <h3>System Settings</h3>
          <div className="row-gap">
            <button onClick={() => actions.toggleTheme()}>{state.settings.theme === 'dark' ? 'Switch to light' : 'Switch to dark'}</button>
            <button className="secondary" onClick={() => { localStorage.clear(); location.reload() }}>Clear local data</button>
          </div>
        </section>
      )}

      {tab === 'data' && (
        <>
          <section className="card-box">
            <h3>Applications</h3>
            <table className="table compact">
              <thead><tr><th>Student</th><th>Job</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {state.applications.map((a) => {
                  const job = state.jobs.find((j) => j.id === a.jobId)
                  return (
                    <tr key={a.id}>
                      <td>{a.studentName}</td>
                      <td>{job?.title} @ {job?.company}</td>
                      <td>{a.status}</td>
                      <td className="actions">
                        <button onClick={() => actions.updateApplication(a.id, { status: 'Shortlisted' })}>Shortlist</button>
                        <button className="secondary" onClick={() => actions.updateApplication(a.id, { status: 'Rejected' })}>Reject</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </section>

          <section className="card-box">
            <h3>Placements</h3>
            <table className="table compact">
              <thead><tr><th>Student</th><th>Role</th><th>Company</th><th>Package (LPA)</th></tr></thead>
              <tbody>
                {state.placements.map((p) => {
                  const app = state.applications.find((a) => a.id === p.applicationId)
                  const job = state.jobs.find((j) => j.id === app?.jobId)
                  return <tr key={p.id}><td>{app?.studentName}</td><td>{job?.title}</td><td>{job?.company}</td><td>{p.packageLPA}</td></tr>
                })}
                {state.placements.length === 0 && <tr><td colSpan="4" className="muted">No placements yet.</td></tr>}
              </tbody>
            </table>
          </section>
        </>
      )}
      </div>
    </div>
  )
}


