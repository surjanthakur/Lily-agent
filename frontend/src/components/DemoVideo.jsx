import { FlowerAccent } from '../App'

function getYouTubeEmbedUrl(videoUrl) {
  if (!videoUrl) {
    return ''
  }

  const trimmedUrl = videoUrl.trim()

  try {
    const url = new URL(trimmedUrl)
    const hostname = url.hostname.replace(/^www\./, '').toLowerCase()

    if (hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${url.pathname.replace('/', '')}`
    }

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      const videoId = url.searchParams.get('v')
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }
    }

    return trimmedUrl
  } catch {
    const match = trimmedUrl.match(/(?:v=|\/)([A-Za-z0-9_-]{11})(?:[?&]|$)/)
    return match ? `https://www.youtube.com/embed/${match[1]}` : ''
  }
}

export default function DemoSection({
  videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
}) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl)

  return (
    <section
      id="demo"
      className="video-band scroll-reveal relative px-5 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-reveal mb-10 flex items-center justify-center gap-2 text-center text-2xl font-black text-white sm:text-3xl">
          <FlowerAccent className="h-10 w-10 shrink-0" />
          <span>Let&apos;s see how Lily agent work</span>
        </div>

        <div className="text-reveal mx-auto w-full max-w-6xl overflow-hidden rounded-[26px] border border-white/20 bg-sky-950/5 shadow-[0_28px_80px_rgba(14,116,144,0.15)] sm:rounded-4xl">
          {embedUrl ? (
            <div className="relative mx-auto aspect-video w-full max-w-275 overflow-hidden rounded-[inherit]">
              <iframe
                src={embedUrl}
                title="Lily agent demo video"
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex min-h-65 items-center justify-center px-6 text-center text-base font-medium text-slate-700 sm:min-h-85 md:min-h-105">
              Paste a YouTube link into the videoUrl prop to show the demo
              video.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
