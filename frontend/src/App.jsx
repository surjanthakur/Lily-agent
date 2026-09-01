import flowerMark from './assets/lily-3-transparent.png'
import backgroundHeroImage from './assets/gradient-480x360-1788263508954.png'

import './App.css'
import {
  NavBar,
  Footer,
  HowItWorks,
  FaqSection,
  DemoSection,
} from '../src/components/index.js'

export function FlowerAccent({ className = '' }) {
  return (
    <img
      src={flowerMark}
      alt=""
      aria-hidden="true"
      className={`flower-accent ${className}`}
    />
  )
}

function Hero() {
  return (
    <section className="hero-band relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-24 pt-28 text-center">
      <NavBar />
      <img
        src={backgroundHeroImage}
        alt="hero-image"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative z-10 mx-auto max-w-4xl">
        <h1 className="font-serif text-[clamp(2.45rem,6vw,5rem)] leading-[1.32] tracking-normal text-white">
          &quot;Tell us what you
          <br />
          want to learn. We&apos;ll
          <br />
          find the best{' '}
          <FlowerAccent className="-mt-4 inline-block h-14 w-14 align-middle sm:h-16 sm:w-16" />
          <br />
          resources for you.&quot;
        </h1>
        <button className="start-button mt-10">
          <div>
            <span>Let's Chat</span>
          </div>
        </button>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden text-neutral-950">
      <Hero />
      <DemoSection />
      <HowItWorks />
      <FaqSection />
      <Footer />
    </main>
  )
}
