'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/pagination/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Cookies from 'js-cookie'

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
    try {
      const token = Cookies.get('authToken')
      const response = await fetch('http://localhost:5000/api/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const userData = await response.json()
        setAccount({
          name: userData.nama,
          email: userData.email
        })
      } else {
        throw new Error('Failed to fetch user data')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      alert('Failed to load account information')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        alert('Passwords do not match!')
        return
      }
    }

    try {
      const token = Cookies.get('authToken')
      const userData: any = {}

      if (account.name) userData.nama = account.name
      if (account.email) userData.email = account.email
      if (password) userData.password = password

      // Get current user ID
      const userResponse = await fetch('http://localhost:5000/api/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const user = await userResponse.json()

      // Update user data
      const response = await fetch(`http://localhost:5000/api/user/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      })

      if (response.ok) {
        alert('Profile updated successfully!')
        setPassword('')
        setConfirmPassword('')
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('An error occurred while updating profile')
    }
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