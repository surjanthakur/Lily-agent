import { useState } from 'react'
import { SidebarLeft, SidebarRight } from 'reicon-react'
import Sidebar from '../components/sidebar/Sidebar'
import ChatSection from '../components/dashboard-rightSection/chatsSection'
import InputSection from '../components/dashboard-rightSection/inputSection'

export default function Dashboard() {
  const [sidebarToggle, setSidebarToggle] = useState(true)

  const sidebarToggleSwitch = () => {
    setSidebarToggle((prev) => !prev)
  }

  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      <button
        type="button"
        aria-label="Toggle sidebar"
        onClick={sidebarToggleSwitch}
        className="fixed left-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#1b1f2a]/90 text-slate-200 shadow-lg shadow-black/30 transition hover:bg-white/10"
      >
        {sidebarToggle ? <SidebarLeft size={18} /> : <SidebarRight size={18} />}
      </button>

      <div className="mx-auto flex min-h-screen max-w-[1800px] flex-col lg:flex-row">
        <Sidebar
          sidebarToggle={sidebarToggle}
          sidebarToggleSwitch={sidebarToggleSwitch}
        />

        <main className="flex min-h-screen flex-1 flex-col bg-[#030303]">
          <div className="mx-auto flex w-full max-w-375 flex-1 flex-col py-3 pt-16 sm:px-5 sm:py-4 sm:pt-20 lg:py-5 lg:pt-5">
            <ChatSection />
            <InputSection />
          </div>
        </main>
      </div>
    </div>
  )
}
