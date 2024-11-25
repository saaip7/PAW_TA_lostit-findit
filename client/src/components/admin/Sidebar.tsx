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
      <div className={`flex items-center h-16 border-b border-darkBlue2 ${collapsed ? 'justify-center' : 'justify-between px-4'}`}>
        {!collapsed && (
          <div className="flex items-center overflow-hidden">
            <img src="/LogoWhite.png" alt="Logo" className="w-10 h-8 mr-2 flex-shrink-0" />
            <span className="text-sm lg:text-base font-semibold text-white whitespace-nowrap">Admin Dashboard</span>
          </div>
        )}
        <button onClick={toggleCollapse} className="text-white p-2 hover:bg-darkBlue2 rounded-lg flex-shrink-0">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="flex-grow">
        <ul className="flex flex-col py-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} passHref>
                <span className={`flex items-center px-6 py-3 text-white hover:bg-darkBlue2 ${
                  pathname === item.href ? 'bg-darkBlue2' : ''
                }`}
                >
                  <item.icon className={`${collapsed ? 'w-6 h-6' : 'w-6 h-6 mr-3'} flex-shrink-0`}/>
                  {!collapsed && (
                    <span className="text-sm lg:text-base whitespace-nowrap">
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
        <LogOut className={`${collapsed ? 'w-6 h-6' : 'w-6 h-6 mr-3'} flex-shrink-0`} />
        {!collapsed && (
          <span className="text-sm lg:text-base whitespace-nowrap">
            Keluar
          </span>
        )}
      </button>
    </div>
  )
}
