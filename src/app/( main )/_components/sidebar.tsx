// React JS
import React, { ElementRef, useRef, useState } from 'react'

// Next JS
import { usePathname } from 'next/navigation'

// Dependencies
import { ChevronLeftIcon, MenuIcon } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'

// Libraries
import { cn } from '@/lib/utils'

const Sidebar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [isCollapsed, setIsCollapsed] = useState(isMobile)
  const [isResetting, setIsResetting] = useState(false)
  const isResizingRef = useRef(false)
  const navbarRef = useRef<ElementRef<'div'>>(null)
  const sidebarRef = useRef<ElementRef<'aside'>>(null)

  const pathname = usePathname()

  const onClickHandler = () => {}

  const onMouseDownHandler = () => {}

  return (
    <>
      <aside
        className={cn(
          'group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-secondary',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'w-0'
        )}
        ref={sidebarRef}
      >
        <div
          className={cn(
            'absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600',
            isMobile && 'opacity-100'
          )}
          role="button"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </div>
        <div>
          <p>Action Item</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div
          className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
          onClick={onClickHandler}
          onMouseDown={onMouseDownHandler}
        >
          {/* Custom Scrollbar Placeholder */}
        </div>
      </aside>
      <div
        className={cn(
          'absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'left-0 w-full'
        )}
        ref={navbarRef}
      >
        <nav className="w-full bg-transparent px-3 py-2">
          {isCollapsed && (
            <MenuIcon className="h-6 w-6 text-muted-foreground" role="button" />
          )}
        </nav>
      </div>
    </>
  )
}

export default Sidebar