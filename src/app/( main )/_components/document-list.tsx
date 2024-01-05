'use client'

// React JS
import React, { useState } from 'react'

// Next JS
import { useParams, useRouter } from 'next/navigation'

// Dependencies
import { FileIcon } from 'lucide-react'
import { useQuery } from 'convex/react'

// Components
import SidebarItem from './sidebar-item'

// Convex
import { Doc, Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'

// Libraries
import { cn } from '@/lib/utils'

interface DocumentListProps {
  parentDocumentId?: Id<'documents'>
  data?: Doc<'documents'>[]
  level?: number
}

const DocumentList = ({ parentDocumentId, level = 0 }: DocumentListProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const params = useParams()
  const router = useRouter()

  const documents = useQuery(api.documents.getSidebarDocument, {
    parentDocument: parentDocumentId,
  })

  const onExpandHandler = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }))
  }

  const onRedirectHandler = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  if (documents === undefined) {
    return (
      <>
        <SidebarItem.Skeleton level={level} />
        {level === 0 && (
          <>
            <SidebarItem.Skeleton level={level} />
            <SidebarItem.Skeleton level={level} />
          </>
        )}
      </>
    )
  }

  return (
    <>
      <p
        className={cn(
          'hidden text-sm font-medium text-muted-foreground/80',
          expanded && 'last:block',
          level === 0 && 'hidden'
        )}
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
      >
        Empty Note
      </p>
      {documents.map((document) => (
        <div key={document._id}>
          <SidebarItem
            id={document._id}
            documentIcon={document.icon}
            icon={FileIcon}
            label={document.title}
            active={params.documentId === document._id}
            expanded={expanded[document._id]}
            level={level}
            onExpand={() => onExpandHandler(document._id)}
            onClick={() => onRedirectHandler(document._id)}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  )
}

export default DocumentList
