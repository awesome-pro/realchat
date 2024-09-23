import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'


const footerLinks = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Contact Us",
    href: "/contact"
  },
  {
    label: "Privacy Policy",
    href: "/privacypolicy"
  },
  {
    label: "Terms of Service",
    href: "/tnc"
  },
  {
    label: "Admin",
    href: "/admin"
  }
]
function Footer() {
  return (
    <footer className="text-gray-800 bg-primary/5 py-4 w-full mt-20 ">
      <div className='flex flex-col lg:flex-row items-center justify-center lg:gap-10 bg-white/20 p'>
          {footerLinks.map((link, index) => (
            <Link key={index} href={
              link.href
            }>
              <Button variant='link' className='text-gray-800 hover:text-blue-600'>
                {link.label}
              </Button>
            </Link>
          ))}
      </div>
          <Separator className='w-full'/>
      <div className="flex items-baseline justify-center gap-5 py-5">
        <Image src="/logo.png" alt="logo" width={80} height={20} />
          <p className='text-xl font-serif m-0 -ml-2'>
            Inc.
          </p>
        <p>&copy; 2024 All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer