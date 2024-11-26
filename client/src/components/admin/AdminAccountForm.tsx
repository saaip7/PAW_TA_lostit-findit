'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/pagination/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      const response = await fetch(`${API_URL}/api/user/me`, {
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
      toast.error('Failed to load account information', {closeOnClick: true});
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        toast.warn('Passwords do not match!', {closeOnClick: true});
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
      const userResponse = await fetch(`${API_URL}/api/user/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const user = await userResponse.json()

      // Update user data
      const response = await fetch(`${API_URL}/api/user/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      })

      if (response.ok) {
        toast.success('Profile updated successfully!', {closeOnClick: true});
        setPassword('')
        setConfirmPassword('')
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Failed to update profile', {closeOnClick: true});
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('An error occurred while updating profile', {closeOnClick: true});
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
      <Button className='bg-darkBlue1 text-white font-medium hover:bg-[#3776E9] rounded-md' type="submit">Save Changes</Button>
    </form>
  )
}