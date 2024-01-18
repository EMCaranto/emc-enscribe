'use client'

// React JS
import React from 'react'

// Next JS
import { useParams } from 'next/navigation'

// Dependencies
import { MenuIcon } from 'lucide-react'
import { useQuery } from 'convex/react'

// Components
import ArchiveBanner from './archive-banner'
import Menu from './menu'
import Title from './title'

// Convex
import { Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'

interface NavbarProps {
  isCollapsed: boolean
  onResetWidth: () => void
}

const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams()

  const getDocId = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId as Id<'documents'>,
  })

  if (getDocId === null) {
    return null
  }

  if (getDocId === undefined) {
    return (
      <nav className="items- flex w-full bg-background px-3 py-2 dark:bg-neutral-900">
        <Title.Skeleton />
      </nav>
    )
  }

  return (
    <>
      <nav className="flex w-full items-center gap-x-4 bg-background px-3 py-2 dark:bg-neutral-900">
        {isCollapsed && (
          <MenuIcon
            className="h-6 w-6 text-muted-foreground"
            role="button"
            onClick={onResetWidth}
          />
        )}
        <div className="flex w-full items-center justify-between">
          <Title initialData={getDocId} />
          <div className="flex items-center gap-x-2">
            <Menu documentId={getDocId._id} />
          </div>
        </div>
      </nav>
      {getDocId.isArchived && (
        <>
          <ArchiveBanner documentId={getDocId._id} />
        </>
      )}
    </>
  )
}

export default Navbar
