import { useState } from 'react'
import { HomeUser, VideoLib, HelpCircle, X, Reorder } from 'reicon-react'

import flowerMark from '../assets/lily-3-transparent.png'

const navItems = [
  { label: 'Home', icon: HomeUser },
  { label: 'Demo', icon: VideoLib },
  { label: 'FAQ', icon: HelpCircle },
]

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <header className="fixed left-0 right-0 top-5 z-50 px-4">
      <nav className="mx-auto flex w-full max-w-150 items-center justify-between gap-3 rounded-full bg-white/20 px-4 py-2 shadow-[0_8px_20px_rgba(20,65,100,0.15)] backdrop-blur-lg md:px-6 transition-all">
        {/* Logo */}
        <a
          href="#"
          className="flex shrink-0 items-center gap-1 text-lg tracking-normal text-white"
        >
          <img src={flowerMark} alt="" className="h-9 w-9 object-contain" />
          Lily
        </a>

        {/* Desktop Menu (Hidden on Mobile) */}
        <div className="hidden md:flex min-w-0 flex-wrap items-center justify-end gap-x-4 gap-y-2 sm:gap-x-6">
          {navItems.map(({ label, icon: Icon }) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className=" text-white flex items-center gap-1.5  text-sm transition hover:underline"
            >
              <Icon />
              <span>{label}.</span>
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Button (Hidden on Desktop) */}
        <button
          onClick={toggleMenu}
          className="flex p-1 text-white transitio  focus:outline-none md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={27} /> : <Reorder size={27} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mx-auto mt-3 flex w-full flex-col gap-4 rounded-3xl border-2 border-neutral-950 bg-white/30 px-6 py-6 shadow-[0_8px_20px_rgba(20,65,100,0.15)] backdrop-blur-md md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          {navItems.map(({ label, icon: Icon }) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)} // Auto-closes menu when a link is clicked
              className="flex items-center gap-3 font-serif text-lg text-white transition hover:text-neutral-100 hover:underline"
            >
              <Icon size={20} />
              <span>{label}.</span>
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
