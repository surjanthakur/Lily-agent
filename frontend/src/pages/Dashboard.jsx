import { Settings2 } from 'reicon-react'
import { useRef, useState } from 'react'
import { SettingsPopupWindow } from '../components/export.js'
import Lilylogo from '../assets/lily-3-transparent.png'

export default function Dashboard() {
  const [openSettings, setOpenSettings] = useState(false)
  const textareaRef = useRef(null)

  const handleSettings = () => {
    setOpenSettings((prev) => !prev)
  }

  const handleInput = (e) => {
    const textarea = e.target

    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
  }

  return (
    <section
      className="h-screen bg-[#f7f6f0]"
      style={{
        backgroundImage: `
            linear-gradient(#deddd5 1px, transparent 1px),
            linear-gradient(90deg, #deddd5 1px, transparent 1px)
          `,
        backgroundSize: '24px 24px',
      }}
    >
      <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col backdrop-blur-xs">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-black/10 px-4 sm:px-6">
          {/* Lily Logo */}
          <div className="flex items-center gap-2.5">
            <img
              src={Lilylogo}
              alt="Lily"
              className="h-9 w-9 rounded-lg object-cover"
            />

            <span className="text-base font-semibold tracking-tight text-neutral-900">
              lily
            </span>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2.5">
            <img
              src={Lilylogo}
              alt="Profile"
              className="h-9 w-9 rounded-full object-cover"
            />

            <span className="hidden text-sm font-medium text-neutral-800 sm:block">
              Surjan
            </span>
          </div>
        </header>

        {/* Chat */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 sm:gap-6">
            {/* Agent */}
            <div className="flex justify-start">
              <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-[#f2f1e5] px-4 py-3 sm:max-w-[75%] sm:px-5">
                <p className="text-sm leading-6 text-neutral-800">
                  Hey! 👋 I'm Lily. Tell me what you want to learn, and I'll
                  find the best articles and resources for you.
                </p>
              </div>
            </div>

            {/* User */}
            <div className="flex justify-end">
              <div className="max-w-[88%] rounded-2xl rounded-tr-sm bg-black px-4 py-3 sm:max-w-[75%] sm:px-5">
                <p className="text-sm leading-6 text-white">
                  I want to learn system design from beginner to advanced.
                </p>
              </div>
            </div>

            {/* Agent */}
            <div className="flex justify-start">
              <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-[#f2f1e5] px-4 py-3 sm:max-w-[75%] sm:px-5">
                <p className="text-sm leading-6 text-neutral-800">
                  Nice! I'll break that into smaller topics and find resources
                  for each one.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Input area */}
        <div className="absolute bottom-3 left-0 w-full px-3 sm:bottom-6 sm:px-6">
          <div className="mx-auto w-full max-w-3xl">
            <form className="flex items-end gap-1.5 rounded-2xl border border-black/10 bg-white p-2 shadow-lg sm:gap-2">
              {/* Settings */}
              <div className="group relative shrink-0">
                <button
                  type="button"
                  onClick={handleSettings}
                  aria-label="Settings"
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                >
                  <Settings2 size={20} />
                </button>

                {/* Tooltip */}
                <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-medium whitespace-nowrap text-neutral-700 opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100">
                  Settings
                </div>
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                rows={1}
                onInput={handleInput}
                placeholder="Ask Lily anything..."
                className="max-h-50 min-h-11 flex-1 resize-none overflow-y-auto bg-transparent px-2 py-3 text-sm leading-5 text-neutral-900 outline-none placeholder:text-neutral-400 sm:px-3"
              />

              {/* Send */}
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-lg text-white transition hover:bg-neutral-800"
              >
                ↑
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Settings popup */}
      <SettingsPopupWindow
        openSetting={openSettings}
        setSettings={handleSettings}
      />
    </section>
  )
}
