const recents = [
  'Random Test Input',
  'Linear Background Color Request',
  'Enhance NavBar With Glassmorphism a...',
  'Minimalist AI Website Design Prompt',
  'OPPO Reno6 5G Resale Price',
  'Mac Screen Annotation App Recomme...',
  'Deadlock: Conditions, Handling, Preve...',
  'Brainstorming Session: Ideas Welcome',
  "Peterson's Solution: Race Condition P...",
  'ER Model Explained In Detail',
  'DBMS Key Concepts Explained In Hingl...',
  'Thread Synchronization: CVs Aur Sema...',
  'Multi-threading Concepts Explained In...',
  'Process Scheduling Concepts Explained',
  'Database Three Schema Architecture E...',
]

export default function RecentsSection() {
  return (
    <section className="h-full">
      <div className="mb-4 px-1">
        <h3 className="text-base font-medium text-white/80 dark:text-black">
          Recents
        </h3>
      </div>

      <div className="space-y-1.5 overflow-hidden">
        {recents.map((item) => (
          <button
            key={item}
            type="button"
            className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm text-blue-400 underline transition hover:bg-white/5 hover:text-white dark:hover:text-black dark:hover:bg-black/5"
          >
            <span className="truncate">{item}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
