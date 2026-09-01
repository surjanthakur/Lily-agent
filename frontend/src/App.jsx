import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import flowerMark from './assets/lily-3-transparent.png'
import backgroundHeroImage from './assets/gradient-480x360-1788263508954.png'
import googleSearchIcon from './assets/g-search.png'
import redditIcon from './assets/reddit.png'
import { Dialog2 } from 'reicon-react'

import './App.css'
import {
  NavBar,
  Footer,
  HowItWorks,
  FaqSection,
  DemoSection,
} from '../src/components/index.js'

gsap.registerPlugin(ScrollTrigger)

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

export default function App() {
  const appRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) {
      return undefined
    }

    const eventCleanups = []

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-band img.absolute', {
          scale: 1.12,
          opacity: 0,
          duration: 1.3,
        })
        .from(
          '.hero-title-line',
          {
            yPercent: 105,
            opacity: 0,
            rotateX: -18,
            transformOrigin: '50% 100%',
            stagger: 0.16,
            duration: 0.9,
          },
          '-=0.72',
        )
        .from(
          '.hero-cta',
          {
            y: 28,
            opacity: 0,
            scale: 0.94,
            duration: 0.65,
          },
          '-=0.35',
        )
        .from(
          '.hero-source-icon',
          {
            y: 26,
            opacity: 0,
            scale: 0.7,
            stagger: 0.12,
            duration: 0.7,
          },
          '-=0.42',
        )

      gsap.utils.toArray('.scroll-reveal').forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
          y: 72,
          opacity: 0,
          scale: 0.96,
          duration: 0.9,
          ease: 'power3.out',
        })
      })

      gsap.utils.toArray('.text-reveal').forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
          y: 34,
          opacity: 0,
          duration: 0.78,
          ease: 'power3.out',
        })
      })

      gsap.utils.toArray('.feature-card').forEach((card) => {
        const icon = card.querySelector('.feature-card-icon')

        const enter = () => {
          gsap.to(card, {
            y: -10,
            scale: 1.025,
            boxShadow: '0 22px 45px rgb(0 0 0 / 0.22)',
            duration: 0.28,
            ease: 'power2.out',
          })
          gsap.to(icon, {
            rotate: -8,
            scale: 1.12,
            duration: 0.28,
            ease: 'back.out(2)',
          })
        }

        const leave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)',
            duration: 0.28,
            ease: 'power2.out',
          })
          gsap.to(icon, {
            rotate: 0,
            scale: 1,
            duration: 0.28,
            ease: 'power2.out',
          })
        }

        card.addEventListener('mouseenter', enter)
        card.addEventListener('mouseleave', leave)
        card.addEventListener('focusin', enter)
        card.addEventListener('focusout', leave)
        eventCleanups.push(() => {
          card.removeEventListener('mouseenter', enter)
          card.removeEventListener('mouseleave', leave)
          card.removeEventListener('focusin', enter)
          card.removeEventListener('focusout', leave)
        })
      })
    }, appRef)

    return () => {
      eventCleanups.forEach((cleanup) => cleanup())
      ctx.revert()
    }
  }, [])

  return (
    <main ref={appRef} className="min-h-screen overflow-hidden text-neutral-950">
      <Hero />
      <DemoSection />
      <HowItWorks />
      <FaqSection />
      <Footer />
    </main>
  )
}
