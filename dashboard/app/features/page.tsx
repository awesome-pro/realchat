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
    <section className='w-screen h-screen flex flex-col lg:flex-row items-center justify-between object-fill'>
        <div className='w-full h-full'>
           <div className='w-full h-full backdrop-blur-md flex flex-col items-center justify-center'>
            <Link href={`/chats/${userId}?username=${username}`}>
                <h1 className='text-3xl font-semibold w-full text-center mb-10'>
                    Your Chats are always private
                </h1>
                <Image src='https://media.giphy.com/media/3zS79YCcLXdUA/giphy.gif' width={600} height={600} alt='chat' unoptimized/>
                <div className='w-full text-center items-center'>
                <Button className='w-48 bg-blue-600 font-semibold mt-10'>
                    Continue to Chats
                </Button>
                </div>
            </Link>
           </div>
        </div>
        <div className='w-full items-center flex justify-center h-full object-cover'>
            <div className='w-full h-full bg-blue-600/20 items-center flex flex-col justify-center'>
            <Link href={`/groups/${userId}?userid=${userId}&username=${username}`}>
                <h1 className='text-3xl font-semibold w-full text-center mb-10'>
                    Get engaged in groups
                </h1>
                <Image src='https://cdn.dribbble.com/users/472667/screenshots/15669289/group-chat-animated-illustration.gif' width={600} height={600} alt='chat' unoptimized/>
                <div className='w-full text-center items-center'>
                <Button className='w-48 font-semibold mt-10' variant={'ghost'}>
                    Go to Groups
                </Button>
                </div>
            </Link>
            </div>
        </div>


        
    </section>
  )
}

export default Features