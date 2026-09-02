import '.././App.css'

import backgroundHeroImage from '../assets/gradient-480x360-1788263508954.png'
import googleSearchIcon from '../assets/g-search.png'
import redditIcon from '../assets/reddit.png'
import { Dialog2 } from 'reicon-react'
import flowerMark from '../assets/lily-3-transparent.png'
import { NavBar } from './index'

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

export default function Hero() {
  return (
    <section className="hero-band relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-24 pt-28 text-center">
      <NavBar />
      <img
        src={backgroundHeroImage}
        alt="hero-image"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-neutral-950/90"></div>
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="hero-source-icons" aria-hidden="true">
          <img
            className="hero-source-icon hero-source-icon--google-search"
            src={googleSearchIcon}
            alt=""
          />
          <img
            className="hero-source-icon hero-source-icon--reddit"
            src={redditIcon}
            alt=""
          />
        </div>
        <h1 className="hero-title font-serif text-[clamp(2.45rem,6vw,5rem)] leading-[1.32] tracking-normal text-white">
          <span className="hero-title-line">
            &quot;Tell us what you want to{' '}
            <u className="text-amber-200">learn</u>.
          </span>
          <span className="hero-title-line">
            We&apos;ll <u className="text-blue-200">find</u> the best{' '}
            <FlowerAccent className="inline-block h-14 w-14 align-middle sm:h-16 sm:w-16" />
          </span>
          <span className="hero-title-line">
            <u className="text-fuchsia-200">Blogs and Articles</u> for
            you.&quot;
          </span>
        </h1>
        <button className="start-button hero-cta mt-10">
          <div>
            <span>
              Let's Chat <Dialog2 size={50} />
            </span>
          </div>
        </button>
      </div>
    </section>
  )
}
