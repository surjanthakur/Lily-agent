import { FiMic } from 'react-icons/fi'

export default function InputSection() {
  return (
    <div className="pb-2 pt-4">
      <div className="mx-auto max-w-200">
        <div className="flex items-center gap-3 rounded-full border border-white/20 bg-[#171818] px-3 py-2 dark:border-black/20 dark:bg-[#f3f4f6] sm:px-5 sm:py-3">
          <input
            type="text"
            value="find with Lily..."
            readOnly
            className="w-full bg-transparent text-base text-slate-200 placeholder:text-slate-500 font-light focus:outline-none dark:text-slate-800 dark:placeholder:text-slate-500 sm:text-lg"
            aria-label="Chat input"
          />

          <button
            type="button"
            aria-label="Voice input"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d313b] text-slate-100 transition hover:bg-[#353c4a] dark:bg-[#dfe2e8] dark:text-[#1a1f2a] dark:hover:bg-[#d4d8e0]"
          >
            <FiMic size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
