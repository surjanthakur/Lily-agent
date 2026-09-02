import { FiSettings } from 'react-icons/fi'

export default function BottomSection() {
  return (
    <div className="border-t border-white/10 bg-[#1a1f2a]/80 px-3 py-3 sm:px-4">
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#1a1f2a] px-2.5 py-2 ring-1 ring-white/5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-slate-300 to-slate-500 text-sm font-semibold text-[#0d1117]">
            S
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              surjan thakur
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Open settings"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
        >
          <FiSettings size={16} />
        </button>
      </div>
    </div>
  )
}
