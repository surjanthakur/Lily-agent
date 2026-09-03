import HeaderSection from './headerSection'
import RecentsSection from './recentsSection'
import BottomSection from './bottomSection'

export default function Sidebar({ sidebarToggle }) {
  return (
    <aside
      // sidebar toggle logic
      aria-expanded={sidebarToggle}
      className={[
        'w-full overflow-hidden border-b border-white/10 bg-[#181818] transition-all duration-300 ease-in-out',

        // check if sidebarToggle value is true or not absed on. that add classes
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
        {/* sidebar hearder section  */}
        <HeaderSection />
        <div className="flex-1 px-3 pb-3 pt-2 sm:px-4">
          {/* recent chats sections */}
          <RecentsSection />
        </div>
        {/* bottom section shows who's authenticated user {profile} */}
        <BottomSection />
      </div>
    </aside>
  )
}
