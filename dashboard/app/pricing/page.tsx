import Pricing from '@/components/pricing'
import React from 'react'

function Page() {
  return (
    <section className='w-screen min-h-screen flex flex-col items-center justify-center'>
        < h1 className='text-6xl font-semibold mb-10 text-transparent bg-gradient-to-tr from-primary/90 via-sky-400 to-blue-500 bg-clip-text'>A very simple Pricing for our Real Chats</h1>
        <Pricing />
    </section>
  )
}

export default Page