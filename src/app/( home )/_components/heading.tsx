// React JS
import React from 'react'

// Dependencies
import { ArrowRightIcon } from 'lucide-react'

// Components
import { Button } from '@/components/ui/button'

const Heading = () => {
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
      <Button>
        Get Enscribe
        <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

export default Heading
