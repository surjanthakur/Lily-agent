export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f6f0] text-black">
      {/* ================= HERO ================= */}
      <section
        className="
          relative min-h-screen
          border border-[#deddd5]
          bg-[#f7f6f0]
          px-5 py-8
          sm:px-8
          lg:px-12
        "
        style={{
          backgroundImage: `
            linear-gradient(#deddd5 1px, transparent 1px),
            linear-gradient(90deg, #deddd5 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      >
        {/* subtle inner background */}
        <div className="absolute inset-0 bg-[#f7f6f0]/60" />

        {/* ================= TOP BRAND ================= */}
        <div className="relative z-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center">
              {/* flower */}
              <div className="absolute h-7 w-7 rounded-full bg-black" />

              {Array.from({ length: 8 }).map((_, index) => (
                <span
                  key={index}
                  className="absolute h-5 w-3 rounded-full bg-black"
                  style={{
                    transform: `rotate(${index * 45}deg) translateY(-13px)`,
                  }}
                />
              ))}
            </div>

            <span className="text-2xl font-bold tracking-tight">lily</span>
          </div>

          {/* CTA */}
          <button
            className="
              rounded-xl
              border-2 border-black
              bg-[#caff8a]
              px-5 py-3
              text-sm font-bold
              shadow-[4px_5px_0px_#dca9f5]
              transition-all
              hover:-translate-y-1
              hover:shadow-[6px_7px_0px_#dca9f5]
            "
          >
            Start learning
          </button>
        </div>

        {/* ================= HEADING ================= */}
        <div
          className="
            relative z-10 mx-auto
            mt-12 max-w-5xl
            text-center
            sm:mt-16
            lg:mt-10
          "
        >
          <h1
            className="
              font-serif
              text-[42px]
              leading-[0.98]
              tracking-[-2px]
              sm:text-[58px]
              lg:text-[68px]
            "
          >
            Tell us what you want to learn.
            <br />
            <span
              className="
                relative inline
                px-2
                before:absolute
                before:inset-x-0
                before:bottom-1
                before:-z-10
                before:h-[72%]
                before:bg-[#f2a9dd]
              "
            >
              Lily finds the best resources for you.
            </span>
          </h1>

          <p
            className="
              mx-auto mt-7 max-w-2xl
              font-mono
              text-sm
              leading-6
              text-[#55554f]
              sm:text-base
            "
          >
            Read the best articles and blogs out there.
            <br className="hidden sm:block" />
            Don't dig through the internet — we'll find them for you.
          </p>
        </div>

        {/* ================= COLLAGE ================= */}
        <div
          className="
            relative z-10
            mx-auto mt-16
            h-[470px]
            max-w-7xl
            sm:mt-20
            lg:h-[500px]
          "
        >
          {/* ---------- LEFT IMAGE CARD ---------- */}
          <div
            className="
              absolute
              left-[2%]
              top-[55px]
              hidden
              w-[230px]
              rotate-[-6deg]
              overflow-hidden
              rounded-2xl
              border-2 border-black
              bg-white
              shadow-[5px_6px_0px_#000]
              md:block
              lg:w-[280px]
            "
          >
            <div className="h-[270px] bg-gradient-to-br from-[#e8d4bd] via-[#d9e6c2] to-[#a5c5aa]">
              <div className="flex h-full items-end p-5">
                <div className="rounded-lg bg-white/80 p-3 backdrop-blur">
                  <p className="font-serif text-lg">Design & creativity</p>
                  <p className="mt-1 text-xs text-gray-600">12 resources</p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- LEFT FLOATING PROMPT ---------- */}
          <div
            className="
              absolute
              left-[0%]
              top-[330px]
              z-30
              hidden
              rotate-[-2deg]
              rounded-xl
              border-2 border-black
              bg-[#caff8a]
              px-4 py-3
              shadow-[4px_5px_0px_#000]
              md:block
            "
          >
            <p className="max-w-[230px] font-mono text-sm font-bold">
              Find me beginner-friendly
              <br />
              articles about AI agents.
            </p>
          </div>

          {/* ---------- BLACK BOOK CARD ---------- */}
          <div
            className="
              absolute
              left-[18%]
              top-[25px]
              z-20
              hidden
              h-[390px]
              w-[240px]
              rotate-[4deg]
              rounded-2xl
              border-2 border-black
              bg-[#17252a]
              p-5
              text-white
              shadow-[6px_7px_0px_#000]
              md:block
              lg:left-[24%]
              lg:w-[260px]
            "
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="font-serif text-5xl font-bold">Learn</p>

                <p className="mt-1 font-serif text-5xl font-bold">smarter</p>
              </div>

              <div
                className="
                  mx-auto
                  flex h-[190px]
                  w-[160px]
                  rotate-[-3deg]
                  items-center
                  justify-center
                  border-2 border-black
                  bg-[#f4f1e8]
                  text-black
                "
              >
                <div className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full border-2 border-black bg-[#d9a5ed]" />

                  <p className="font-serif text-xl">Lily's</p>

                  <p className="font-mono text-xs">RESOURCE CLUB</p>
                </div>
              </div>

              <p className="font-mono text-xs uppercase">
                Articles • Blogs • Guides
              </p>
            </div>
          </div>

          {/* ---------- TOP PROMPT ---------- */}
          <div
            className="
              absolute
              left-[20%]
              top-[-15px]
              z-40
              hidden
              rotate-[-6deg]
              rounded-xl
              border-2 border-black
              bg-[#ffd55d]
              px-4 py-3
              shadow-[4px_5px_0px_#000]
              md:block
              lg:left-[27%]
            "
          >
            <p className="max-w-[230px] font-mono text-sm font-bold">
              Help me learn
              <br />
              LangGraph from scratch.
            </p>
          </div>

          {/* ---------- CENTER FLOW CARD ---------- */}
          <div
            className="
              absolute
              left-[35%]
              top-[35px]
              z-10
              hidden
              h-[405px]
              w-[270px]
              rotate-[-2deg]
              rounded-2xl
              border-2 border-black
              bg-[#f7f4eb]
              p-4
              shadow-[5px_6px_0px_#000]
              md:block
              lg:left-[40%]
              lg:w-[290px]
            "
          >
            <div className="flex h-full flex-col">
              <p className="font-serif text-4xl">Let it flow</p>

              <div className="relative mt-5 flex flex-1 items-center justify-center overflow-hidden rounded-xl bg-[#d5ff93]">
                {/* simple flower illustration */}
                <div className="relative h-44 w-44">
                  <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb65e] border-2 border-black" />

                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="absolute left-1/2 top-1/2 h-24 w-14 origin-bottom rounded-full border-2 border-black bg-white"
                      style={{
                        transform: `
                          translate(-50%, -100%)
                          rotate(${index * 60}deg)
                          translateY(-5px)
                        `,
                      }}
                    />
                  ))}

                  <div className="absolute bottom-[-10px] left-1/2 h-20 w-2 -translate-x-1/2 bg-black" />
                </div>
              </div>

              <div className="mt-3 flex justify-between font-mono text-xs">
                <span>Research</span>
                <span>→</span>
                <span>Learn</span>
              </div>
            </div>
          </div>

          {/* ---------- CENTER IMAGE ---------- */}
          <div
            className="
              absolute
              left-[54%]
              top-[65px]
              z-20
              hidden
              h-[320px]
              w-[240px]
              rotate-[3deg]
              overflow-hidden
              rounded-2xl
              border-2 border-black
              bg-gradient-to-br
              from-[#f8a7c8]
              via-[#c7b4ed]
              to-[#8ed0bd]
              shadow-[5px_6px_0px_#000]
              md:block
              lg:w-[260px]
            "
          >
            <div className="flex h-full flex-col justify-between p-5">
              <span className="w-fit rounded-full bg-white px-3 py-1 font-mono text-xs">
                FEATURED
              </span>

              <div>
                <div className="mb-4 text-7xl">🧠</div>

                <h3 className="font-serif text-3xl leading-none">
                  The future
                  <br />
                  of AI
                </h3>

                <p className="mt-3 font-mono text-xs">
                  8 articles selected for you
                </p>
              </div>
            </div>
          </div>

          {/* ---------- RIGHT ARTICLE CARD ---------- */}
          <div
            className="
              absolute
              right-[3%]
              top-[60px]
              z-10
              hidden
              h-[350px]
              w-[260px]
              rotate-[5deg]
              rounded-2xl
              border-2 border-black
              bg-white
              p-5
              shadow-[5px_6px_0px_#000]
              lg:block
            "
          >
            <p className="font-mono text-xs text-gray-500">
              LILY / RECOMMENDED
            </p>

            <h3 className="mt-5 font-serif text-3xl leading-tight">
              Building
              <br />
              AI Agents
            </h3>

            <p className="mt-4 text-sm leading-5 text-gray-600">
              A curated collection of practical resources to understand agents,
              tools, memory and workflows.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <div className="h-16 rounded-lg bg-[#d6ff92]" />
              <div className="h-16 rounded-lg bg-[#c9b0ed]" />
              <div className="h-16 rounded-lg bg-[#ffb8db]" />
              <div className="h-16 rounded-lg bg-[#ffe16c]" />
            </div>

            <button className="mt-5 rounded-lg border border-black bg-black px-4 py-2 font-mono text-xs text-white">
              Explore resources →
            </button>
          </div>

          {/* ---------- RIGHT FLOATING PROMPT ---------- */}
          <div
            className="
              absolute
              right-[8%]
              top-[340px]
              z-40
              hidden
              rotate-[4deg]
              rounded-xl
              border-2 border-black
              bg-[#d8a7f1]
              px-4 py-3
              shadow-[4px_5px_0px_#000]
              lg:block
            "
          >
            <p className="max-w-[220px] font-mono text-sm font-bold">
              Find resources for
              <br />
              system design.
            </p>
          </div>

          {/* ---------- COMING SOON BUBBLE ---------- */}
          <div
            className="
              absolute
              right-[20%]
              top-[0px]
              z-40
              hidden
              h-28
              w-28
              rotate-[12deg]
              items-center
              justify-center
              rounded-full
              border-2 border-black
              bg-[#f5a9dd]
              md:flex
            "
          >
            <div className="text-center">
              <div className="text-3xl">☺</div>
              <p className="mt-1 font-mono text-[9px] font-bold">COMING SOON</p>
            </div>
          </div>

          {/* ================= MOBILE COLLAGE ================= */}
          <div className="absolute inset-x-5 top-10 flex flex-col items-center md:hidden">
            <div className="w-full max-w-sm rotate-[-3deg] rounded-2xl border-2 border-black bg-[#17252a] p-5 text-white shadow-[5px_6px_0px_#000]">
              <p className="font-serif text-4xl">Learn smarter</p>

              <div className="mt-5 flex h-44 items-center justify-center rounded-xl bg-[#d5ff93]">
                <span className="text-7xl">🧠</span>
              </div>

              <p className="mt-4 font-mono text-xs">
                Articles • Blogs • Guides
              </p>
            </div>

            <div className="relative -mt-8 w-[90%] rotate-[3deg] rounded-2xl border-2 border-black bg-white p-5 shadow-[5px_6px_0px_#000]">
              <p className="font-mono text-xs text-gray-500">
                LILY / RECOMMENDED
              </p>

              <h3 className="mt-3 font-serif text-3xl">Building AI Agents</h3>

              <p className="mt-2 text-sm text-gray-600">
                Curated resources picked according to your learning goal.
              </p>
            </div>

            <div className="relative -mt-6 w-[80%] -rotate-2 rounded-xl border-2 border-black bg-[#caff8a] px-4 py-3 shadow-[4px_5px_0px_#000]">
              <p className="font-mono text-xs font-bold">
                Find me beginner-friendly resources about LangGraph.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
