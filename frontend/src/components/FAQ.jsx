import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { RiSparkling2Line } from 'react-icons/ri'
import { Mailbox } from 'reicon-react'
import '.././App.css'

const faqItems = [
  {
    question: '1. What is Lily agent and how does it help me learn ?',
    answer:
      'lily is an agent that find best article/blog resource base on your topic and gives you sorted article links with some metadata',
  },
  {
    question: '2. who should use Lily agent ?',
    answer:
      'anyone who want to learn any topic in dept with the help of lily agent sorted strucutred format of articles and blogs',
  },
  {
    question:
      '3. how lily agent prepare a sorted set of blogs/articles for you ?',
    answer:
      'lily take you query and find relevent bunch of articles/blogs and sort them line by line like course topic wise and also share description about them difficulty level rating and standards about resource',
  },
  {
    question: '4. is lily agent free ?',
    answer: 'yes!! for now its free so go and check it out?',
  },
]

export default function FaqSection() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      className="texture-shell px-5 py-16 border-t border-zinc-600"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-3 py-1 text-sm font-bold text-neutral-300">
            <RiSparkling2Line /> FAQ
          </span>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Have more questions?
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-400">
            Everything you need to know about Lily AI and how it can transform
            your learning journey.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/50 backdrop-blur-sm transition hover:border-neutral-700"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-bold text-white hover:bg-neutral-800/50 transition"
              >
                <span className="text-base">{item.question}</span>
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center text-neutral-400 transition-transform ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <FiChevronDown size={20} />
                </span>
              </button>
              {expandedIndex === index && (
                <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-800/30">
                  <p className="text-neutral-300 leading-7">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 mx-auto max-w-xl rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-center">
          <h3 className="text-lg font-black text-white">
            Still have questions?
          </h3>
          <p className="mt-3 text-sm leading-6 text-neutral-400">
            We&apos;re here to help! Reach out to our team for personalized
            assistance.
          </p>
          <a
            href="mailto:tsurjan506@gmail.com"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-neutral-950 shadow-lg transition hover:bg-neutral-100"
          >
            Contact us <Mailbox size={24} />
          </a>
        </div>
      </div>
    </section>
  )
}
