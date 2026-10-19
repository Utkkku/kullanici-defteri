import { AnimatePresence, motion } from 'framer-motion'
import type { User } from '../interfaces/User'
import { UserCard } from './UserCard'

interface UserListProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (id: string) => void
}

export function UserList({ users, onEdit, onDelete }: UserListProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
    >
      <div className="flex items-end justify-between gap-4 border-b-2 border-ink pb-3">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
            Kayıtlar
          </h2>
          <p className="mt-1 text-sm text-muted">
            {users.length === 0
              ? 'Liste boş — soldan ekle veya API’den çek.'
              : `${users.length} kişi`}
          </p>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="border-b border-dashed border-line py-16 text-center">
          <p className="font-display text-xl font-bold text-ink">Henüz kayıt yok</p>
          <p className="mt-2 text-sm text-muted">
            Formu doldurup Ekle’ye basarak başlayabilirsin.
          </p>
        </div>
      ) : (
        <div>
          <AnimatePresence mode="popLayout">
            {users.map((user, index) => (
              <UserCard
                key={user.id}
                user={user}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.section>
  )
}
