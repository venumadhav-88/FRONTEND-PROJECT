import { User, Role } from '../context/AuthContext'
import { v4 as uuidv4 } from 'uuid'

export interface Job {
  id: string
  company: string
  title: string
  description?: string
  employerId?: string
}

export interface Application {
  id: string
  studentId: string
  jobId: string
  status: 'Applied' | 'Shortlisted' | 'Placed'
}

export const MOCK_USERS: Array<User & { password?: string }> = [
  { id: 'u1', name: 'alice', role: 'Student', password: 'pass' },
  { id: 'u2', name: 'bob', role: 'Employer', password: 'pass' },
  { id: 'u3', name: 'carol', role: 'PO', password: 'pass' },
  { id: 'u4', name: 'admin', role: 'Admin', password: 'admin' },
]

export const MOCK_JOBS: Job[] = [
  { id: 'j1', company: 'Acme Corp', title: 'Frontend Engineer', description: 'Work on the web UI', employerId: 'u2' },
  { id: 'j2', company: 'Beta LLC', title: 'Backend Engineer', description: 'APIs and services', employerId: 'u2' },
]

export let MOCK_APPLICATIONS: Application[] = [
  { id: 'a1', studentId: 'u1', jobId: 'j1', status: 'Applied' },
]

export function applyToJob(studentId: string, jobId: string) {
  const exists = MOCK_APPLICATIONS.find((a) => a.studentId === studentId && a.jobId === jobId)
  if (exists) return { ok: false, message: 'Already applied' }
  const app: Application = { id: uuidv4(), studentId, jobId, status: 'Applied' }
  MOCK_APPLICATIONS.push(app)
  return { ok: true, application: app }
}

export function postJob(employerId: string, job: Omit<Job, 'id' | 'employerId'>) {
  const j: Job = { id: uuidv4(), ...job, employerId }
  MOCK_JOBS.push(j)
  return j
}

export function updateApplicationStatus(applicationId: string, status: Application['status']) {
  const a = MOCK_APPLICATIONS.find((x) => x.id === applicationId)
  if (!a) return { ok: false }
  a.status = status
  return { ok: true, application: a }
}

export function registerUser(name: string, password: string, role: Role) {
  const exists = MOCK_USERS.find((u) => u.name === name)
  if (exists) return { ok: false, message: 'User already exists' }
  const newUser: User & { password?: string } = { id: uuidv4(), name, role, password }
  MOCK_USERS.push(newUser)
  return { ok: true, user: newUser }
}
