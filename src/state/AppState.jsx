import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// Keys for localStorage
const STORAGE_KEY = 'placement_app_state_v1'

const AppStateContext = createContext(null)

const getInitialState = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // fallthrough to fresh state
    }
  }
  return {
    users: [
      { id: 'u1', name: 'Alex Admin', role: 'admin', email: 'admin@example.com', password: 'admin123' },
      { id: 'u2', name: 'Sam Student', role: 'student', email: 'sam@student.com', password: 'password' },
      { id: 'u3', name: 'Erin Employer', role: 'employer', email: 'erin@employer.com', password: 'password' },
      { id: 'u4', name: 'Pat Officer', role: 'officer', email: 'pat@officer.com', password: 'password' },
    ],
    currentUserId: null,
    jobs: [
      {
        id: 'j1',
        title: 'Frontend Developer',
        company: 'NovaSoft',
        location: 'Remote',
        type: 'Full-time',
        postedAt: new Date().toISOString(),
        description: 'Build delightful UIs with React and modern tooling.',
      },
      {
        id: 'j2',
        title: 'Data Analyst',
        company: 'Insight Labs',
        location: 'Hyderabad',
        type: 'Internship',
        postedAt: new Date().toISOString(),
        description: 'Analyze datasets and generate actionable insights.',
      },
    ],
    applications: [
      { id: 'a1', jobId: 'j1', studentName: 'Sam Student', status: 'Submitted' },
    ],
    placements: [],
    interactions: [],
    settings: { theme: 'dark' },
  }
}

export function AppStateProvider({ children }) {
  const [state, setState] = useState(getInitialState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // Reflect theme on document element for CSS theme variables
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', state.settings.theme)
  }, [state.settings.theme])

  const currentUser = useMemo(
    () => state.users.find((u) => u.id === state.currentUserId),
    [state.users, state.currentUserId],
  )

  const actions = {
    loginById(userId) { setState((s) => ({ ...s, currentUserId: userId })) },
    loginWithCredentials({ email, password }) {
      const found = state.users.find((u) => u.email === email && u.password === password)
      if (!found) throw new Error('Invalid credentials')
      setState((s) => ({ ...s, currentUserId: found.id }))
    },
    // Admin utilities
    addUser(user) {
      setState((s) => ({ ...s, users: [...s.users, { ...user, id: crypto.randomUUID() }] }))
    },
    updateUser(userId, updates) {
      setState((s) => ({ ...s, users: s.users.map((u) => (u.id === userId ? { ...u, ...updates } : u)) }))
    },
    removeUser(userId) {
      setState((s) => ({ ...s, users: s.users.filter((u) => u.id !== userId) }))
    },
    logout() { setState((s) => ({ ...s, currentUserId: null })) },
    signup({ name, email, password, role }) {
      const exists = state.users.some((u) => u.email === email)
      if (exists) throw new Error('Email already registered')
      const newUser = { id: crypto.randomUUID(), name, email, password, role }
      setState((s) => ({ ...s, users: [...s.users, newUser], currentUserId: newUser.id }))
    },
    switchUser(userId) {
      setState((s) => ({ ...s, currentUserId: userId }))
    },
    setTheme(theme) { setState((s) => ({ ...s, settings: { ...s.settings, theme } })) },
    toggleTheme() { setState((s) => ({ ...s, settings: { ...s.settings, theme: s.settings.theme === 'dark' ? 'light' : 'dark' } })) },
    postJob(job) {
      setState((s) => ({ ...s, jobs: [{ ...job, id: crypto.randomUUID(), postedAt: new Date().toISOString() }, ...s.jobs] }))
    },
    applyToJob({ jobId, studentName }) {
      setState((s) => ({ ...s, applications: [{ id: crypto.randomUUID(), jobId, studentName, status: 'Submitted' }, ...s.applications] }))
    },
    updateApplication(appId, updates) {
      setState((s) => ({
        ...s,
        applications: s.applications.map((a) => (a.id === appId ? { ...a, ...updates } : a)),
      }))
    },
    recordPlacement({ applicationId, packageLPA }) {
      setState((s) => ({ ...s, placements: [{ id: crypto.randomUUID(), applicationId, packageLPA, createdAt: new Date().toISOString() }, ...s.placements] }))
    },
  }

  const value = useMemo(() => ({ state, actions, currentUser }), [state, currentUser])
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}


