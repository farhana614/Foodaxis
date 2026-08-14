import { useState } from 'react'
import { Plus, Pencil, Trash2, UserCheck, UserX } from 'lucide-react'
import { MOCK_STAFF } from '../../utils/mockData'
import Table from '../../components/common/Table'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import Badge from '../../components/common/Badge'

export default function StaffManagement() {
  const [staff, setStaff] = useState(MOCK_STAFF)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const roleColors = {
    admin: 'primary',
    kitchen: 'amber',
    rider: 'violet',
    superadmin: 'purple',
  }

  const columns = [
    { header: 'Staff', accessor: 'name', render: (row) => (
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
    { header: 'Status', accessor: 'status', render: (row) => (
      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
        row.status === 'active' ? 'text-emerald-600' : 'text-gray-500'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'}`} />
        {row.status}
      </span>
    )},
    { header: 'Joined', accessor: 'joinDate' },
    { header: 'Actions', render: (row) => (
      <div className="flex items-center gap-1">
        <button onClick={() => { setEditing(row); setModalOpen(true); }} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
          <Pencil className="w-4 h-4" />
        </button>
        <button onClick={() => toggleStatus(row.id)} className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg">
          {row.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
        </button>
        <button onClick={() => deleteStaff(row.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )},
  ]

  const toggleStatus = (id) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s))
  }

  const deleteStaff = (id) => {
    if (confirm('Delete this staff member?')) {
      setStaff(prev => prev.filter(s => s.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Staff Management</h1>
        <Button onClick={() => { setEditing(null); setModalOpen(true); }}>
          <Plus className="w-4 h-4" /> Add Staff
        </Button>
      </div>

      <div className="card">
        <Table columns={columns} data={staff} keyExtractor={(row) => row.id} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Staff' : 'Add Staff'} size="md">
        <div className="space-y-4">
          <Input label="Full Name" defaultValue={editing?.name} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Email" type="email" defaultValue={editing?.email} />
            <Input label="Phone" defaultValue={editing?.phone} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
              <select className="input-field" defaultValue={editing?.role || 'kitchen'}>
                <option value="kitchen">Kitchen Staff</option>
                <option value="rider">Delivery Rider</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select className="input-field" defaultValue={editing?.status || 'active'}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}