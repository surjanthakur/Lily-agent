import Lilyflower from '../assets/lily-3-transparent.png'

export default function HomePage() {
  return (
    <>
      <section className="min-h-screen overflow-hidden bg-transparent">
        {/* ================= HERO ================= */}
        <section
          className="relative min-h-screen border border-[#deddd5] bg-[#f7f6f0] px-5 py-8 sm:px-8 lg:px-12
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

          {/* ================= HEADING ================= */}
          <div
            className=" relative z-10 mx-auto mt-12 max-w-5xl text-center sm:mt-16 lg:mt-10
          "
          >
            <h1
              className=" font-serif text-[42px]  leading-[0.98]  tracking-[-2px]  sm:text-[58px]  lg:text-[68px]
            "
            >
              Tell us what you want to learn.
              <br />
              <span
                className=" relative inline px-2 before:absolute before:inset-x-0  before:bottom-1  before:-z-10  before:h-[72%]  before:bg-[#f2a9dd]
              "
              >
                Lily finds the best resources for you.
              </span>
            </h1>

            <p
              className=" mx-auto mt-7 max-w-2xl font-mono text-sm leading-6 text-[#55554f] sm:text-base
            "
            >
              Read the best articles and blogs out there.
              <br className="hidden sm:block" />
              Don't dig through the internet — we'll find them for you.
            </p>
          </div>

          {/* ================= COLLAGE ================= */}
          <div
            className=" relative z-10 mx-auto mt-16 h-117.5 max-w-7xl sm:mt-20 lg:h-125
          "
          >
            {/* ---------- LEFT IMAGE CARD ---------- */}
            <div
              className="  absolute  left-[2%]  top-13.75  hidden  w-57.5  -rotate-6  overflow-hidden  rounded-2xl  border-2 border-black  bg-white  shadow-[5px_6px_0px_#000]  md:block
              lg:w-70
            "
            >
              <div className="h-67.5 bg-linear-to-br from-[#e8d4bd] via-[#d9e6c2] to-[#a5c5aa]">
                <div className="flex h-full items-end p-5">
                  <div className="rounded-lg bg-white/80 p-3 backdrop-blur">
                    <p className="font-serif text-lg">
                      About agents and memory
                    </p>
                    <p className="mt-1 text-xs text-gray-600">5 resources</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- LEFT FLOATING PROMPT ---------- */}
            <div
              className="
              absolute
              left-[0%]
              top-78.5
              z-30
              hidden
              -rotate-2
              rounded-xl
              border-2 border-black
              bg-[#caff8a]
              px-4 py-3
              shadow-[4px_5px_0px_#000]
              md:block
            "
            >
              <p className="max-w-57.5 font-mono text-sm font-bold">
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
              top-6.25
              z-20
              hidden
              h-97.5
              w-60
              rotate-[4deg]
              rounded-2xl
              border-2 border-white
              bg-[#17252a]
              p-5
              text-white
              shadow-[6px_7px_0px_#000]
              md:block
              lg:left-[24%]
              lg:w-65
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
                  flex h-47.5
                  w-40
                  -rotate-3
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
                  Articles • Blogs [ finder ]
                </p>
              </div>
            </div>

            {/* ---------- TOP PROMPT ---------- */}
            <div
              className="
              absolute
              left-[20%]
              -top-10.75
              z-40
              hidden
              -rotate-6
              rounded-xl
              border-2 border-black
              bg-[#ffd55d]
              px-4 py-3
              shadow-[4px_5px_0px_#000]
              md:block
              lg:left-[27%]
            "
            >
              <p className="max-w-70.5 font-mono text-sm font-bold">
                Help me learn
                <br />
                DBMS from scratch
              </p>
            </div>

            {/* ---------- CENTER FLOW CARD ---------- */}
            <div
              className="
              absolute
              left-[35%]
              top-8.75
              z-10
              hidden
              h-101.25
              w-67.5
              -rotate-2
              rounded-2xl
              border-2 border-black
              bg-[#f7f4eb]
              p-4
              shadow-[5px_6px_0px_#000]
              md:block
              lg:left-[47%]
              lg:w-72.5
            "
            >
              <div className="flex h-full flex-col">
                <p className="font-serif text-4xl">
                  Let it flow with Lily-agent !!
                </p>

                <div className="relative mt-5 flex flex-1 items-center justify-center overflow-hidden rounded-xl bg-[#d5ff93]">
                  {/* simple flower illustration */}
                  <img src={Lilyflower} alt="flower-logo"></img>
                </div>

                <div className="mt-3 flex justify-between font-mono text-xs">
                  <span>Research</span>
                  <span>to</span>
                  <span>Learn</span>
                </div>
              </div>
            </div>

            {/* ---------- RIGHT ARTICLE CARD ---------- */}
            <div
              className="
              absolute
              right-[3%]
              top-15
              z-10
              hidden
              h-80
              w-80
              rotate-[5deg]
              rounded-2xl
              border-2 border-black
              bg-amber-100
              p-5
              shadow-[5px_6px_0px_#000]
              lg:block
            "
            >
              <p className="font-mono text-xs text-gray-500">more on...</p>

              <h3 className="mt-5 font-serif text-3xl leading-tight">
                Building
                <br />
                persistent multi chat system
              </h3>

              <p className="mt-4 text-sm leading-5 text-gray-600">
                create multiple chats with more context window size , comming in
                2nd version ,we'r working on it...
              </p>
            </div>

            {/* ---------- COMING SOON BUBBLE ---------- */}
            <div
              className="
              absolute
              right-[10%]
              top-0
              z-40
              hidden
              h-28
              w-28
              rotate-12
              items-center
              justify-center
              rounded-full
              border-2 border-black
              bg-lime-300
              md:flex
            "
            >
              <div className="text-center">
                <div className="text-3xl">☺</div>
                <p className="mt-1 font-mono text-[9px] font-bold">
                  COMING SOON
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}
