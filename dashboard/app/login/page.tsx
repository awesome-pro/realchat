"use client";

import { Button } from '@/components/ui/button';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';

function AuthPage() {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    
    const createUser = async(username: string) => {
      setLoading(true)
      try {
        const res = await axios.post("http://localhost:8000/users/", {username})
        const data = res.data
        toast.success("User created")
        router.push(`http://localhost:3000/${data.id}`)
      } catch (error: any) {
        console.log(error.message)
        setError(error.message)
        toast.error(error.message)
      }
      setLoading(false)
    }


  return (
    <section className='w-full h-full relative'>
        <div className='flex justify-center items-center'>
            <div className='w-96 lg:mt-60'>
            <h1 className='text-3xl font-bold mb-6'>Login to<strong className='ml-4 font-semibold text-primary/80'>ChatApp</strong>
            </h1>
            <form className='space-y-4 ' onSubmit={async (values) => {
                values.preventDefault()
                const username = values.currentTarget.username.value
                await createUser(username)

            }}>
                <div className='space-y-1'>
                <label htmlFor='username' className='block'>Username</label>
                <input disabled={loading} type='text' id='username' className='w-full border border-gray-300 rounded px-3 py-2' />
                </div>
                <Button size={'lg'} disabled={loading} type='submit' className='bg-blue-500 text-white rounded px-3 py-2 w-28'>Login</Button>
            </form>
            </div>
        </div>
          {error && <p className='text-red-700 font-semibold text-2xl animate-pulse'>{error}</p>}
    </section>
  )
}

export default AuthPage