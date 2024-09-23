"use client";

import Trust from '@/components/trust';
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React from 'react'

function Features() {
    const searchParams = useSearchParams()
    const userId =  Number(searchParams.get('id')) 
    const username = searchParams.get('username') as string


  return (
    <section className='w-screen h-screen flex flex-col  items-center justify-center object-fill'>
      <section className='w-full text-center justify-end h-full relative'>
        <h1 className=' text-7xl bg-gradient-to-tr from-primary/90 via-blue-600/90 to-sky-400 text-transparent bg-clip-text font-bold'>Get Started with what you like ?</h1>
      </section>

        <section className='flex items-center justify-center w-full h-full'>
        <div className='w-full h-full'>
           <div className='w-full h-full backdrop-blur-md flex flex-col items-center justify-center'>
            <Link href={`/chats/${userId}?username=${username}`}>
                <h1 className='text-3xl font-semibold w-full text-center mb-10'>
                    Your Chats are always private
                </h1>
                <div className='w-full text-center items-center'>
                <Button className='w-48 bg-blue-600 font-semibold mt-10'>
                    Continue to Chats
                </Button>
                </div>
            </Link>
           </div>
        </div>
        <div className='w-full items-center flex justify-center h-full object-cover'>
            <div className='w-full h-full bg-primary/20 items-center flex flex-col justify-center'>
            <Link href={`/groups/${userId}?userid=${userId}&username=${username}`}>
                <h1 className='text-3xl font-semibold w-full text-center mb-10'>
                    Get engaged in groups
                </h1>
                <div className='w-full text-center items-center'>
                <Button className='w-48 font-semibold mt-10' variant={'ghost'}>
                    Go to Groups
                </Button>
                </div>
            </Link>
            </div>
        </div>

        </section>

        
    </section>
  )
}

export default Features