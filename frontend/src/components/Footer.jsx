import { FaGithub, FaTwitter } from 'react-icons/fa'
import lilyLine from '../assets/lily-2.png'
import { FlowerAccent } from '../App'
import { Send } from 'reicon-react'

import '.././App.css'

export default function Footer() {
  return (
    <footer
      id="footer"
      className="footer-band relative overflow-hidden px-7 border-t border-zinc-600 py-16 sm:px-12 sm:py-24"
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
            "Read without burrying about next topic or resource"
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12 py-12 ">
          <div>
            <h3 className="text-white font-black text-sm  tracking-wider mb-6">
              Connect with us
            </h3>
            <div className="space-y-4">
              <a
                href="https://twitter.com/@tsurjan16"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition"
              >
                <FaTwitter className="text-xl" />
                <span>Follow on X</span>
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
            <h3 className="text-white font-black text-sm  tracking-wider mb-6">
              Get in touch
            </h3>
            <a
              href="mailto:tsurjan506@gmail.com"
              className="inline-flex items-center gap-3 bg-white text-neutral-950 font-black px-6 py-3 rounded-full w-fit hover:bg-neutral-100 transition"
            >
              <Send size={25} />
              e-mail any time
            </a>
          </div>
        </div>

        <div className="text-center text-neutral-500 text-sm pt-8">
          <p>&copy; 2026 Lily Agent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
