import { ChatLine, SidebarLeft } from 'reicon-react'
import flowerLogo from '../../assets/lily-3-transparent.png'

export default function HeaderSection() {
  return (
    <header className="border-b border-white/10 bg-[#1a1f2a]/80 px-3 py-3 sm:px-4 sm:py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10 sm:h-9 sm:w-9">
            <img
              src={flowerLogo}
              alt="Lily logo"
              className="h-5 w-5 object-contain sm:h-6 sm:w-6"
            />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-[1.65rem]">
            Lily
          </h2>
        </div>

        <button
          type="button"
          aria-label="Toggle sidebar"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 sm:h-10 sm:w-10"
        >
          <SidebarLeft size={18} />
        </button>
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#dfe2e8] px-4 py-3 text-base font-medium text-[#1a1f2a] shadow-lg shadow-slate-900/40 transition hover:bg-white"
        >
          <ChatLine size={20} />
          <span>New chat</span>
        </button>
      </div>
    </header>
  )
}
