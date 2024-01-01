// React JS
import React, { ElementRef, useRef, useState } from 'react'

// Dependencies
import { ChevronLeftIcon } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const isResizingRef = useRef(false)
  const navbarRef = useRef<ElementRef<'div'>>(null)
  const sidebarRef = useRef<ElementRef<'aside'>>(null)

  return (
    <>
      <aside className="group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-secondary">
        <div className="absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600">
          <ChevronLeftIcon className="h-6 w-6" />
        </div>
        <div>
          <p>Action Item</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100">
          {/* Placeholder */}
        </div>
      </aside>
    </>
  )
}

export default Sidebar
