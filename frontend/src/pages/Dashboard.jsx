import { Settings2 } from 'reicon-react'
import { useState } from 'react'
import { SettingsPopupWindow } from '../components/export.js'

export default function Dashboard() {
  const [OpenSettings, setOpensettings] = useState(false)

  const HandleSettings = () => {
    setOpensettings((prev) => !prev)
  }

  return (
    <>
      <section className="h-screen bg-[#f2f1e5]">
        <div className="relative mx-auto flex h-full max-w-6xl flex-col bg-white">
          {/* Chat */}
          <main className="flex-1 overflow-y-auto px-6 py-8">
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
              {/* Agent message */}
              <div className="flex justify-start">
                <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-[#f2f1e5] px-5 py-3">
                  <p className="text-sm leading-6 text-neutral-800">
                    Hey! 👋 I'm Lily. Tell me what you want to learn, and I'll
                    find the best articles and resources for you.
                  </p>
                </div>
              </div>

              {/* User message */}
              <div className="flex justify-end">
                <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-black px-5 py-3">
                  <p className="text-sm leading-6 text-white">
                    I want to learn system design from beginner to advanced.
                  </p>
                </div>
              </div>

              {/* Agent message */}
              <div className="flex justify-start">
                <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-[#f2f1e5] px-5 py-3">
                  <p className="text-sm leading-6 text-neutral-800">
                    Nice! I'll break that into smaller topics and find resources
                    for each one.
                  </p>
                </div>
              </div>
            </div>
          </main>

          {/* Input */}
          <div className="absolute bottom-6 left-1/2 w-full max-w-3xl -translate-x-1/2 px-6">
            {/* settings window pop up button */}
            <button onClick={HandleSettings}>
              <Settings2 color="grey" size={20} />
            </button>
            <form className="flex items-end gap-2 rounded-2xl border border-black/10 bg-white p-2 shadow-lg">
              <textarea
                rows={1}
                placeholder="Ask Lily anything..."
                className="min-h-12 flex-1 resize-none bg-transparent px-4 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
              />

              <button
                type="submit"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white transition hover:bg-neutral-800"
              >
                ↑
              </button>
            </form>
          </div>
        </div>
      </section>
      <SettingsPopupWindow
        openSetting={OpenSettings}
        setSettings={HandleSettings}
      />
    </>
  )
}
