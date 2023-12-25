// React JS
import React from 'react'

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-slate-900">
      <main className="h-full pt-40">{children}</main>
    </div>
  )
}

export default HomePageLayout
