// React JS
import React from 'react'

// Components
import Navbar from './_components/navbar'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full pt-40 dark:bg-neutral-900">
      <Navbar />
      {children}
    </main>
  )
}

export default HomeLayout
