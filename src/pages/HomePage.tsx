import { motion } from 'framer-motion'
import { StatsBar } from '../components/StatsBar'
import { UserForm } from '../components/UserForm'
import { UserList } from '../components/UserList'
import { useUsers } from '../hooks/useUsers'

export function HomePage() {
  const {
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
  } = useUsers()

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="border-b-2 border-ink pb-6"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Rehber / 01
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-5xl">
              Kullanıcı
              <br />
              Defteri
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              LocalStorage üzerinde tutulan kayıtlar. API’den çek, lokal ekle,
              düzenle veya sil.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <StatsBar
              total={stats.total}
              fromApi={stats.fromApi}
              fromLocal={stats.fromLocal}
            />
            <button
              type="button"
              onClick={refreshFromApi}
              disabled={loading}
              className="border-2 border-ink bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-transparent hover:text-ink disabled:opacity-50"
            >
              {loading ? 'Yükleniyor…' : 'API’den yenile'}
            </button>
            {error && <p className="text-sm font-medium text-danger">{error}</p>}
          </div>
        </div>
      </motion.header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(280px,340px)_1fr] lg:items-start">
        <div className="lg:sticky lg:top-6">
          <UserForm
            form={form}
            isEditing={editingId !== null}
            onChange={changeForm}
            onSubmit={submitForm}
            onCancelEdit={cancelEdit}
          />
        </div>

        <UserList users={users} onEdit={startEdit} onDelete={removeUser} />
      </div>

      <footer className="mt-12 flex flex-col gap-1 border-t border-line pt-5 text-xs text-muted sm:flex-row sm:justify-between">
        <span>LocalStorage · JSONPlaceholder</span>
        <span>React · TypeScript · Tailwind</span>
      </footer>
    </div>
  )
}
