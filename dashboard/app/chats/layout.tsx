"use client"

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { div } from 'framer-motion/client';
import { PlusCircle, PlusIcon } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import { toast } from 'sonner';

type user = {
    username: string,
    id: number
}


function ChatLayout(
    { children }: { children: React.ReactNode }
) {
    const [users, setusers] = React.useState<user[]>([]);
    const [selecteduser, setSelecteduser] = React.useState<user | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const searchParams = useSearchParams()
    const userId = useParams().id as string
    const username = searchParams.get('username') as string

    const router = useRouter();

    const fetchAllusers = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8000/users')
            setusers(response.data)
            setLoading(false)
        } catch (error) {
            setError(error as string)
            setLoading(false)
        }
    }, [])

    React.useEffect(() => {
        fetchAllusers()
    }, [fetchAllusers])

  return (
    <section className='flex flex-col lg:flex-row items-center justify-between p-0 h-screen w-screen'>
        <section className='w-full lg:w-[25%] bg-primary/20 h-full relative'>
            <span className='w-full text-2xl my-10'>
                    <h1>Welcome to <strong>Private Chat</strong></h1>
            </span>
            <nav className='flex flex-col items-center justify-start mt-10'>
                {
                    error && (
                        <div className='bg-red-500 text-white p-2 rounded-md'>
                            {error}
                        </div>
                    )
                }
                {loading && (
                  <div className='flex flex-col gap-2'>
                     <Skeleton className='w-[80%] m-2'/>
                     <Skeleton className='w-[80%] m-2'/>
                     <Skeleton className='w-[80%] m-2'/>
                     <Skeleton className='w-[80%] m-2'/>
                  </div>
                )}

                {
                    users.map((user) => (
                        <Button key={user.id} className='bg-gray-100 p-2 m-2 rounded-md w-[80%]' 
                            variant={selecteduser?.id === user.id ? 'default' : 'ghost'}
                            onClick={() => {
                                setSelecteduser(user)
                                if(userId)
                                    router.push(`/chats/${userId}?receiver=${user.id}&receivername=${user.username}`)
                                else{
                                    toast.error('Sign In to view user chats')
                                    router.push('/login')
                                }
                            }}
                        >
                            {user.username}
                        </Button>
                    ))
                }
            </nav>
                <Button className='bg-primary text-white mx-4  absolute bottom-5 w-[90%] '>
                       Create New user <PlusIcon size={20} className='ml-2'/>
                </Button>
        </section>
        <section className='w-full h-full flex flex-col items-center justify-center'>
            
            {children}
        </section>
    </section>
  )
}

export default ChatLayout