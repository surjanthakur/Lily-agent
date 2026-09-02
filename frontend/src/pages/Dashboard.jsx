import Sidebar from '../components/sidebar/Sidebar'
import ChatSection from '../components/dashboard-rightSection/chatsSection'
import InputSection from '../components/dashboard-rightSection/inputSection'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1800px] flex-col lg:flex-row">
        <Sidebar />

        <main className="flex min-h-screen flex-1 flex-col bg-[#030303]">
          <div className="mx-auto flex w-full max-w-375 flex-1 flex-col px-3 py-3 sm:px-5 sm:py-4 lg:px-7 lg:py-5">
            <ChatSection />
            <InputSection />
          </div>
        </main>
      </div>
    </div>
  )
}
