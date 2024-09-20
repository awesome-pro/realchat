import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div className='w-screen h-screen flex flex-col text-center  justify-center'>
        
       <h1 className='text-3xl font-serif text-red-500'>
        Sorry, it seems you were looking for a page that doesnt exist.
       </h1>

       <Button variant='ghost' className='mt-10'>
         <Link href='/'>
              Go back home
            </Link> 
        </Button>
    </div>
  )
}

export default NotFound