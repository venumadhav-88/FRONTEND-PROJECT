import { Link, Outlet } from 'react-router-dom'
import { useAppState } from '../state/AppState.jsx'
import PageTransition from './PageTransition.jsx'
import { useReveal } from '../hooks/useReveal.js'

export default function PublicLayout() {
  const { currentUser, actions, state } = useAppState()
  useReveal()

  return (
    <div className="public-shell">
      <header className="public-topbar">
        <nav className="public-nav">
          <Link to="/" className="brand">Placement</Link>
          <Link to="/jobs" className="nav-link">Jobs</Link>
          <Link to="/placements" className="nav-link">Placements</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <div className="spacer" />
          <button className="btn small" onClick={() => actions.toggleTheme()}>{state.settings.theme === 'dark' ? 'Light' : 'Dark'} mode</button>
          <Link to="/login" className="link nav-link">Login</Link>
          <Link to="/signup" className="btn small">Sign up</Link>
        </nav>
      </header>
      <main>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <footer className="public-footer">© {new Date().getFullYear()} Placement</footer>
    </div>
  )
}


