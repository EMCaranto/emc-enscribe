'use client'

// React JS
import React from 'react'

// Next JS
import { redirect } from 'next/navigation'

// Dependencies
import { useConvexAuth } from 'convex/react'

// Components
import Spinner from '@/components/shared/spinner'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size={'lg'} />
      </div>
    )
  }

  if (!isAuthenticated) {
    return redirect('/')
  }

  return <div>{children}</div>
}

export default MainLayout
