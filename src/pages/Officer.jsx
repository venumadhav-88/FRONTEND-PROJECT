import { useMemo, useState } from 'react'
import { useAppState } from '../state/AppState.jsx'

export default function Officer() {
  const { state, actions } = useAppState()
  const [lpa, setLpa] = useState('6')

  const enrichedPlacements = useMemo(() => state.placements.map((p) => {
    const app = state.applications.find((a) => a.id === p.applicationId)
    const job = state.jobs.find((j) => j.id === app?.jobId)
    return { ...p, app, job }
  }), [state.placements, state.applications, state.jobs])

  const shortlisted = state.applications.filter((a) => a.status === 'Shortlisted')

  return (
    <div className="page">
      <header className="page-header">
        <h2>Placement Officer</h2>
        <p>Track records, generate reports, and facilitate interactions.</p>
      </header>

      <section className="grid stats">
        <div className="stat"><div className="stat-num">{state.jobs.length}</div><div className="stat-label">Open Jobs</div></div>
        <div className="stat"><div className="stat-num">{state.applications.length}</div><div className="stat-label">Applications</div></div>
        <div className="stat"><div className="stat-num">{enrichedPlacements.length}</div><div className="stat-label">Placements</div></div>
      </section>

      <section className="card-box">
        <h3>Record a Placement</h3>
        <div className="form-grid">
          <select id="appSel">
            {shortlisted.map((a) => {
              const job = state.jobs.find((j) => j.id === a.jobId)
              return <option key={a.id} value={a.id}>{a.studentName} — {job?.title} @ {job?.company}</option>
            })}
          </select>
          <input value={lpa} onChange={(e) => setLpa(e.target.value)} placeholder="Package (LPA)" />
          <button onClick={() => {
            const select = document.getElementById('appSel')
            if (select && select.value) actions.recordPlacement({ applicationId: select.value, packageLPA: lpa })
          }}>Save</button>
        </div>
      </section>

      <section>
        <h3>Placement Records</h3>
        <table className="table">
          <thead><tr><th>Candidate</th><th>Role</th><th>Company</th><th>Package (LPA)</th><th>Date</th></tr></thead>
          <tbody>
            {enrichedPlacements.map((p) => (
              <tr key={p.id}><td>{p.app?.studentName}</td><td>{p.job?.title}</td><td>{p.job?.company}</td><td>{p.packageLPA}</td><td>{new Date(p.createdAt).toLocaleDateString()}</td></tr>
            ))}
            {enrichedPlacements.length === 0 && <tr><td colSpan="5" className="muted">No placement records yet.</td></tr>}
          </tbody>
        </table>
      </section>
    </div>
  )
}


