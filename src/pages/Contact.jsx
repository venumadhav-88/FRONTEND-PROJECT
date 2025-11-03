import { useState } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="page">
      <header className="page-header">
        <h2>Contact us</h2>
        <p className="muted">Have a question? We’d love to hear from you.</p>
      </header>
      {sent ? (
        <div className="card-box">Thanks, we received your message.</div>
      ) : (
        <form onSubmit={onSubmit} className="form-grid" style={{ maxWidth: 600 }}>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <textarea rows="5" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  )
}


