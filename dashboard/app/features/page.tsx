"use client";

import Trust from '@/components/trust';
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card';
import { Laugh, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React from 'react'

function Features() {
    const searchParams = useSearchParams()
    const userId =  Number(searchParams.get('id')) 
    const username = searchParams.get('username') as string


  return (
    <section className='relative w-screen h-screen flex flex-col items-center justify-center gap-20'>

        <h1 className='text-6xl font-semibold  text-transparent bg-gradient-to-tr from-primary/90 via-sky-400 to-blue-500 bg-clip-text'>
         Get Stated with what you love 
        </h1>

        <div className='flex items-center justify-center gap-20'>
         <Link href={`/chats/${userId}?username=${username}`}>
                <Button className='w-48 bg-blue-600 font-semibold mt-10 text-white'>
                    Continue to Chats
                </Button>
            </Link>

            <Link href={`/groups/${userId}?userid=${userId}&username=${username}`}>
                <Button className='w-48 font-semibold mt-10' variant={'outline'}>
                    Go to Groups
                </Button>
            </Link>
        </div>

       <Card className='absolute  bottom-20 flex items-center justify-center gap-20 text-primary  font-semibold p-4 rounde-sm'>
          <p className='text-center flex '>
            You Chats are always private and safe with Us
            <Lock size={20} className='ml-2'/>
          </p>
          <p className='flex items-center '>
            Groups are always fun and interactive with Us <Laugh size={20} className='ml-2 bg-yellow-50 bg-clip-text'/>
          </p>
       </Card>
        
    </section>
  )
}

export default Features