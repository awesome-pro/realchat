import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Home() {
  return (
    <section className='w-screen h-screen flex items-center mt-10 lg:mt-36 flex-col'>
        <h1 className='text-6xl font-semibold bg-gradient-to-tr from-purple-800/90 via-blue-700 to-blue-700/50 bg-clip-text text-transparent'>
            Welcome to the Realtime Chat App
        </h1>
        <div className='mx-4 flex w-screen items-center justify-center gap-20 mt-10'>
           <div className='flex gap-10 '>
            <Link href='/login'>
                    <Button>
                        New User
                    </Button>
                </Link>
                <Link href='/old'>
                    <Button variant={'ghost'} className='hover:bg-blue-600/20'>
                        Registerd Users
                    </Button>
                </Link>
           </div>
            <div className='mt-5 border-2 shadow-lg z-30 shadow-primary lg:ml-10'>
                <Image src='https://i.pinimg.com/originals/e3/1b/75/e31b752875679b64fce009922f9f0dda.gif' width={500} height={500} alt='chat' unoptimized/>
            </div>
        </div>

    <div className='w-screen flex flex-col items-start justify-between lg:pl-10 py-10 bg-primary/10'>
        <h3 className='text-2xl font-semibold'>
            All Services
        </h3>
        <div className='flex flex-col lg:flex-row text-primary lg:gap-10 mt-5'>
            <Link href='/chats' className='hover:underline'>
                All Chats
            </Link>
            <Link href='/chats' className='hover:underline'>
                All Users
            </Link>
        </div>
    </div>
        
    </section>
  )
}

export default Home