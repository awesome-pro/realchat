import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

function PerfectSolution() {
  return (
    <section className='w-screen h-full bg-gray-100 flex items-center justify-center'>

        <div className=' size-full object-fill'>
                <Image  src={'/perfect.svg'} alt='perfect' width={500} height={500} className='w-full h-full'/>   
            
        </div>

        <div className='size-full flex flex-col items-start justify-center pl-20'>
            <h1 className='text-black text-5xl font-semibold'>
                Perfect Solution for Small Business
            </h1>
            <p className='text-lg '>
                Pricing plan feel like a glove
            </p>

            <div className='flex items-start justify-start gap-10 mt-10'>
                    <Link href='/login'>
                        <Button className='w-36 text-white'>
                            Get Started
                        </Button>
                    </Link>
                    <Link href='/login'>
                        <Button variant={'outline'} className='w-32 border-primary border-2 text-primary'>
                            Try for Free
                        </Button>
                    </Link>
                </div>
        </div>
    </section>
  )
}

export default PerfectSolution