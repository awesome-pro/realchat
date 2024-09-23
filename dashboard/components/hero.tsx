import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

function Hero() {
  return (
    <section className='max-w-screen max-h-screen h-screen bg-primary flex flex-col items-center'>
        <nav className='w-full lg:px-20 lg:py-6 flex px-4 items-center justify-between text-gray-100/80 '>
            <span className='text-3xl font-semibold text-white w-full text-start'>
                RealChat
            </span>
            <div className='flex  items-end justify-between w-full'>
                <Link href={'/features'} className='hover:text-white'>
                    Features
                </Link>
                <Link href={'/pricing'} className='hover:text-white'>
                    Pricing
                </Link>
                <Link href={'/features'} className='hover:text-white'>
                    Sign In
                </Link>
                <Link href={'/features'}>
                    <Button className='bg-gray-200 hover:bg-white text-primary'>
                       Get Started
                    </Button>
                </Link>
            </div>  
        </nav>
        <section className='w-full h-full flex items-center justify-center'>
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
    </section>
  )
}

export default Hero