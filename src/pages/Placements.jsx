import { useMemo } from 'react'
import { useAppState } from '../state/AppState.jsx'

export default function Placements() {
  const { state } = useAppState()
  const rows = useMemo(() => state.placements.map((p) => {
    const app = state.applications.find((a) => a.id === p.applicationId)
    const job = state.jobs.find((j) => j.id === app?.jobId)
    return { id: p.id, name: app?.studentName, role: job?.title, company: job?.company, lpa: p.packageLPA, date: p.createdAt }
  }), [state])

  return (
    <div className="page">
      <header className="page-header">
        <h2>Placement records</h2>
        <p className="muted">Recent offers and accepted placements recorded by the placement office.</p>
      </header>
      <table className="table">
        <thead><tr><th>Student</th><th>Role</th><th>Company</th><th>Package (LPA)</th><th>Date</th></tr></thead>
        <tbody>
          {rows.map(r => <tr key={r.id}><td>{r.name}</td><td>{r.role}</td><td>{r.company}</td><td>{r.lpa}</td><td>{new Date(r.date).toLocaleDateString()}</td></tr>)}
          {rows.length === 0 && <tr><td colSpan="5" className="muted">No placements yet.</td></tr>}
        </tbody>
      </table>
    </div>
  )
}


