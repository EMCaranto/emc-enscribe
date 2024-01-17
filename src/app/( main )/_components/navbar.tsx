'use client'

// React JS
import React from 'react'

// Next JS
import { useParams } from 'next/navigation'

// Dependencies
import { MenuIcon } from 'lucide-react'
import { useQuery } from 'convex/react'

// Components
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
    return <p>Loading</p>
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
        </div>
      </nav>
    </>
  )
}

export default Navbar
