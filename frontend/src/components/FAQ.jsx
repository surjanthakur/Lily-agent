import { FiChevronDown, FiExternalLink } from 'react-icons/fi'
import { RiSparkling2Line } from 'react-icons/ri'
import '.././App.css'

const faqItems = [
  'What is this app, and how can it help me?',
  'Is there a free trial available?',
  'Which payment methods do you accept?',
  'How does the app keep my financial data secure?',
  'I need help with the app. How can I contact support?',
]

export default function FaqSection() {
  return (
    <section id="faq" className="texture-shell px-5 pb-16">
      <div className="mx-auto grid max-w-327.5 gap-10 bg-white px-6 py-14 sm:px-10 lg:grid-cols-[1fr_1.1fr] lg:px-12 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-400 px-3 py-1 text-sm font-bold text-neutral-700">
            <RiSparkling2Line /> FAQ
          </span>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
            Have more questions?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-neutral-500">
            Our app is designed to make managing your finances easy and
            stress-free. With intuitive features, you can track your spending
            and savings effortlessly.
          </p>
          <div className="mt-20 max-w-xl rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-black text-neutral-800">
              Can&apos;t find answers?
            </h3>
            <p className="mt-4 text-sm leading-6 text-neutral-500">
              We&apos;re here to help you out whenever you need! Get in touch
              with our dedicated support team for personalized assistance
              anytime.
            </p>
            <a
              href="mailto:hello@lilyagent.dev"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm font-bold text-white shadow-[inset_0_0_0_3px_rgba(255,255,255,0.35),0_4px_10px_rgba(0,0,0,0.25)] transition hover:bg-neutral-700"
            >
              Contact us <FiExternalLink />
            </a>
          </div>
        </div>
        <div className="space-y-6 self-start">
          {faqItems.map((item) => (
            <button
              key={item}
              type="button"
              className="flex w-full items-center justify-between gap-4 rounded-lg bg-neutral-100 px-6 py-5 text-left text-base font-black text-neutral-700 transition hover:bg-sky-100"
            >
              <span>{item}</span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-neutral-200 text-neutral-600">
                <FiChevronDown />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
