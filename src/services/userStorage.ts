import { USERS_STORAGE_KEY } from '../constants/storage'
import type { User } from '../interfaces/User'

export function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as User[]
  } catch {
    return []
  }
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}
