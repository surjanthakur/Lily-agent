import { Logout4 } from 'reicon-react'
import { Sun, MoonStars } from 'reicon-react'
import { useTheme } from '../../context/themecontext.js'

export default function SettingsPopupWindow({ setIsSettingsOpen }) {
  const { themeMode, lightTheme, darkTheme } = useTheme()
  const isDark = themeMode === 'dark'

  const toggleTheme = () => {
    if (isDark) {
      lightTheme()
    } else {
      darkTheme()
    }
    setIsSettingsOpen((prev) => !prev)
  }

  return (
    <aside
      aria-label="Settings"
      className="absolute bottom-full right-3 z-10 mb-3 w-64 rounded-2xl border border-white/10 bg-[#202020] p-3 text-white shadow-2xl shadow-black/40 dark:bg-white dark:text-black dark:border-black/20"
    >
      <div className="mb-2 border-b border-white/10 px-2 pb-3 dark:border-black/20">
        <p className="text-sm font-semibold">Settings</p>
        <p className="mt-1 text-xs text-white/50 dark:text-black">
          Personalize your workspace
        </p>
      </div>

      {/* sidebar theme change button */}
      <button
        type="button"
        onClick={toggleTheme}
        className="flex w-full items-center justify-between gap-2 rounded-xl px-2 py-2.5 text-sm transition hover:bg-white/10 dark:hover:bg-black/10"
      >
        <span className="whitespace-nowrap">change theme</span>
        <div className="flex items-center">
          {themeMode === 'light' ? <MoonStars /> : <Sun />}
        </div>
      </button>

      {/* logout account button  */}
      {/* here we call a function  */}
      <button
        type="button"
        className="mt-1 w-full gap-2 flex font-bold rounded-xl px-2 py-2.5 text-left text-sm text-red-300 transition hover:bg-red-400/10"
      >
        Log out Account
        <Logout4 size={17} />
      </button>
    </aside>
  )
}
