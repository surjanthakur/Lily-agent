import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './App.css'
import {
  Footer,
  HowItWorks,
  FaqSection,
  DemoSection,
  Hero,
} from '../src/components/index.js'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  // GSAP animation
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
    <>
      <main ref={appRef} className="min-h-screen overflow-hidden">
        {/* component render */}
        <Hero />
        <DemoSection />
        <HowItWorks />
        <FaqSection />
        <Footer />
      </main>
    </>
  )
}
