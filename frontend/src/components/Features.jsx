import { GlobalSearch, OrderedList, BookBookmark } from 'reicon-react'
import '.././App.css'

const featureCards = [
  {
    title: 'find blogs/articles for you',
    copy: 'It figures out what you actually want to learn optimized query into subparts and find best blogs/articles links for you woth the helper tools',
    icon: GlobalSearch,
    className: 'bg-sky-100',
    size: 'large',
  },
  {
    title: 'give you formatted summarized blogs and articles',
    copy: 'after finding lot of blogs and articles agent optimize them and gives you best top rated resources with the description.',
    icon: OrderedList,
    className: 'bg-emerald-100',
  },
  {
    title: 'planed ordered resources access',
    copy: 'based on query it give you multiple blogs/article and ordered them as per difficuly level and reqding flow',
    icon: BookBookmark,
    className: 'bg-violet-100',
  },
]
function SystemCard({ card }) {
  const Icon = card.icon

  return (
    <article
      className={`${card.className} rounded-2xl p-6 shadow-sm h-full ${card.size === 'large' ? 'md:col-span-1 md:row-span-2' : ''}`}
    >
      <div className="mb-4 flex h-15 w-15 items-center justify-center rounded-full bg-white/65 text-lg text-indigo-500">
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
              Lily agent
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export function HowItWorks() {
  return (
    <section className="texture-shell px-5 py-16 border-t border-zinc-600">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-3xl">
            How the system actually works
          </h2>
          <p className="mt-2 text-lg leading-5 text-neutral-400">
            Not a course player. A set of skills that run in your editor and
            share one rule: you write the code.
          </p>
        </div>
        <div className="mx-auto grid gap-6 md:grid-cols-2 auto-rows-max">
          {featureCards.map((card) => (
            <SystemCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
