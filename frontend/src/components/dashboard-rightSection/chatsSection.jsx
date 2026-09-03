const messages = [
  {
    sender: 'agent',
    type: 'heading',
    title: 'Real-Life Analogy',
    content: [
      'Isse ek Restaurant Order per sameja hainn:',
      '1. Aap (Consumer Thread) order dekhar table par baith jaate hain aur wait karte hain ( pthread_cond_wait ).',
      '2. Waiter/Chef (Producer Thread) khana prepare karta hai.',
      '3. Khana tyaar hone par Chef bell bajata hai ( pthread_cond_signal ).',
      '4. Bell sun kar aap khana khane shuru karte hain. Aapko har 10 second mein kitchen mein jaakar dekhn hai padi ki khana bana ya nahi!',
    ],
  },
  {
    sender: 'user',
    type: 'bubble',
    text: 'mujhe simple real life analogy se samjho samjhao ok',
  },
  {
    sender: 'agent',
    type: 'reply',
    text: 'Bilkul! Semaphor ko sabse aasani se samjhne ke liye ek Parking Lot (Ya Restaurant Tables) ki analogy lete hain.',
  },
  {
    sender: 'agent',
    type: 'heading',
    title: 'Real-Life Analogy: Hotel Ki Parking Lot',
    content: [
      'Maan lijiye ek hotel ke paas ek Parking Lot hai jisme total 3 parking slots (instances) hain.',
      'Har car ek thread hoti hai jo slot book karna chahti hai.',
      'Agar slot khali hai, car park ho jaati hai aur agar slots bhar gaye, car ko wait karna padta hai.',
    ],
  },
]

export default function ChatSection() {
  return (
    <section className="flex-1 overflow-y-auto pb-6 pt-1 sm:pt-3">
      <div className="mx-auto max-w-275 space-y-8">
        {messages.map((message, index) => {
          if (message.sender === 'user') {
            return (
              <div key={index} className="flex justify-end">
                <div className="max-w-[90%] rounded-full bg-[#1d1d1d] px-5 py-3 text-base text-white shadow-xl font-light shadow-slate-950/20 sm:px-7 sm:text-lg">
                  {message.text}
                </div>
              </div>
            )
          }

          return (
            <div key={index} className="max-w-245 text-slate-100">
              {message.type === 'heading' ? (
                <>
                  <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {message.title}
                  </h2>

                  {message.content.map((paragraph, paragraphIndex) => (
                    <p
                      key={`${message.title}-${paragraphIndex}`}
                      className={`mt-4 text-base leading-8 text-slate-200 sm:text-lg ${
                        paragraphIndex === 0 ? 'font-medium' : ''
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </>
              ) : (
                <p className="text-lg leading-8 text-slate-200 sm:text-xl">
                  {message.text}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
