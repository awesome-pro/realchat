import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import Trust from '@/components/trust'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Home() {
  return (
    <section className='w-screen h-screen flex items-center mt-10 lg:mt-36 flex-col'>
        <Navbar/>
        <h1 className='text-6xl font-bold bg-gradient-to-tr from-blue-600/90 via-sky-500 to-blue-600 bg-clip-text text-transparent'>
             Chat with your friends in Real time
        </h1>
        <div className='mx-4 flex w-screen items-center justify-center gap-20 lg:gap-40 mt-10'>
           <div className='flex gap-10 '>
            <Link href='/login'>
                    <Button className='text-white w-36'>
                        New User
                    </Button>
                </Link>
                <Link href='/features'>
                    <Button variant={'ghost'} className='hover:bg-blue-600/20 w-36'>
                        Registered Users
                    </Button>
                </Link>
           </div>
            <div className='mt-5 border-2 shadow-lg z-30 shadow-primary lg:ml-10'>
                <Image src='https://i.pinimg.com/originals/e3/1b/75/e31b752875679b64fce009922f9f0dda.gif' width={500} height={500} alt='chat' unoptimized/>
            </div>
        </div>

        <Trust  />

        <Footer />
    </section>
  )
}

export default Home