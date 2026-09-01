import { useState } from 'react'
import { FiChevronDown, FiExternalLink } from 'react-icons/fi'
import { RiSparkling2Line } from 'react-icons/ri'
import '.././App.css'

const faqItems = [
  {
    question: 'What is Lily AI and how does it help me learn?',
    answer:
      'Lily AI is an intelligent learning platform that understands your learning goals and creates personalized learning paths. It scaffolds projects, breaks down concepts into bite-sized lessons, and provides real-world challenges matched to your skill level.',
  },
  {
    question: 'How does AI coaching work in Lily?',
    answer:
      'Our AI coaches guide you through problem-solving without spoiling the solution. It asks clarifying questions, corrects your approach, and directs you to relevant documentation so you truly understand the concepts rather than just copying answers.',
  },
  {
    question: 'Can I practice what I learn with real projects?',
    answer:
      'Yes! Lily includes interactive labs where you write actual code. The system validates your implementation, flags inefficient patterns, and pushes you to write production-quality code instead of just passing basic tests.',
  },
  {
    question: 'How does Lily ensure concepts stick in my memory?',
    answer:
      'Lily uses spaced repetition and review sessions to reinforce learning. After completing lessons, the system quizzes you on key concepts to ensure retention and helps you build lasting knowledge instead of temporary memorization.',
  },
  {
    question: 'How do I get started with Lily?',
    answer:
      'Getting started is simple - just provide one prompt describing what you want to learn. Lily handles all the setup including dependencies, git configuration, and environment setup. No classroom UI to learn - everything works in your editor.',
  },
]

export default function FaqSection() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section id="faq" className="texture-shell px-5 py-16 bg-neutral-950">
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
            href="mailto:hello@lilyagent.dev"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-neutral-950 shadow-lg transition hover:bg-neutral-100"
          >
            Contact us <FiExternalLink />
          </a>
        </div>
      </div>
    </section>
  )
}
