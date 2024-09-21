import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

type Props = {}

function Navbar({}: Props) {
  return (
    <nav className='w-screen flex items-center justify-between px-1 py-2 fixed top-0 z-50 backdrop-blur-xl bg-primary/10'>
        <Link className='text-hover' href={'/'}>
            <h1 className='text-2xl font-bold'>RealChat</h1>
        </Link>
        <div className='flex items-center justify-center gap-4'>
           <Button variant={'ghost'}>
              Chats
            </Button>
            <Button variant={'ghost'}>
              Groups
            </Button>
        </div>
        <Link href={'/login'}>
          <Button>
            Get Stated
          </Button>
        </Link>
    </nav>
  )
}

export default Navbar