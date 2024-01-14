// React JS
import React, { ElementRef, useEffect, useRef, useState } from 'react'

// Next JS
import { usePathname } from 'next/navigation'

// Dependencies
import {
  ArchiveIcon,
  ChevronLeftIcon,
  MenuIcon,
  PlusCircleIcon,
  SearchIcon,
  SettingsIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { useMediaQuery } from 'usehooks-ts'
import { useMutation } from 'convex/react'

// Components
import ArchivedBox from './archive-box'
import DocumentList from './document-list'
import SidebarItem from './sidebar-item'
import UserSettings from './user-settings'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

// Convex
import { api } from '../../../../convex/_generated/api'

// Libraries
import { cn } from '@/lib/utils'

const Sidebar = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [isCollapsed, setIsCollapsed] = useState(isMobile)
  const [isResetting, setIsResetting] = useState(false)

  const pathname = usePathname()

  const resizingRef = useRef(false)
  const navbarRef = useRef<ElementRef<'div'>>(null)
  const sidebarRef = useRef<ElementRef<'aside'>>(null)

  const onCreateDoc = useMutation(api.documents.onCreateDocument)

  useEffect(() => {
    if (isMobile) {
      onCollapseHandler()
    } else {
      onResetWidthHandler()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  useEffect(() => {
    if (isMobile) {
      onCollapseHandler()
    }
  }, [pathname, isMobile])

  const onMouseDownHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    resizingRef.current = true
    document.addEventListener('mousemove', onMouseMoveHandler)
    document.addEventListener('mouseup', onMouseUpHandler)
  }

  const onMouseMoveHandler = (event: MouseEvent) => {
    if (!resizingRef.current) return

    let newWidth = event.clientX

    if (newWidth < 240) newWidth = 240
    if (newWidth > 480) newWidth = 480

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty('left', `${newWidth}px`)
      navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`)
    }
  }

  const onMouseUpHandler = () => {
    resizingRef.current = false

    document.removeEventListener('mousemove', onMouseMoveHandler)
    document.removeEventListener('mouseup', onMouseUpHandler)
  }

  const onResetWidthHandler = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)
      setIsResetting(true)

      sidebarRef.current.style.width = isMobile ? '100%' : '240px'
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : 'calc(100% - 240px)'
      )
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px')

      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const onCollapseHandler = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true)
      setIsResetting(true)

      sidebarRef.current.style.width = '0'
      navbarRef.current.style.setProperty('width', '100%')
      navbarRef.current.style.setProperty('left', '0')

      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const onCreateHandler = () => {
    const promise = onCreateDoc({ title: 'Untitled' })

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created!',
      error: 'Failed to create a new note.',
    })
  }

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
          onClick={onCollapseHandler}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </div>
        <div>
          <UserSettings />
          <SidebarItem
            icon={SearchIcon}
            label="Search"
            isSearch
            onClick={() => {}}
          />
          <SidebarItem
            icon={SettingsIcon}
            label="Settings"
            onClick={() => {}}
          />
          <SidebarItem
            icon={PlusCircleIcon}
            label="Create a note"
            onClick={onCreateHandler}
          />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Popover>
            <PopoverTrigger className="mt-4 w-full">
              <SidebarItem icon={ArchiveIcon} label="Archive" />
            </PopoverTrigger>
            <PopoverContent
              className="w-72 p-0"
              side={isMobile ? 'bottom' : 'right'}
            >
              <ArchivedBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
          onClick={onResetWidthHandler}
          onMouseDown={onMouseDownHandler}
        >
          {/* Placeholder */}
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
            <MenuIcon
              className="h-6 w-6 text-muted-foreground"
              role="button"
              onClick={onResetWidthHandler}
            />
          )}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
