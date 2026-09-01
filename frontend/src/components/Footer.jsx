import {
  FaGithub,
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
} from 'react-icons/fa'
import lilyLine from '../assets/lily-2.png'
import { FlowerAccent } from '../App'

import '.././App.css'

export default function Footer() {
  return (
    <footer
      id="footer"
      className="footer-band relative overflow-hidden bg-neutral-950 px-7 py-16 sm:px-12 sm:py-24"
    >
      <img
        src={lilyLine}
        alt=""
        aria-hidden="true"
        className="footer-lily pointer-events-none absolute opacity-10"
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <FlowerAccent className="absolute -left-8 -top-4 h-12 w-12" />
            <h2 className="font-serif text-[clamp(3rem,10vw,6rem)] uppercase leading-none tracking-normal text-white">
              Lily Agent
            </h2>
          </div>
          <p className="mt-4 text-neutral-400 text-lg max-w-2xl mx-auto">
            Transform your learning with AI-powered guidance. Code. Learn. Grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12 py-12 border-t border-b border-neutral-800">
          <div>
            <h3 className="text-white font-black text-sm uppercase tracking-wider mb-6">
              Connect with us
            </h3>
            <div className="space-y-4">
              <a
                href="https://twitter.com"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition"
              >
                <FaTwitter className="text-xl" />
                <span>Follow on X</span>
              </a>
              <a
                href="https://instagram.com"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition"
              >
                <FaInstagram className="text-xl text-pink-400" />
                <span>Follow on Instagram</span>
              </a>
              <a
                href="https://github.com"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition"
              >
                <FaGithub className="text-xl" />
                <span>Star on GitHub</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-white font-black text-sm uppercase tracking-wider mb-6">
              Get in touch
            </h3>
            <a
              href="mailto:hello@lilyagent.dev"
              className="inline-flex items-center gap-3 bg-white text-neutral-950 font-black px-6 py-3 rounded-full w-fit hover:bg-neutral-100 transition"
            >
              <FaTelegramPlane />
              hello@lilyagent.dev
            </a>
          </div>
        </div>

        <div className="text-center text-neutral-500 text-sm pt-8">
          <p>&copy; 2024 Lily Agent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
