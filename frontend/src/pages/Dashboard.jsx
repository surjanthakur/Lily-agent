import { Settings2 } from 'reicon-react'
import { useRef, useState } from 'react'
import { SettingsPopupWindow } from '../components/export.js'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getAgentResponse } from '../api/agent.api.js'
import { Loader } from '../components/export.js'
import Lilylogo from '../assets/lily-logo.png'
import { ArrowToDownLeft, Magicpen } from 'reicon-react'

export default function Dashboard() {
  const [openSettings, setOpenSettings] = useState(false)
  const [agentResponse, setAgentResponse] = useState([])
  const [isAgentLoading, setIsAgentLoading] = useState(false)
  const [userResponse, setUserResponse] = useState('')

  const textareaRef = useRef(null)
  const { register, handleSubmit, reset } = useForm()

  const handleSettings = () => {
    setOpenSettings((prev) => !prev)
  }

  const handleInput = (e) => {
    const textarea = e.target

    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  const onSubmit = async (data) => {
    const userQuery = data.user_query
    setIsAgentLoading(true)

    try {
      setUserResponse(userQuery)
      const response = await getAgentResponse(userQuery)
      toast.success('agent send response...')
      setAgentResponse(response.found_resources)
    } catch (error) {
      toast.error(
        error?.response?.data?.detail ||
          error?.message ||
          'Something went wrong. Please try again.',
      )
    } finally {
      setIsAgentLoading(false)
      reset()

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }
  return (
    <section className="h-dvh overflow-hidden bg-[#e9e8e0] text-neutral-900">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col bg-[#e9e8e0]/80 backdrop-blur-sm">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between  border border-black/10 bg-[#e9e8e0]/90 px-3 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img
              src={Lilylogo}
              alt="Lily"
              className="h-8 w-8 rounded-lg object-cover sm:h-9 sm:w-9"
            />
            <span className="text-base font-semibold tracking-tight text-neutral-900">
              lily
            </span>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2.5">
            <span className="hidden text-sm font-medium text-neutral-700 sm:block">
              Surjan
            </span>
            <img
              src={Lilylogo}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
            />
          </div>
        </header>

        {/* Main content */}
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Chat */}
          <main className="min-h-0 flex-1 overflow-y-auto px-3 py-5 sm:px-6 sm:py-7 border border-black/10">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 sm:gap-6">
              {/* Empty state */}
              {!userResponse && !isAgentLoading && (
                <div className="flex min-h-[50vh] items-center justify-center px-4">
                  <div className="max-w-md text-center">
                    <img
                      src={Lilylogo}
                      alt="Lily"
                      className="mx-auto mb-4 h-12 w-12 rounded-xl object-cover opacity-90"
                    />
                    <h1 className="text-xl font-semibold tracking-tight text-neutral-800 sm:text-2xl">
                      What do you want to learn?
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Ask Lily for articles, blogs, and resources about any
                      topic you want to explore.
                    </p>
                  </div>
                </div>
              )}

              {/* User message */}
              {userResponse && (
                <div className="flex justify-end">
                  <div className="w-fit max-w-[92%] sm:max-w-[75%]">
                    <div className="rounded-2xl rounded-br-sm bg-[#292927] px-4 py-3 shadow-sm sm:px-5">
                      <p className="wrap-break-word text-sm leading-6 text-white">
                        {userResponse}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Agent response */}
              {(isAgentLoading || agentResponse.length > 0) && (
                <div className="flex justify-start">
                  <div className="w-full max-w-[98%] space-y-3 sm:max-w-[82%] sm:space-y-4">
                    {/* Loader */}
                    {isAgentLoading ? (
                      <div className="rounded-2xl rounded-tl-sm border border-black/10 bg-[#f5f4ed] p-5 shadow-sm">
                        <Loader />
                      </div>
                    ) : (
                      agentResponse.map((resource, index) => (
                        <article
                          key={`${resource.url}-${index}`}
                          className="rounded-2xl rounded-tl-sm border border-black/10 bg-[#f5f4ed] p-4 shadow-md transition-shadow hover:shadow-lg sm:p-5"
                        >
                          {/* Title */}
                          <h3 className="wrap-break-word text-base py-2 font-semibold leading-6 text-neutral-900 sm:text-lg sm:leading-7">
                            {resource.title}
                          </h3>

                          {/* URL */}
                          <span className="text-xs justify-start align-middle flex font-medium text-fuchsia-700 sm:text-sm">
                            read &nbsp;
                            <ArrowToDownLeft size={25} />
                          </span>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1.5 block break-all text-xs leading-5 text-blue-700 hover:underline sm:text-sm"
                          >
                            {resource.url}
                          </a>

                          {/* Score */}
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-medium text-lime-700 sm:text-sm">
                              good score
                            </span>
                            <span className="rounded-full bg-[#2cc53b7b] px-2.5 py-1 text-xs font-semibold text-neutral-700">
                              {(resource.score * 100).toFixed(0)}%
                            </span>
                          </div>

                          {/* Content */}
                          <p className="mt-3 wrap-break-word text-sm leading-6 text-neutral-700">
                            <span className="text-xs font-medium text-orange-700 sm:text-sm">
                              About this resource =
                            </span>{' '}
                            {resource.content
                              ?.split(/\s+/)
                              .slice(0, 100)
                              .join(' ')}
                          </p>
                        </article>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* Input area */}
          <div className="shrink-0 border border-black/10 bg-[#e9e8e0]/95 px-3 py-3 backdrop-blur-md sm:px-6 sm:py-5">
            <div className="mx-auto w-full max-w-3xl">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-end gap-1.5 rounded-2xl border border-black/15 bg-[#f5f4ed] p-2 shadow-md sm:gap-2"
              >
                {/* Settings */}
                <div className="group relative shrink-0">
                  <button
                    type="button"
                    onClick={handleSettings}
                    aria-label="Settings"
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-[#deddd4] hover:text-neutral-900"
                  >
                    <Settings2 size={20} />
                  </button>

                  {/* Tooltip */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-lg border border-black/10 bg-[#f5f4ed] px-3 py-2 text-xs font-medium whitespace-nowrap text-neutral-700 opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100">
                    Settings
                  </div>
                </div>

                {/* Textarea */}
                <textarea
                  {...register('user_query', {
                    required: 'Please enter a message.',
                    validate: (value) =>
                      value.trim().length > 0 || 'Message cannot be empty.',
                  })}
                  ref={(element) => {
                    textareaRef.current = element
                    register('user_query').ref(element)
                  }}
                  rows={1}
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Lily what you want to learn..."
                  className="max-h-50 min-h-11 flex-1 resize-none overflow-y-auto bg-transparent px-2 py-3 text-sm leading-5 text-neutral-900 outline-none placeholder:text-neutral-500 sm:px-3"
                />

                {/* Send */}
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={isAgentLoading}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#292927cd] text-lg text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Magicpen size={20} />
                </button>
              </form>

              <p className="mt-2 hidden text-center text-[11px] text-neutral-500 sm:block">
                Press Enter to send · Shift + Enter for a new line
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings popup */}
      <SettingsPopupWindow
        openSetting={openSettings}
        setSetting={handleSettings}
      />
    </section>
  )
}
