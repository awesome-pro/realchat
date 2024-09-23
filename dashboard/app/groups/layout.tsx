"use client"

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { div } from 'framer-motion/client';
import { ArrowLeftIcon, PlusCircle, PlusIcon } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import { toast } from 'sonner';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Input } from '@/components/ui/input';
  


function GroupLayout(
    { children }: { children: React.ReactNode }
) {
    const [groups, setGroups] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const searchParams = useSearchParams()
    const userId = searchParams.get('userid') as string
    const username = searchParams.get('username') as string
    const groupID = Number(useParams().id as unknown)

    const router = useRouter();

    const [currentGroupID, setCurrentGroupID] = React.useState<number | null>(groupID)
    const [sheetOpen, setSheetOpen] = React.useState(false)

    const createNewGroup = async (groupName: string) => {
        setLoading(true)
        setSheetOpen(true)
        try {
            const response = await axios.post('http://localhost:8000/groups', {
                name: groupName
            })
            setGroups([...groups, response.data])
        } catch (error) {
            setError(error as string)
            toast.error('An error occurred while creating a new group')
        }finally{
            setLoading(false)
            setSheetOpen(false)
        }
    }

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
            <span className='w-full text-2xl my-10 flex items-center justify-start  gap-4 pl-5'>
                <Button className='text-white bg-primary/50' size={'icon'} variant={'ghost'}
                    onClick={() => {
                        router.push(`/features?id=${userId}&username=${username}`)
                    }}
                >
                    <ArrowLeftIcon size={20} className='mx-2'/>
                </Button>

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
                        <Button key={group.id} className={cn(
                            'lg:w-[80%] m-2',
                            groupID === group.id ? 'text-white' : 'bg-white text-black'
                        )} 
                            variant={groupID === group.id ? 'default' : 'ghost'}
                            onClick={() => {
                                setCurrentGroupID(group.id)
                                if(userId)
                                    router.push(`/groups/${group.id}?userid=${userId}&username=${username}`)
                                else{
                                    toast.error('Sign In to view group chats')
                                    router.push('/login')
                                }
                            }}
                        >
                            <span className='flex items-center justify-between px-1 w-full'>
                               <p>
                               {group.name}
                               </p>
                                <p>
                                {group.id}
                                </p>
                            </span>
                        </Button>
                    ))
                }
            </nav>
            <Sheet open={sheetOpen} onOpenChange={
                (open) => setSheetOpen(open)
            }>
            <SheetTrigger className=' absolute bottom-5 bg-primary w-[90%] rounded-sm text-white flex items-center justify-center px-1 py-2'
                onClick={() => setSheetOpen(true)}
            >
                    Create New Group <PlusIcon size={20} />
            </SheetTrigger>
            <SheetContent className=''>
                <SheetHeader>
                <SheetTitle className='text-3xl font-semibold  text-primary'>Create a New Group</SheetTitle>
                <SheetDescription>
                    <form className='flex flex-col items-center justify-center gap-2'>
                        <Input type='text' placeholder='Enter Group Name' className='w-[90%] p-2 rounded-sm mt-10' disabled={loading}/>
                        <div className='flex items-center gap-2 w-full mt-20'>
                            <Button className='w-full' variant='ghost' type='button'
                                onClick={() => setSheetOpen(false)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button className='w-full text-white' variant='default' 
                             onClick={() => createNewGroup('New Group')}
                            >
                                Create Group
                            </Button>
                        </div>
                    </form>
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
            </Sheet>

        </section>
        <section className='w-full h-full md:w-[75%] flex flex-col items-center justify-center p-1 '>
            
            {children}
        </section>
    </section>
  )
}

export default GroupLayout