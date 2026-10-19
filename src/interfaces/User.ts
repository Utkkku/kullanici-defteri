export type UserSource = 'api' | 'local'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  source: UserSource
}

export interface UserFormData {
  name: string
  email: string
  phone: string
  company: string
}

export const emptyUserForm: UserFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
}
