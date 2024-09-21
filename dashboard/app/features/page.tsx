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
    <section className='w-screen h-screen flex flex-col lg:flex-row items-center justify-between'>
        <div className='w-full'>
            <Link href={`/chats/${userId}?username=${username}`}>
                <Button>
                    Chats
                </Button>
            </Link>
        </div>
        <div className='w-full items-center flex justify-center'>
            <Link href={`/groups/${userId}`}>
                <Button>
                    Groups {userId}
                </Button>
            </Link>
        </div>
    </section>
  )
}

export default Features