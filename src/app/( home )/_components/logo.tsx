// React JS
import React from 'react'

// Next JS
import Image from 'next/image'

import { Poppins } from 'next/font/google'

// Libraries
import { cn } from '@/lib/utils'

// Public
import appLogo from '../../../../public/svgs/logo.svg'
import appDarkLogo from '../../../../public/svgs/logo-dark.svg'

const logoFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
})

const Logo = () => {
  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <Image
        className="dark:hidden"
        src={appLogo}
        alt="logo"
        height={40}
        width={40}
      />
      <Image
        className="hidden dark:block"
        src={appDarkLogo}
        alt="logo"
        height={40}
        width={40}
      />
      <p className={cn('font-semibold', logoFont.className)}>Enscribe</p>
    </div>
  )
}

export default Logo
