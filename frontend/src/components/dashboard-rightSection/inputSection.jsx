import { FiMic } from 'react-icons/fi'

export default function InputSection() {
  return (
    <div className="pb-2 pt-4">
      <div className="mx-auto max-w-275">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#161616] px-3 py-2 shadow-[0_20px_40px_rgba(0,0,0,0.25)] sm:px-5 sm:py-3">
          <input
            type="text"
            value="find with Lily..."
            readOnly
            className="w-full bg-transparent text-base text-slate-200 placeholder:text-slate-500 focus:outline-none sm:text-lg"
            aria-label="Chat input"
          />

          <button
            type="button"
            aria-label="Voice input"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d313b] text-slate-100 transition hover:bg-[#353c4a]"
          >
            <FiMic size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
