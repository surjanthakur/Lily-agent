import HeaderSection from './headerSection'
import RecentsSection from './recentsSection'
import BottomSection from './bottomSection'

export default function Sidebar() {
  return (
    <aside className="w-full border-b border-white/10 bg-[#090909] lg:w-[320px] lg:border-b-0 lg:border-r lg:border-white/10">
      <div className="flex h-full min-h-screen flex-col">
        <HeaderSection />
        <div className="flex-1 px-3 pb-3 pt-2 sm:px-4">
          <RecentsSection />
        </div>
        <BottomSection />
      </div>
    </aside>
  )
}
