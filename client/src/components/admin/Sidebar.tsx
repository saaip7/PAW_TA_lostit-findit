'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Settings , Package, User, ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import Cookies from 'js-cookie'
import { useState } from 'react'

const menuItems = [
  { name: 'Barang Hilang', href: '/admin', icon: Package },
  { name: 'Akun Pengguna', href: '/admin/users', icon: User },
  { name: 'Pengaturan Akun', href: '/admin/account', icon: Settings  },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = () => {
    // Remove auth cookies
    Cookies.remove('authToken')
    Cookies.remove('isLoggedIn')
    
    // Redirect to login page
    router.push('/login')
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className={`flex flex-col ${collapsed ? 'w-16' : 'w-64'} bg-darkBlue1 border-r shadow-right transition-all duration-300 ease-in-out`}>
      <div className={`flex items-center h-16 border-b border-darkBlue2 ${collapsed ? 'justify-center px-auto' : 'justify-between px-4'}`}>
        {!collapsed && (
          <div className="flex items-center">
            <img src="/LogoWhite.png" alt="Logo" className="w-10 h-8 mr-2" />
            <span className="text-[0.9vw] font-semibold text-white whitespace-nowrap">Admin Dashboard</span>
          </div>
        )}
        <button onClick={toggleCollapse} className="text-white">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="flex-grow">
        <ul className="flex flex-col py-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} passHref>
                <span className={`flex items-center px-6 py-3 text-white hover:bg-darkBlue2 ${
                  pathname === item.href ? 'bg-gray-100' : ''
                }`}
                >
                  <item.icon className={`${collapsed ? 'w-6 h-6' : 'w-6 h-6 mr-3'} `}/> {/* Tetap w-6 h-6 terlepas dari collapsed */}
                  {!collapsed && (
                    <span className="text-[0.9vw] whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
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
        <LogOut className={`${collapsed ? 'w-6 h-6 mr-0' : 'w-6 h-6 mr-3'} `} />
        {!collapsed && (
          <span className="text-[0.9vw] whitespace-nowrap">Keluar</span>
        )}
      </button>
    </div>
  )
}
