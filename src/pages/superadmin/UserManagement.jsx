import { useState } from 'react'
import { Search, Shield, UserCheck, UserX } from 'lucide-react'
import { MOCK_USERS } from '../../utils/mockData'
import Table from '../../components/common/Table'
import Badge from '../../components/common/Badge'

export default function UserManagement() {
  const [users] = useState(Object.values(MOCK_USERS))
  const [search, setSearch] = useState('')

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const roleColors = {
    customer: 'blue',
    admin: 'primary',
    kitchen: 'amber',
    rider: 'violet',
    superadmin: 'purple',
  }

  const columns = [
    { header: 'User', accessor: 'name', render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="font-bold text-gray-600 text-sm">{row.name[0]}</span>
        </div>
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">{row.email}</p>
        </div>
      </div>
    )},
    { header: 'Role', accessor: 'role', render: (row) => (
      <Badge variant={roleColors[row.role] || 'default'}>{row.role}</Badge>
    )},
    { header: 'Phone', accessor: 'phone' },
    { header: 'ID', accessor: 'id' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="page-title">User Management</h1>

      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        </div>
        <Table columns={columns} data={filtered} keyExtractor={(row) => row.id} />
      </div>
    </div>
  )
}