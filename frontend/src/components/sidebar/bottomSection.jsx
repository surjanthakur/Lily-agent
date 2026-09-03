import { useState } from 'react'
import { Settings2 } from 'reicon-react'
import SettingsPopupWindow from './SettingsWindow.jsx'

export default function BottomSection() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLightTheme, setIsLightTheme] = useState(false)

  return (
    <div className="relative border-t border-white/20 bg-[#181818] px-3 py-3 sm:px-4">
      {isSettingsOpen && (
        <SettingsPopupWindow
          isLightTheme={isLightTheme}
          onThemeToggle={() => setIsLightTheme((current) => !current)}
        />
      )}
      {/* here we show authenticated user detrails */}
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#181818] px-2.5 py-2 ring-1 ring-white/10">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-slate-300 to-slate-500 text-sm font-semibold text-[#0d1117]">
            ST
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              surjan thakur
            </p>
          </div>
        </div>
        {/* button that popup settings window */}
        <button
          type="button"
          aria-label="Open settings"
          aria-expanded={isSettingsOpen}
          onClick={() => setIsSettingsOpen((current) => !current)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
        >
          <Settings2 size={20} />
        </button>
      </div>
    </div>
  )
}
