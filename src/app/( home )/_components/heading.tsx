'use client'

// React JS
import React from 'react'

// Next JS
import Link from 'next/link'

// Dependencies
import { ArrowRightIcon } from 'lucide-react'
import { SignInButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'

// Components
import Spinner from '@/components/shared/spinner'

import { Button } from '@/components/ui/button'

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        <span>
          Your Ideas, Documents, & Plans. Unified. Welcome to{' '}
          <span className="underline">Enscribe</span>
        </span>
      </h1>
      <h3 className="text-base font-medium sm:text-xl md:text-2xl">
        Enscribe is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className="flex w-full items-center justify-center">
          <Spinner size={'lg'} />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href={'/documents'}>
            Enter Enscribe
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Enscribe
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </SignInButton>
      )}
    </div>
  )
}

export default Heading
