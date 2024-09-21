"use client";

import { Button } from '@/components/ui/button'
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
                <Button className='w-48 bg-blue-600 text-lg font-semibold h-16'>
                    Chats
                </Button>
            </Link>
           </div>
        </div>
        <div className='w-full items-center flex justify-center h-full object-cover'>
            <div className='w-full h-full bg-blue-600 items-center flex flex-col justify-center'>
            <Link href={`/groups/${userId}?username=${username}`}>
                <Button className='w-48  text-lg font-semibold h-16' variant={'outline'}>
                    Groups
                </Button>
            </Link>
            </div>
        </div>
    </section>
  )
}

export default Features