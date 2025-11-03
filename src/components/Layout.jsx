import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAppState } from '../state/AppState.jsx'
import PageTransition from './PageTransition.jsx'
import { useReveal } from '../hooks/useReveal.js'

export default function Layout() {
  const { state, actions, currentUser } = useAppState()
  useReveal()

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/" className="brand">Placement</Link>
        <div className="muted" style={{ marginTop: 8 }}>Role: <strong>{currentUser.role}</strong></div>

        <nav>
          {currentUser.role === 'student' && <NavLink to="/app/student">Overview</NavLink>}
          {currentUser.role === 'employer' && <NavLink to="/app/employer">Overview</NavLink>}
          {currentUser.role === 'officer' && <NavLink to="/app/officer">Overview</NavLink>}
          {currentUser.role === 'admin' && <NavLink to="/app/admin">Overview</NavLink>}
        </nav>
        <div className="row-gap">
          <button className="secondary" onClick={() => actions.toggleTheme()}>{state.settings.theme === 'dark' ? 'Light' : 'Dark'} mode</button>
          <button className="secondary" onClick={() => actions.logout()}>Logout</button>
        </div>
        <footer className="sidebar-foot">Signed in as <strong>{currentUser.name}</strong></footer>
      </aside>
      <main className="content">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  )
}


