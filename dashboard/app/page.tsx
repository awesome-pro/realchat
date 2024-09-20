import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Home() {
  return (
    <section className='w-screen h-screen flex items-center mt-10 lg:mt-56 flex-col'>
        <h1 className='text-6xl font-semibold bg-gradient-to-tr from-purple-800/90 via-blue-700 to-blue-700/50 bg-clip-text text-transparent'>
            Welcome to the Realtime Chat App
        </h1>
        <div className='mx-4 flex w-screen items-center justify-center gap-6 mt-10'>
            <Link href='/login'>
                <Button>
                    New User
                </Button>
            </Link>
            <Link href='/old'>
                <Button variant={'ghost'} className='hover:bg-blue-600/20'>
                    Continue as old User
                </Button>
            </Link>
        </div>
    </section>
  )
}

export default Home