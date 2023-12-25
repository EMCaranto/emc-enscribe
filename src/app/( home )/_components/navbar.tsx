'use client'

// React JS
import React from 'react'

// Components
import Logo from './logo'

import ThemeToggler from '@/components/shared/theme-toggler'

// Hooks
import { useScroll } from '@/hooks/use-scroll'

// Libraries
import { cn } from '@/lib/utils'

const Navbar = () => {
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
        <ThemeToggler />
      </div>
    </div>
  )
}

export default Navbar
