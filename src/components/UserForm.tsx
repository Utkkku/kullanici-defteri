import { motion } from 'framer-motion'
import type { FormEvent } from 'react'
import type { UserFormData } from '../interfaces/User'

interface UserFormProps {
  form: UserFormData
  isEditing: boolean
  onChange: (field: keyof UserFormData, value: string) => void
  onSubmit: () => void
  onCancelEdit: () => void
}

const fieldClass =
  'w-full border-0 border-b-2 border-line bg-transparent px-0 py-2.5 text-ink outline-none transition placeholder:text-muted/60 focus:border-accent'

export function UserForm({
  form,
  isEditing,
  onChange,
  onSubmit,
  onCancelEdit,
}: UserFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <motion.section
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="border-2 border-ink bg-surface p-5 sm:p-6"
    >
      <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
        <h2 className="font-display text-lg font-bold tracking-tight text-ink">
          {isEditing ? 'Düzenle' : 'Yeni kayıt'}
        </h2>
        <span className="font-display text-[11px] font-semibold uppercase tracking-widest text-muted">
          {isEditing ? 'Update' : 'Create'}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Ad soyad *
          </span>
          <input
            required
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Ada Lovelace"
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Email *
          </span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="ada@example.com"
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Telefon
          </span>
          <input
            value={form.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+90 555 000 00 00"
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Şirket
          </span>
          <input
            value={form.company}
            onChange={(e) => onChange('company', e.target.value)}
            placeholder="Analytical Engines"
            className={fieldClass}
          />
        </label>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="submit"
            className="bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
          >
            {isEditing ? 'Kaydet' : 'Ekle'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="border-2 border-ink bg-transparent px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-panel"
            >
              İptal
            </button>
          )}
        </div>
      </form>
    </motion.section>
  )
}
