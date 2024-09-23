import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

function Hero() {
  return (
    <section className='w-screen h-screen bg-primary flex items-center justify-center'>
        <section className='w-full h-full flex flex-col items-center justify-center p-10 lg:p-32'>
            <h1 className='text-3xl lg:text-7xl bg-gradient-to-tr from-blue-100 via-blue-50 to-white bg-clip-text text-transparent font-bold'>
                Have your Real Chat 
            </h1>
            <p className='text-xl text-white '>
                Aiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudan.
            </p>
            <div className='flex items-center justify-center gap-10 mt-10'>
                <Link href='/login'>
                    <Button className='bg-white text-primary w-36 hover:bg-white/90'>
                        New User
                    </Button>
                </Link>
                <Link href='/features'>
                    <Button variant={'outline'} className='bg-transparent border-white border-2 text-white'>
                        Registered Users
                    </Button>
                </Link>
            </div>
        </section>
        <section className='w-full h-full relative flex items-center justify-center'>
            <Image src={'/p.svg'} alt='dots' width={539} height={680}/>
        </section>
    </section>
  )
}

export default Hero