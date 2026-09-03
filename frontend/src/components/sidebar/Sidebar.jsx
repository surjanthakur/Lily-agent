import HeaderSection from './headerSection'
import RecentsSection from './recentsSection'
import BottomSection from './bottomSection'

export default function Sidebar({ sidebarToggle }) {
  return (
    <aside
      aria-expanded={sidebarToggle}
      className={[
        'w-full overflow-hidden border-b border-white/10 bg-[#181818] transition-all duration-300 ease-in-out',
        sidebarToggle ? 'max-lg:block lg:w-[320px]' : 'max-lg:hidden lg:w-0',
        sidebarToggle
          ? 'lg:border-b-0 lg:border-r lg:border-white/10'
          : 'lg:border-r-0',
      ].join(' ')}
    >
      <div
        className={[
          'flex min-h-screen flex-col transition-all duration-300',
          sidebarToggle
            ? 'opacity-100'
            : 'pointer-events-none opacity-0 lg:invisible',
        ].join(' ')}
      >
        <HeaderSection />
        <div className="flex-1 px-3 pb-3 pt-2 sm:px-4">
          <RecentsSection />
        </div>
        <BottomSection />
      </div>
    </aside>
  )
}
