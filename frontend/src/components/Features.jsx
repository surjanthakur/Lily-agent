import { FiSearch } from 'react-icons/fi'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { LuBot, LuCode, LuFlaskConical } from 'react-icons/lu'
import { RiSparkling2Line } from 'react-icons/ri'
import '.././App.css'

const featureCards = [
  {
    title: 'Learn interviews, then teaches in bytes',
    copy: 'It figures out what you actually want to learn, scaffolds the project, and publishes short lessons with real challenges sized to your level.',
    icon: IoDocumentTextOutline,
    className: 'bg-sky-100',
    size: 'large',
  },
  {
    title: 'Learnish coaches without spoiling',
    copy: 'It asks what you think you should do, corrects your approach, and hands you the docs to understand it, not the solution to paste.',
    icon: LuCode,
    className: 'bg-emerald-100',
  },
  {
    title: 'Labs that punish lazy code',
    copy: 'You write the lab. The system validates the outcome, flags weak implementations, and pushes you from naive to dependable.',
    icon: LuFlaskConical,
    className: 'bg-violet-100',
  },
  {
    title: 'Revise locks in what you claim to know',
    copy: 'It grills you on finished lessons so the skill sticks instead of leaking.',
    icon: RiSparkling2Line,
    className: 'bg-purple-100',
  },
  {
    title: 'Status & fix-lesson help you never lose your place',
    copy: 'Pick up exactly where you left off. Repair lesson content when something is off.',
    icon: FiSearch,
    className: 'bg-teal-50',
  },
  {
    title: 'Setup takes one prompt',
    copy: 'Deps, git, private remote, profile. No classroom UI to learn.',
    icon: LuBot,
    className: 'bg-orange-100',
  },
]
function SystemCard({ card }) {
  const Icon = card.icon

  return (
    <article
      className={`${card.className} rounded-2xl p-6 shadow-sm h-full ${card.size === 'large' ? 'md:col-span-1 md:row-span-2' : ''}`}
    >
      <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/65 text-lg text-indigo-500">
        <Icon />
      </div>
      <h3 className="text-base font-black leading-tight text-neutral-950">
        {card.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-neutral-700">{card.copy}</p>
      {card.size === 'large' && (
        <div className="mt-8 grid place-items-center">
          <div className="relative h-36 w-36 rounded-full border-4 border-indigo-300">
            <div className="absolute inset-8 grid place-items-center rounded-full bg-white text-[0.62rem] font-black text-indigo-500 shadow">
              LILY AI
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export function HowItWorks() {
  return (
    <section className="texture-shell px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-3xl">
            How the system actually works
          </h2>
          <p className="mt-2 text-lg leading-5 text-neutral-400">
            Not a course player. A set of skills that run in your editor and
            share one rule: you write the code.
          </p>
        </div>
        <div className="mx-auto grid gap-6 md:grid-cols-3 auto-rows-max">
          {featureCards.map((card) => (
            <SystemCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
