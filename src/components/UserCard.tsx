import { motion } from 'framer-motion'
import type { User } from '../interfaces/User'

interface UserCardProps {
  user: User
  index: number
  onEdit: (user: User) => void
  onDelete: (id: string) => void
}

export function UserCard({ user, index, onEdit, onDelete }: UserCardProps) {
  const isApi = user.source === 'api'
  const row = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="group grid grid-cols-[auto_1fr_auto] items-start gap-3 border-b border-line py-4 sm:gap-5 sm:py-5"
    >
      <span className="pt-0.5 font-display text-xs font-semibold tabular-nums text-muted">
        {row}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
            {user.name}
          </h3>
          <span
            className={`text-[10px] font-bold uppercase tracking-[0.14em] ${
              isApi ? 'text-api' : 'text-local'
            }`}
          >
            {isApi ? 'API' : 'Lokal'}
          </span>
        </div>
        <p className="mt-1 truncate text-sm text-muted">{user.email}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/80">
          {user.phone && <span>{user.phone}</span>}
          {user.company && <span className="font-medium">{user.company}</span>}
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-1 sm:flex-row sm:gap-2">
        <button
          type="button"
          onClick={() => onEdit(user)}
          className="px-2 py-1 text-left text-sm font-semibold text-ink underline-offset-4 transition hover:underline sm:text-right"
        >
          Düzenle
        </button>
        <button
          type="button"
          onClick={() => onDelete(user.id)}
          className="px-2 py-1 text-left text-sm font-semibold text-danger underline-offset-4 transition hover:underline sm:text-right"
        >
          Sil
        </button>
      </div>
    </motion.article>
  )
}
