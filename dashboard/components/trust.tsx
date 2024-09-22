"use client"

import React from 'react'
import AvatarCircles from './magicui/avatar-circles';
import { section } from 'framer-motion/client';
import { TrustCards } from './trust-cards';



function Trust() {
  return (
    <section className='w-full min-h-[200px]'>
        <TrustCards />
    </section>
  )
}

export default Trust