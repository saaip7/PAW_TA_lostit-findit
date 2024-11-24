'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/pagination/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AdminAccount {
  name: string
  email: string
}

export default function AdminAccountForm() {
  const [account, setAccount] = useState<AdminAccount>({ name: '', email: '' })
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    fetchAdminAccount()
  }, [])

  const fetchAdminAccount = async () => {
    const response = await fetch('/api/admin/account')
    const data = await response.json()
    setAccount(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    await fetch('/api/admin/account', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...account, password }),
    })
    alert('Account updated successfully')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={account.name}
          onChange={(e) => setAccount({ ...account, name: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={account.email}
          onChange={(e) => setAccount({ ...account, email: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  )
}

