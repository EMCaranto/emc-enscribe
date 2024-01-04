'use client'

// React JS
import React from 'react'

// Dependencies
import { LucideIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react'

// Convex
import { Id } from '../../../../convex/_generated/dataModel'

// Libraries
import { cn } from '@/lib/utils'

interface SidebarItemProps {
  id?: Id<'documents'>
  documentIcon?: string
  icon: LucideIcon
  label: string
  active?: boolean
  expanded?: boolean
  level?: number
  isSearch?: boolean
  onExpand?: () => void
  onClick: () => void
}

const SidebarItem = ({
  id,
  documentIcon,
  icon: Icon,
  label,
  active,
  expanded,
  level = 0,
  isSearch,
  onExpand,
  onClick,
}: SidebarItemProps) => {
  const ChevronIcon = expanded ? ChevronDownIcon : ChevronRightIcon

  return (
    <div
      className={cn(
        'group flex min-h-10 w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5',
        active && 'bg-primary/5 text-primary'
      )}
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : '12px',
      }}
      role="button"
      onClick={onClick}
    >
      {!!id && (
        <div
          className="mr-1 h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600"
          role="button"
          onClick={() => {}}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="mr-2 shrink-0 text-lg">{documentIcon}</div>
      ) : (
        <Icon className="mr-2 h-4 shrink-0 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
          <span className="text-xs">CTRL + K</span>
        </kbd>
      )}
    </div>
  )
}

export default SidebarItem
