import {
  FaGithub,
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
} from 'react-icons/fa'
import { LuRocket } from 'react-icons/lu'
import lilyLine from '../assets/lily-2.png'
import { FlowerAccent } from '../App'

import '.././App.css'

export default function Footer() {
  return (
    <footer
      id="signup"
      className="footer-band relative overflow-hidden bg-[#b9dbf2] px-7 py-12 sm:px-12 sm:py-16"
    >
      <img
        src={lilyLine}
        alt=""
        aria-hidden="true"
        className="footer-lily pointer-events-none absolute opacity-30"
      />
      <div className="relative z-10 mx-auto max-w-330">
        <div className="relative">
          <FlowerAccent className="absolute left-[27%] top-[-1.2rem] h-14 w-14" />
          <div className="font-serif text-[clamp(4.6rem,18vw,13rem)] uppercase leading-none tracking-normal text-[#6fadd9]/80">
            Lily Agent
          </div>
        </div>
        <div className="mt-10 grid gap-8 text-lg text-neutral-900 md:grid-cols-2">
          <div className="space-y-7">
            <a
              href="https://x.com"
              className="flex w-fit items-center gap-3 underline underline-offset-4"
            >
              x account <FaTwitter className="text-4xl" />
            </a>
            <a
              href="https://instagram.com"
              className="flex w-fit items-center gap-3 underline underline-offset-4"
            >
              insta account <FaInstagram className="text-4xl text-pink-500" />
            </a>
            <a
              href="https://github.com"
              className="flex w-fit items-center gap-3 underline underline-offset-4"
            >
              github account <FaGithub />
            </a>
          </div>
          <a
            href="mailto:hello@lilyagent.dev"
            className="flex items-center gap-3 justify-self-start text-xl underline underline-offset-4 md:justify-self-end"
          >
            <FaTelegramPlane className="rounded-full bg-emerald-500 p-1 text-4xl text-white" />
            email me <LuRocket className="text-red-500" />
          </a>
        </div>
      </div>
    </footer>
  )
}
