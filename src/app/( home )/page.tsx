// React JS
import React from 'react'

// Components
import Footer from './_components/footer'
import Heading from './_components/heading'
import Hero from './_components/hero'

const HomePage = () => {
  return (
    <div className="flex min-h-full flex-col px-4 dark:bg-neutral-900">
      <div className="flex flex-1 flex-col items-center justify-center gap-y-8 pb-10 text-center md:justify-start">
        <Heading />
        <Hero />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
