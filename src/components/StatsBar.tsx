interface StatsBarProps {
  total: number
  fromApi: number
  fromLocal: number
}

export function StatsBar({ total, fromApi, fromLocal }: StatsBarProps) {
  return (
    <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      <div className="flex items-baseline gap-2">
        <dt className="text-muted">Toplam</dt>
        <dd className="font-display text-2xl font-bold tabular-nums text-ink">{total}</dd>
      </div>
      <div className="flex items-baseline gap-2">
        <dt className="text-muted">API</dt>
        <dd className="font-display text-2xl font-bold tabular-nums text-api">{fromApi}</dd>
      </div>
      <div className="flex items-baseline gap-2">
        <dt className="text-muted">Lokal</dt>
        <dd className="font-display text-2xl font-bold tabular-nums text-local">{fromLocal}</dd>
      </div>
    </dl>
  )
}
