'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Box, List, Package, User } from 'lucide-react'
import Cookies from 'js-cookie'

const menuItems = [
  { name: 'Barang Hilang', href: '/admin', icon: Package },
  { name: 'Akun Pengguna', href: '/admin/users', icon: User },
  { name: 'Pengaturan Akun', href: '/admin/account', icon: Box },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = () => {
    // Remove auth cookies
    Cookies.remove('authToken')
    Cookies.remove('isLoggedIn')
    
    // Redirect to login page
    router.push('/login')
  }

  return (
    <div className="flex flex-col w-64 bg-darkBlue1 border-r shadow-right">
      <div className="flex items-center justify-center h-16 border-b border-darkBlue2">
        <img src="/LogoWhite.png" alt="Logo" className="w-10 h-8 mr-2" />
        <span className="text-xl font-semibold text-white">Admin Dashboard</span>
      </div>
      <nav className="flex-grow">
        <ul className="flex flex-col py-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} passHref>
                <span className={`flex items-center px-6 py-3 text-white hover:bg-darkBlue2 ${
                  pathname === item.href ? 'bg-gray-100' : ''
                }`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={handleSignOut}
        className="flex items-center px-6 py-3 text-white hover:bg-darkBlue2"
      >
        <User className="w-5 h-5 mr-3" />
        Sign Out
      </button>
    </div>
  )
}

