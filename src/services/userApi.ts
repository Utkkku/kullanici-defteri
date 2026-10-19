import { USERS_API_URL } from '../constants/storage'
import type { User } from '../interfaces/User'

interface JsonPlaceholderUser {
  id: number
  name: string
  email: string
  phone: string
  company: { name: string }
}

export async function fetchUsersFromApi(): Promise<User[]> {
  const response = await fetch(USERS_API_URL)
  if (!response.ok) {
    throw new Error('API isteği başarısız oldu')
  }

  const data = (await response.json()) as JsonPlaceholderUser[]

  return data.map((item) => ({
    id: `api-${item.id}`,
    name: item.name,
    email: item.email,
    phone: item.phone,
    company: item.company.name,
    source: 'api' as const,
  }))
}
