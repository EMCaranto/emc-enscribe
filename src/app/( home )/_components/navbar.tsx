'use client'

// React JS
import React from 'react'

// Next JS
import Link from 'next/link'

// Dependencies
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'

// Components
import Logo from './logo'

import Spinner from '@/components/global/spinner'
import ThemeToggler from '@/components/global/theme-toggler'

import { Button } from '@/components/ui/button'

// Hooks
import { useScroll } from '@/hooks/use-scroll'

// Libraries
import { cn } from '@/lib/utils'

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  const scrolled = useScroll()

  return (
    <div
      className={cn(
        'fixed top-0 z-50 flex w-full items-center bg-background px-6 py-4',
        scrolled && 'shadow'
      )}
    >
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant={'ghost'} size={'sm'}>
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={'sm'}>Join Enscribe</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant={'ghost'} size={'sm'} asChild>
              <Link href={'/documents'}>Enter Enscribe</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ThemeToggler />
      </div>
    </div>
  )
}

export default Navbar
