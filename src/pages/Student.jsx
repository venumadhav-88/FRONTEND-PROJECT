import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../state/AppState.jsx'

function BarRow({ label, value, total }) {
  const pct = Math.min(100, Math.round((value / (total || 1)) * 100))
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 50px', alignItems: 'center', gap: 12 }}>
      <div className="muted">{label}</div>
      <div style={{ height: 8, background: 'var(--layer)', borderRadius: 999, position: 'relative', border: '1px solid var(--border)' }}>
        <div style={{ width: pct + '%', height: '100%', background: 'linear-gradient(90deg, var(--accent), #66ffd1)', borderRadius: 999 }} />
      </div>
      <div className="muted" style={{ textAlign: 'right' }}>{value}</div>
    </div>
  )
}

export default function Student() {
  const { state, actions, currentUser } = useAppState()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const jobs = useMemo(() => state.jobs.filter((j) => [j.title, j.company, j.location].join(' ').toLowerCase().includes(query.toLowerCase())), [state.jobs, query])
  const myApps = state.applications.filter((a) => a.studentName === currentUser.name)
  const accepted = state.placements.filter((p) => {
    const app = state.applications.find((a) => a.id === p.applicationId)
    return app?.studentName === currentUser.name
  })
  const pending = myApps.filter((a) => a.status === 'Submitted').length

  const months = ['Jan','Feb','Mar','Apr','May','Jun']
  const appsTrend = [12,18,15,22,19,25]
  const placeTrend = [2,3,1,4,2,5]
  const departments = [
    { name: 'Computer Science', success: 29 },
    { name: 'Engineering', success: 29 },
    { name: 'Business', success: 28 },
    { name: 'Medicine', success: 28 },
    { name: 'Arts', success: 27 },
    { name: 'Science', success: 27 },
  ]

  return (
    <div className="page">
      <header className="page-header" style={{ marginBottom: 10 }}>
        <h2>Dashboard</h2>
        <p>Welcome back, {currentUser.name}! Here's what's happening with your placements.</p>
      </header>

      <section className="grid stats">
        <div className="stat"><div className="stat-label">My Applications</div><div className="stat-num">{myApps.length}</div></div>
        <div className="stat"><div className="stat-label">Available Jobs</div><div className="stat-num">{state.jobs.length}</div></div>
        <div className="stat"><div className="stat-label">Pending Reviews</div><div className="stat-num">{pending}</div></div>
        <div className="stat"><div className="stat-label">Accepted</div><div className="stat-num">{accepted.length}</div></div>
      </section>

      <section className="grid" style={{ gridTemplateColumns: '2fr 2fr' }}>
        <div className="card-box">
          <h3>Monthly Trends</h3>
          <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 10 }}>
      {months.map((m, i) => (
              <div key={m} className="row-between">
                <div style={{ width: 40 }} className="muted">{m}</div>
                <div style={{ flex: 1, marginLeft: 8 }}>
                  <BarRow label="Applications" value={appsTrend[i]} total={50} />
                  <BarRow label="Placements" value={placeTrend[i]} total={20} />
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

      <section className="grid route-anim" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="card-box">
          <h3>Recent Activity</h3>
          {myApps.slice(0,1).map((a) => {
            const job = state.jobs.find((j) => j.id === a.jobId)
            return (
              <div key={a.id} className="demo-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>{currentUser.name} applied for {job?.title}</div>
                <div className="muted">{job?.company} • {new Date().toISOString().slice(0,10)}</div>
              </div>
            )
          })}
          {myApps.length === 0 && <div className="muted">No recent activity.</div>}
        </div>
        <div className="card-box">
          <h3>Quick Actions</h3>
          <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 10 }}>
            <button onClick={() => navigate('/jobs')}>Browse Job Opportunities</button>
            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight/2, behavior: 'smooth' })} className="secondary">View My Applications</button>
          </div>
        </div>
      </section>

      <div className="toolbar" style={{ marginTop: 10 }}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jobs..." />
      </div>

      <section>
        <h3>Open Jobs</h3>
        <div className="grid">
          {jobs.map((j) => (
            <div key={j.id} className="card-box">
              <h4>{j.title}</h4>
              <p className="muted">{j.company} • {j.location} • {j.type}</p>
              <p>{j.description}</p>
              <button onClick={() => actions.applyToJob({ jobId: j.id, studentName: currentUser.name })}>Apply</button>
            </div>
          ))}
          {jobs.length === 0 && <p className="muted">No jobs found.</p>}
        </div>
      </section>

      <section>
        <h3>My Applications</h3>
        <table className="table">
          <thead><tr><th>Job</th><th>Status</th></tr></thead>
          <tbody>
            {myApps.map((a) => {
              const job = state.jobs.find((j) => j.id === a.jobId)
              return (
                <tr key={a.id}><td>{job?.title} @ {job?.company}</td><td>{a.status}</td></tr>
              )
            })}
            {myApps.length === 0 && <tr><td colSpan="2" className="muted">You have not applied yet.</td></tr>}
          </tbody>
        </table>
      </section>
    </div>
  )
}


