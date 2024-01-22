// React JS
import React from 'react'

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full dark:bg-neutral-900">{children}</div>
}

export default PublicLayout
