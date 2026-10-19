import { useEffect, useMemo, useState } from 'react'
import {
  emptyUserForm,
  type User,
  type UserFormData,
} from '../interfaces/User'
import { fetchUsersFromApi } from '../services/userApi'
import { loadUsers, saveUsers } from '../services/userStorage'

export function useUsers() {
  const [users, setUsers] = useState<User[]>(() => loadUsers())
  const [form, setForm] = useState<UserFormData>(emptyUserForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    saveUsers(users)
  }, [users])

  const stats = useMemo(
    () => ({
      total: users.length,
      fromApi: users.filter((user) => user.source === 'api').length,
      fromLocal: users.filter((user) => user.source === 'local').length,
    }),
    [users],
  )

  function changeForm(field: keyof UserFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function submitForm() {
    const name = form.name.trim()
    const email = form.email.trim()
    if (!name || !email) return

    if (editingId) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingId
            ? {
                ...user,
                name,
                email,
                phone: form.phone.trim() || undefined,
                company: form.company.trim() || undefined,
              }
            : user,
        ),
      )
      setEditingId(null)
    } else {
      const newUser: User = {
        id: `local-${crypto.randomUUID()}`,
        name,
        email,
        phone: form.phone.trim() || undefined,
        company: form.company.trim() || undefined,
        source: 'local',
      }
      setUsers((prev) => [newUser, ...prev])
    }

    setForm(emptyUserForm)
    setError(null)
  }

  function startEdit(user: User) {
    setEditingId(user.id)
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone ?? '',
      company: user.company ?? '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(emptyUserForm)
  }

  function removeUser(id: string) {
    const confirmed = window.confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')
    if (!confirmed) return

    setUsers((prev) => prev.filter((user) => user.id !== id))
    if (editingId === id) {
      cancelEdit()
    }
  }

  async function refreshFromApi() {
    setLoading(true)
    setError(null)
    try {
      const apiUsers = await fetchUsersFromApi()
      setUsers(apiUsers)
      setEditingId(null)
      setForm(emptyUserForm)
    } catch {
      setError('API verisi alınamadı. Bağlantınızı kontrol edip tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return {
    users,
    form,
    editingId,
    loading,
    error,
    stats,
    changeForm,
    submitForm,
    startEdit,
    cancelEdit,
    removeUser,
    refreshFromApi,
  }
}
