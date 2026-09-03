import { Magicpen } from 'reicon-react'
import { motion } from 'motion/react'
import flowerLogo from '../../assets/lily-3-transparent.png'

export default function HeaderSection() {
  return (
    <header className="border-b border-white/10 bg-[#181818] px-3 py-3 sm:px-4 sm:py-4 dark:bg-white">
      <div className="flex items-center gap-2.5">
        <div className="flex ms-12 min-w-0 items-center gap-2.5">
          <h2 className="text-xl font-light tracking-tight text-white sm:text-[1.65rem] dark:text-black">
            Lily
          </h2>
          <motion.div
            className="flex items-center justify-center overflow-hidden sm:h-9 sm:w-9"
            whileHover={{ scale: 1.5 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
          >
            <img
              src={flowerLogo}
              alt="Lily logo"
              className="h-10 w-10 object-contain sm:h-10 sm:w-10"
            />
          </motion.div>
        </div>
      </div>

      {/* create new chat window button */}
      {/* here we call a fucntion that create new chat window in frontend {empty} */}
      <div className="mt-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#dfe2e8] px-4 py-3 text-base font-medium text-[#1a1f2a] shadow-sm shadow-slate-900 transition hover:bg-white"
        >
          <Magicpen size={20} />
          <span>New chat</span>
        </button>
      </div>
    </header>
  )
}
