import { FlowerAccent } from '../App'

export default function DemoSection() {
  return (
    <section id="demo" className="video-band relative px-5 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-center justify-center gap-2 text-center text-2xl font-black text-neutral-950 sm:text-3xl">
          <FlowerAccent className="h-10 w-10 shrink-0" />
          <span>Let&apos;s see how Lily agent work</span>
        </div>
        <div className="video-frame flex min-h-85 items-center justify-center rounded-sm bg-sky-950/10 px-4 text-center text-[clamp(3rem,7vw,5.8rem)] font-medium tracking-normal text-black sm:min-h-130">
          video component here
        </div>
      </div>
    </section>
  )
}
