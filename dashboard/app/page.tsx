import Footer from '@/components/footer'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import PerfectSolution from '@/components/perfect-solution'
import Trust from '@/components/trust'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Home() {
  return (
    <section className='w-screen min-h-screen flex items-center flex-col'>
        <Hero />
        <Trust />
        <PerfectSolution />
        <Footer  />
    </section>
  )
}

export default Home