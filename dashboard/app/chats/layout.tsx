"use client"

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { ArrowLeftIcon, PlusIcon } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react'
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
    const receiverID = Number(searchParams.get('receiver') as unknown)

    const [websocket, setWebsocket] = React.useState<WebSocket | null>(null)
    const [activeUsers, setActiveUsers] = React.useState<any[]>([])

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

    useEffect(() => {
        // Implement the websocket to get all active users in real-time
        const ws = new WebSocket('ws://localhost:8000/active_users')
    
        ws.onopen = () => {
            console.log('Connected to websocket for active users')
        }
    
        ws.onmessage = (event) => {
            const activeUsers = JSON.parse(event.data)
            console.log("Active Users: ", activeUsers)
            setActiveUsers(activeUsers)  // Update state
        }
    
        ws.onclose = () => {
            console.log('Disconnected from websocket for active users')
        }
    
        setWebsocket(ws)
    
        return () => {
            ws.close()
        }
    }, [])
    

  return (
    <section className='flex flex-col lg:flex-row items-center justify-between p-0 h-screen w-screen'>
        <section className='w-full lg:w-[25%] bg-primary/20 lg:h-full relative'>
            <div className='w-full text-2xl flex items-start gap-5 mt-4 ml-2'>
                    <Button className='text-white bg-primary/50' size={'icon'} variant={'ghost'}
                     onClick={() => {
                        router.push(`/features?id=${userId}&username=${username}`)
                     }}
                    >
                          <ArrowLeftIcon size={20} className='mx-2'/>
                    </Button>
                    <h1 className='text-md'>Welcome to<strong>Private Chat</strong></h1>
            </div>
            <nav className='flex lg:flex-col items-center justify-start mt-5 lg:mt-10 overflow-x-scroll lg:overflow-y-scroll'>
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
                        <Button key={user.id} className={cn(
                            'lg:w-[80%] m-2',
                            receiverID === user.id ? 'text-white' : 'bg-white text-black'
                        )} 
                            variant={receiverID === user.id ? 'default' : 'ghost'}
                            onClick={() => {
                                setSelecteduser(user)
                                if(userId)
                                    router.push(`/chats/${userId}?username=${username}&receiver=${user.id}&receivername=${user.username}`)
                                else{
                                    toast.error('Sign In to view user chats')
                                    router.push('/login')
                                }
                            }}
                        >
                            {user.username}
                            {
                                // active users is a list of userIDs, so check if the current user id is present in the list
                                activeUsers.includes(user.id) && (
                                    <span className='bg-green-500 w-2 h-2 rounded-full ml-2'/>
                                )
                            }
                        </Button>
                    ))
                }
            </nav>
                <Button className='hidden bg-primary text-white mx-4  absolute bottom-5 w-[90%] '>
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