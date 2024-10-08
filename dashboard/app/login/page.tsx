"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import axios from 'axios';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';

function AuthPage() {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    
    const handleClick = () => {
      const end = Date.now() + 3 * 1000; // 3 seconds
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
   
      const frame = () => {
        if (Date.now() > end) return;
   
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });
   
        requestAnimationFrame(frame);
      };
   
      frame();
    };

    const createUser = async(username: string) => {
      setLoading(true)
      try {
        const res = await axios.post("http://localhost:8000/users/", {username})
        const data = res.data
        if(!data.id) {
          setError("Username Already Exists")
          toast.error("Username Already Exists")
        }else{
          toast.success("User created")
            handleClick();

            // wait for a second and redirect the user
            setTimeout(() => {
               
            }, 1000)

          router.push(`/features?id=${data.id}&username=${data.username}`)
        }
        
      } catch (error: any) {
        console.log(error.message)
        setError(error.message)
        toast.error(error.message)
      }
      setLoading(false)
    }


  return (
    <section className='w-full h-screen relative bg-primary/10'>
        <div className='flex justify-center items-center'>
            <Card className='lg:mt-60 p-5 lg:min-h-[400px] lg:min-w-[400px] '>
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
            </Card>
        </div>
          {error && <p className='text-red-700 font-semibold text-lg animate-pulse text-center w-full mt-10'>{error}</p>}
    </section>
  )
}

export default AuthPage