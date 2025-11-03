import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      {/* Hero like Apple: big type, clean, full-bleed cards */}
      <section className="hero">
        <h1 className="hero-title">Shape futures.<br />At scale.</h1>
        <p className="hero-sub">A beautifully simple platform to connect students, employers, and placement teams.</p>
        <div className="hero-cta">
          <Link to="/signup" className="btn">Get started</Link>
          <Link to="/login" className="link">Sign in</Link>
        </div>

        {/* Animated visual */}
        <div className="hero-visual">
          <div className="blob b1"></div>
          <div className="blob b2"></div>
          <div className="blob b3"></div>
          <div className="grid-lines"/>
        </div>
      </section>

      <section className="showcase-grid">
        <article className="showcase one">
          <div className="text">
            <h2>Students</h2>
            <p>Discover opportunities. Apply in one click. Track everything.</p>
            <Link to="/login" className="link">Explore jobs →</Link>
          </div>
        </article>
        <article className="showcase two">
          <div className="text">
            <h2>Employers</h2>
            <p>Post roles. Review talent. Hire faster.</p>
            <Link to="/login" className="link">Post a role →</Link>
          </div>
        </article>
        <article className="showcase three">
          <div className="text">
            <h2>Placement</h2>
            <p>Real-time dashboards. Elegant reports. Clear outcomes.</p>
            <Link to="/login" className="link">View dashboards →</Link>
          </div>
        </article>
      </section>

      {/* About section */}
      <section className="about">
        <div className="about-wrap">
          <h2>Why a Placement Interaction System?</h2>
          <p>
            Streamline end-to-end campus hiring—publish jobs, manage applications,
            coordinate interviews, and track offers and placements with full visibility
            for students, employers, and the placement office.
          </p>
          <ul>
            <li>Unified workflows for Students, Employers, and Officers</li>
            <li>Transparent application tracking and timely updates</li>
            <li>Actionable analytics and exportable reports</li>
            <li>Privacy-first, fast, and accessible</li>
          </ul>
        </div>
      </section>
    </>
  )
}


