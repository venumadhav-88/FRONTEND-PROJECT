import { useMemo, useRef, useState } from 'react'
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

export default function Employer() {
  const { state, actions, currentUser } = useAppState()
  const [form, setForm] = useState({ title: '', company: currentUser.name + ' Co.', location: '', type: 'Full-time', description: '' })
  const postRef = useRef(null)
  const appsRef = useRef(null)

  const myJobs = state.jobs.filter((j) => !j.posterId || j.posterId === currentUser.id)
  const myApplications = state.applications.filter((a) => myJobs.some((j) => j.id === a.jobId))
  const pendingReviews = myApplications.filter((a) => a.status === 'Submitted').length
  const hiredCandidates = state.placements.filter((p) => myJobs.some((j) => j.id === state.applications.find((a)=>a.id===p.applicationId)?.jobId)).length

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    actions.postJob({ ...form, posterId: currentUser.id })
    setForm({ title: '', company: form.company, location: '', type: 'Full-time', description: '' })
  }

  const applicantsByJob = (jobId) => state.applications.filter((a) => a.jobId === jobId)

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
        <div className="stat"><div className="stat-label">My Job Listings</div><div className="stat-num">{myJobs.length}</div></div>
        <div className="stat"><div className="stat-label">Total Applications</div><div className="stat-num">{myApplications.length}</div></div>
        <div className="stat"><div className="stat-label">Pending Reviews</div><div className="stat-num">{pendingReviews}</div></div>
        <div className="stat"><div className="stat-label">Hired Candidates</div><div className="stat-num">{hiredCandidates}</div></div>
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
          {myApplications.slice(0,1).map((a) => (
            <div key={a.id} className="demo-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{a.studentName} applied</div>
              <div className="muted">{new Date().toISOString().slice(0,10)}</div>
            </div>
          ))}
          {myApplications.length === 0 && <div className="muted">No recent activity.</div>}
        </div>
        <div className="card-box">
          <h3>Quick Actions</h3>
          <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 10 }}>
            <button onClick={() => postRef.current?.scrollIntoView({ behavior: 'smooth' })}>Post New Job</button>
            <button className="secondary" onClick={() => appsRef.current?.scrollIntoView({ behavior: 'smooth' })}>Review Applications</button>
          </div>
        </div>
      </section>

      <section ref={postRef} className="card-box">
        <h3>Post a Job</h3>
        <form onSubmit={onSubmit} className="form-grid">
          <input placeholder="Job title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
          <textarea rows="3" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button type="submit">Publish</button>
        </form>
      </section>

      <section ref={appsRef}>
        <h3>My Job Listings</h3>
        {myJobs.map((j) => (
          <div key={j.id} className="card-box">
            <div className="row-between">
              <div>
                <h4>{j.title}</h4>
                <p className="muted">{j.company} • {j.location} • {j.type}</p>
              </div>
            </div>
            <details open>
              <summary>Applicants ({applicantsByJob(j.id).length})</summary>
              <table className="table compact">
                <thead><tr><th>Student</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {applicantsByJob(j.id).map((a) => (
                    <tr key={a.id}>
                      <td>{a.studentName}</td>
                      <td>{a.status}</td>
                      <td className="actions">
                        <button onClick={() => actions.updateApplication(a.id, { status: 'Shortlisted' })}>Shortlist</button>
                        <button onClick={() => actions.updateApplication(a.id, { status: 'Rejected' })} className="secondary">Reject</button>
                      </td>
                    </tr>
                  ))}
                  {applicantsByJob(j.id).length === 0 && <tr><td colSpan="3" className="muted">No applicants yet.</td></tr>}
                </tbody>
              </table>
            </details>
          </div>
        ))}
        {myJobs.length === 0 && <div className="muted">No job listings yet.</div>}
      </section>
    </div>
  )
}


