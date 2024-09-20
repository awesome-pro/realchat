"use client";

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';

function OlderUser() {
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
    <section className='w-screen min-h-screen'>
      <div className='bottom-2'>
            <h1 className='text-3xl font-bold mb-6'>Our present Users</h1>
            <ul className='flex flex-col'>
                {
                  loading
                  ? (
                    <div className='grid grid-col-2 gap-5'>
                      <Skeleton className='w-24 h-24' />
                      <Skeleton className='w-24 h-24' />
                      <Skeleton className='w-24 h-24' />
                      <Skeleton className='w-24 h-24' />
                      <Skeleton className='w-24 h-24' />
                      <Skeleton className='w-24 h-24' />
                    </div>
                  )
                  : (
                    users.map((user) => (  
                      <Button key={user.id} className='p-3 text-white bg-blue-600 max-w-[200px] m-2 cursor-pointer rounded-lg z-20' onClick={() => {
                        toast.success(`Signed in as ${user.username}`)
                        router.push(`http://localhost:3000/${user.id}`)
                      }}>
                        {user.username}
                      </Button>
                ))
                  )
                }
            </ul>
        </div>

        {error && <p className='text-red-600 font-bold animate-bounce text-3xl'>{error}</p>}
    </section>
  )
}

export default OlderUser