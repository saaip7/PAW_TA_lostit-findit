import UserAccountsTable from '@/components/admin/UserAccountTable'

export default function UserAccounts() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Semua Akun Pengguna</h1>
      <UserAccountsTable />
    </div>
  )
}

