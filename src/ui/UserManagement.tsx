import React from 'react'
import { useData } from '../context/DataContext'
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material'

export default function UserManagement() {
  const data = useData()
  const changeRole = (id: string, role: string) => {
    const r = data.changeUserRole(id, role)
    if (r.ok) alert('Role changed')
    else alert('Failed')
  }

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.users.map((u: any) => (
            <TableRow key={u.id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>
                <Button onClick={() => changeRole(u.id, 'PO')}>Make PO</Button>
                <Button onClick={() => changeRole(u.id, 'Employer')}>Make Employer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
