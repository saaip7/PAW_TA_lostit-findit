"use client";
import Sidebar from '@/components/admin/Sidebar'
import { useAdminProtected } from '@/hooks/useAdminProtected';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useAdminProtected();
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        {children}
      </main>
    </div>
  )
}

