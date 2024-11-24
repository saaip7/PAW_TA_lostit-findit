"use client";
import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trash2 } from 'lucide-react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface User {
  _id: string
  nama: string 
  email: string
  noHP: string
  role: 'user' | 'admin'
}

export default function UserAccountsTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const token = Cookies.get('authToken')
      if (!token) {
        throw new Error('No authentication token found')
      }

      // First verify if the user is admin
      const userResponse = await axios.get('http://localhost:5000/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (userResponse.data.role !== 'admin') {
        throw new Error('Unauthorized access')
      }

      // Then fetch all users
      const response = await axios.get('http://localhost:5000/api/user/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUsers(response.data)
      setError(null)
    } catch (error: any) {
      console.error('Error fetching users:', error)
      setError(error.response?.data?.message || 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const token = Cookies.get('authToken')
      if (!token) {
        throw new Error('No authentication token found')
      }

      await axios.delete(`http://localhost:5000/api/user/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      await fetchUsers()
    } catch (error: any) {
      console.error('Error deleting user:', error)
      setError(error.response?.data?.message || 'Failed to delete user')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !users.length) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>No. HP</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.nama}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.noHP}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button disabled={loading} className="text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
                      <p>Apakah Anda yakin ingin menghapus pengguna ini?</p>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDelete(user._id)}
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-700"
                      >
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}