"use client"

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { div } from 'framer-motion/client';
import { PlusCircle, PlusIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import { toast } from 'sonner';

type Group = {
    id: number,
    name: string
    user: [
        {
            id: number,
            name: string
        }
    ],
    chats: [
        {
            id: number,
            message: string,
            sender_id: number
            receiver_id: number,
            created_at: string
        }
    ]
}


function GroupLayout(
    { children }: { children: React.ReactNode }
) {
    const [groups, setGroups] = React.useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = React.useState<Group | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const searchParams = useSearchParams()
    const userId = searchParams.get('user-id') as string
    const username = searchParams.get('username') as string

    const router = useRouter();

    const fetchAllGroups = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8000/groups')
            setGroups(response.data)
            setLoading(false)
        } catch (error) {
            setError(error as string)
            setLoading(false)
        }
    }, [])

    React.useEffect(() => {
        fetchAllGroups()
    }, [fetchAllGroups])

  return (
    <section className='flex flex-col lg:flex-row items-center justify-between p-0 h-screen w-screen'>
        <section className='w-full lg:w-[25%] bg-primary/20 h-full relative'>
            <span className='w-full text-3xl my-10'>
                    <h1>Welcome to <strong>Groups</strong></h1>
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
                    groups.map((group) => (
                        <Button key={group.id} className='bg-gray-100 p-2 m-2 rounded-md w-[80%]' 
                            variant={selectedGroup?.id === group.id ? 'default' : 'ghost'}
                            onClick={() => {
                                setSelectedGroup(group)
                                if(userId && username)
                                    router.push(`/groups/${group.id}?userId=${userId}?username=${username}`)
                                else{
                                    toast.error('Sign In to view group chats')
                                    router.push('/login')
                                }
                            }}
                        >
                            {group.name}
                        </Button>
                    ))
                }
            </nav>
                <Button className='bg-primary text-white mx-4  absolute bottom-5 w-[90%] '>
                       Create New Group <PlusIcon size={20} className='ml-2'/>
                </Button>
        </section>
        <section className='w-full h-full md:w-[75%] flex flex-col items-center justify-center p-1 '>
            
            {children}
        </section>
    </section>
  )
}

export default GroupLayout