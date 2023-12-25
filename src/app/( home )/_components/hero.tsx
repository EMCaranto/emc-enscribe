// React JS
import React from 'react'

// Next JS
import Image from 'next/image'

// Public
import imageOne from '../../../../public/images/documents.png'
import imageDarkOne from '../../../../public/images/documents-dark.png'
import imageTwo from '../../../../public/images/reading.png'
import imageDarkTwo from '../../../../public/images/reading-dark.png'

const Hero = () => {
  return (
    <div className="flex max-w-5xl flex-col items-center justify-center">
      <div className="flex items-center">
        <div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
          <Image
            className="object-contain dark:hidden"
            src={imageOne}
            alt="hero-1"
          />
          <Image
            className="hidden object-contain dark:block"
            src={imageDarkOne}
            alt="hero-1-dark"
          />
        </div>
        <div className="relative hidden h-[400px] w-[400px] md:block">
          <Image
            className="object-contain dark:hidden"
            src={imageTwo}
            alt="hero-2"
          />
          <Image
            className="hidden object-contain dark:block"
            src={imageDarkTwo}
            alt="hero-2-dark"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
