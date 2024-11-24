import UserAccountsTable from '@/components/admin/UserAccountTable'

export default function UserAccounts() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">User Accounts</h1>
      <UserAccountsTable />
    </div>
  )
}

