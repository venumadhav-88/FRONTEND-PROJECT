import React, { createContext, useContext, useState } from 'react'
import { Job, Application, MOCK_JOBS, MOCK_APPLICATIONS, MOCK_USERS, applyToJob as mockApplyToJob, postJob as mockPostJob, updateApplicationStatus as mockUpdateApplicationStatus, registerUser as mockRegisterUser } from '../data/mock'

interface DataContextValue {
  jobs: Job[]
  applications: Application[]
  users: any[]
  applyToJob: (studentId: string, jobId: string) => { ok: boolean; message?: string }
  postJob: (employerId: string, job: Omit<Job, 'id' | 'employerId'>) => Job
  updateApplicationStatus: (applicationId: string, status: Application['status']) => { ok: boolean }
  registerUser: (name: string, password: string, role: any) => { ok: boolean; message?: string }
  changeUserRole: (id: string, role: string) => { ok: boolean }
  deleteJob: (jobId: string) => { ok: boolean }
  deleteApplication: (applicationId: string) => { ok: boolean }
}

const DataContext = createContext<DataContextValue | undefined>(undefined)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([...MOCK_JOBS])
  const [applications, setApplications] = useState<Application[]>([...MOCK_APPLICATIONS])
  const [users, setUsers] = useState([...MOCK_USERS])

  function applyToJob(studentId: string, jobId: string) {
    const res = mockApplyToJob(studentId, jobId)
    if (!res.ok) return res
    setApplications([...MOCK_APPLICATIONS])
    return res
  }

  function postJob(employerId: string, job: Omit<Job, 'id' | 'employerId'>) {
    const j = mockPostJob(employerId, job)
    setJobs([...MOCK_JOBS])
    return j
  }

  function updateApplicationStatus(applicationId: string, status: Application['status']) {
    const r = mockUpdateApplicationStatus(applicationId, status)
    if (r.ok) setApplications([...MOCK_APPLICATIONS])
    return r
  }

  function registerUser(name: string, password: string, role: any) {
    const r = mockRegisterUser(name, password, role)
    if (r.ok) setUsers([...MOCK_USERS])
    return r
  }

  function changeUserRole(id: string, role: string) {
    const u = MOCK_USERS.find((x) => x.id === id)
    if (!u) return { ok: false }
    // @ts-ignore
    u.role = role
    setUsers([...MOCK_USERS])
    return { ok: true }
  }

  function deleteJob(jobId: string) {
    const idx = MOCK_JOBS.findIndex((j) => j.id === jobId)
    if (idx === -1) return { ok: false }
    MOCK_JOBS.splice(idx, 1)
    // remove related applications
    for (let i = MOCK_APPLICATIONS.length - 1; i >= 0; i--) {
      if (MOCK_APPLICATIONS[i].jobId === jobId) MOCK_APPLICATIONS.splice(i, 1)
    }
    setJobs([...MOCK_JOBS])
    setApplications([...MOCK_APPLICATIONS])
    return { ok: true }
  }

  function deleteApplication(applicationId: string) {
    const idx = MOCK_APPLICATIONS.findIndex((a) => a.id === applicationId)
    if (idx === -1) return { ok: false }
    MOCK_APPLICATIONS.splice(idx, 1)
    setApplications([...MOCK_APPLICATIONS])
    return { ok: true }
  }

  return (
    <DataContext.Provider value={{ jobs, applications, users, applyToJob, postJob, updateApplicationStatus, registerUser, changeUserRole, deleteJob, deleteApplication }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
