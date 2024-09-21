"use client";

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';

function LoginLayout(
    { children }: { children: React.ReactNode }
) {

    const router = useRouter();

  const [users, setUsers] = useState<{ id: number; username: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async() => {
    setLoading(true)  
     try {
      const res = await axios.get("http://localhost:8000/users")
      setUsers(res.data)
     } catch (error: any) {
      console.log(error.message )
      setError(error.message)
     }finally {
          setLoading(false)
      }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])
  return (
    <section className='w-screen max-h-screen flex flex-col lg:flex-row'>
        <section className='w-[50%] h-full'>
            {children}
        </section>
        <section className='w-[50%] h-full bg-primary/90 text-white'>
            <p className='text-center'>OR</p>
            <h1 className='text-4xl font-bold text-center my-10'>Continue as Registered User</h1>
            
            <nav className='w-[90%] h-full flex flex-col items-center mt-7 overflow-y-scroll'>
                {
                    loading
                    ? (
                        <div className='grid grid-cols-2 gap-5'>
                            <Skeleton className='w-24 h-24' />
                            <Skeleton className='w-24 h-24' />
                            <Skeleton className='w-24 h-24' />
                            <Skeleton className='w-24 h-24' />
                            <Skeleton className='w-24 h-24' />
                        </div>
                    ) : (
                        users.map((user) => (
                            <Button variant={'outline'} key={user.id} className='p-3 h-16  text-primary w-[50%] m-2 cursor-pointer z-20' onClick={() => {
                                toast.success(`Signed in as ${user.username}`)
                                router.push(`http://localhost:3000/features?id=${user.id}&username=${user.username}`)
                            }}>
                                {user.username}
                            </Button>
                        ))
                    )
                }
            </nav>
        </section>
    </section>
  )
}

export default LoginLayout