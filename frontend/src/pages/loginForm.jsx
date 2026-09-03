import lilyflower from '../assets/lily-3-transparent.png'

export default function LoginForm() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090b] text-white">
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="flex min-h-140 flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:min-h-screen lg:px-16 lg:py-12 xl:px-24">
          <a
            href="#login"
            className="flex w-fit items-center gap-3 text-lg font-semibold tracking-tight text-white"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#d8f36a] text-lg font-black text-[#11140b]">
              <img src={lilyflower} alt="lily-logo"></img>
            </span>
            Lily agent
          </a>

          <div id="login" className="w-full max-w-md py-16">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-[#d8f36a]">
              Welcome back
            </p>
            <h1 className="max-w-sm text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Keep learning with better reads.
            </h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-white/55">
              sign in fast to use lily agent.{' '}
              <span className="uppercase font-bold text-amber-300">
                it's free now !!
              </span>
            </p>

            <form onSubmit={handleSubmit} className="mt-10">
              <button
                type="submit"
                className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 text-sm font-semibold text-[#111214] shadow-[0_12px_32px_rgba(0,0,0,0.25)] transition hover:bg-[#f0f2eb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8f36a] active:scale-[0.99]"
              >
                <img
                  src="https://cdn.reicon.dev/logos/google/original.svg"
                  alt="Google"
                  width={24}
                  height={24}
                />
                Continue with Google
              </button>
            </form>
            <p className="mt-5 text-center text-xs leading-5 text-white/35">
              By continuing, you agree to use Lily for your personal learning
              journey.
            </p>
          </div>

          <p className="text-xs text-white/30">
            Find the next thing worth reading.
          </p>
        </section>

        <section className="relative flex min-h-105 items-end overflow-hidden border-t border-white/10 bg-[#151a17] px-6 py-8 sm:px-10 sm:py-10 lg:min-h-screen lg:border-l lg:border-t-0 lg:px-16 lg:py-12 xl:px-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(216,243,106,0.18),transparent_30%),linear-gradient(135deg,#151a17_0%,#101311_56%,#253326_100%)]" />
          <div className="absolute right-[12%] top-[15%] h-36 w-36 rounded-full border border-[#d8f36a]/30 sm:h-52 sm:w-52" />
          <div className="absolute right-[18%] top-[23%] h-20 w-20 rounded-full bg-[#d8f36a]/10 blur-sm sm:h-28 sm:w-28" />

          <div className="relative z-10 max-w-xl">
            <div className="mb-20 flex items-center gap-3 text-sm font-medium text-white/60 sm:mb-28 lg:mb-36">
              <span className="h-px w-8 bg-[#d8f36a]" />A quieter way to learn
              fast
            </div>
            <h2 className="max-w-lg text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl xl:text-7xl">
              Make room for ideas that stay with you.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/55 sm:text-lg">
              Lily sorts the noise into a clear path of useful articles, so
              every curious question has somewhere good to go.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
