import { useMemo, useState } from 'react'
import { useAppState } from '../state/AppState.jsx'

export default function Jobs() {
  const { state } = useAppState()
  const [q, setQ] = useState('')
  const jobs = useMemo(() => state.jobs.filter(j => [j.title, j.company, j.location].join(' ').toLowerCase().includes(q.toLowerCase())), [state.jobs, q])

  return (
    <div className="page">
      <header className="page-header">
        <h2>Open roles</h2>
        <p className="muted">Browse internships and full-time opportunities posted by employers.</p>
      </header>
      <div className="toolbar">
        <input placeholder="Search roles, company, location" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="grid">
        {jobs.map((j) => (
          <div key={j.id} className="card-box">
            <h4>{j.title}</h4>
            <p className="muted">{j.company} • {j.location} • {j.type}</p>
            <p>{j.description}</p>
          </div>
        ))}
        {jobs.length === 0 && <p className="muted">No matching roles.</p>}
      </div>
    </div>
  )
}


