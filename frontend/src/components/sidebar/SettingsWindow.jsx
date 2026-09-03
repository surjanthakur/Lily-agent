import { Logout4 } from 'reicon-react'

export default function SettingsPopupWindow({ isLightTheme, onThemeToggle }) {
  return (
    <aside
      aria-label="Settings"
      className="absolute bottom-full right-3 z-10 mb-3 w-64 rounded-2xl border border-white/10 bg-[#202020] p-3 text-white shadow-2xl shadow-black/40"
    >
      <div className="mb-2 border-b border-white/10 px-2 pb-3">
        <p className="text-sm font-semibold">Settings</p>
        <p className="mt-1 text-xs text-white/50">Personalize your workspace</p>
      </div>

      <button
        type="button"
        onClick={onThemeToggle}
        className="flex w-full items-center justify-between rounded-xl px-2 py-2.5 text-sm transition hover:bg-white/10"
      >
        <span>Light theme</span>
        <span
          aria-hidden="true"
          className={`flex h-5 w-9 items-center rounded-full p-0.5 transition ${
            isLightTheme ? 'bg-slate-300' : 'bg-white/20'
          }`}
        >
          <span
            className={`h-4 w-4 rounded-full transition-transform ${
              isLightTheme
                ? 'translate-x-4 bg-slate-700'
                : 'translate-x-0 bg-white/70'
            }`}
          />
        </span>
      </button>

      <button
        type="button"
        className="mt-1 w-full gap-2 flex rounded-xl px-2 py-2.5 text-left text-sm text-red-300 transition hover:bg-red-400/10"
      >
        Log out Account
        <Logout4 size={17} />
      </button>
    </aside>
  )
}
