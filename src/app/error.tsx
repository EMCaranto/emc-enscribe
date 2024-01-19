// React JS
import React from 'react'

// Next JS
import Image from 'next/image'
import Link from 'next/link'

// Components
import { Button } from '@/components/ui/button'

// Public
import errorImage from '../../public/images/error.png'
import errorDarkImage from '../../public/images/error-dark.png'

const ErrorPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        className="dark:hidden"
        src={errorImage}
        alt="error"
        height={300}
        width={300}
      />
      <Image
        className="hidden dark:block"
        src={errorDarkImage}
        alt="error-dark"
        height={300}
        width={300}
      />
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <Button asChild>
        <Link href={'/documents'}>Go Back</Link>
      </Button>
    </div>
  )
}

export default ErrorPage
