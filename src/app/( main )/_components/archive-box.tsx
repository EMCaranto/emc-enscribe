'use client'

// React JS
import React, { useState } from 'react'

// Next JS
import { useParams, useRouter } from 'next/navigation'

// Dependencies
import { SearchIcon, Trash2Icon, Undo2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQuery } from 'convex/react'

// Components
import Spinner from '@/components/shared/spinner'
import { ConfirmModal } from '@/components/shared/modal/confirm-modal'

import { Input } from '@/components/ui/input'

// Convex
import { Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'

const ArchivedBox = () => {
  const [search, setSearch] = useState('')

  const params = useParams()
  const router = useRouter()

  const getArchivedDoc = useQuery(api.documents.getArchivedDocument)
  const onDeleteDoc = useMutation(api.documents.onDeleteDocument)
  const onRestoreDoc = useMutation(api.documents.onRestoreDocument)

  const filteredDoc = getArchivedDoc?.filter((archiveDoc) => {
    return archiveDoc.title.toLowerCase().includes(search.toLowerCase())
  })

  const onClickHandler = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  const onRestoreHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<'documents'>
  ) => {
    event.stopPropagation()

    const promise = onRestoreDoc({ id: documentId })

    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored!',
      error: 'Failed to restored note.',
    })
  }

  const onDeleteHandler = (documentId: Id<'documents'>) => {
    const promise = onDeleteDoc({ id: documentId })

    toast.promise(promise, {
      loading: 'Deleting note...',
      success: 'Note deleted!',
      error: 'Failed to delete note.',
    })

    if (params.documentId === documentId) {
      router.push('/documents')
    }
  }

  if (getArchivedDoc === undefined) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Spinner size={'lg'} />
      </div>
    )
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <SearchIcon className="h-4 w-4" />
        <Input
          className="h-7 bg-secondary px-2 focus-visible:ring-transparent"
          placeholder="Filter by title..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="mt-2 p-1">
        <p className="hidden pb-2 text-center text-xs text-muted-foreground last:block">
          No document found
        </p>
        {filteredDoc?.map((document) => (
          <div
            className="flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5"
            role="button"
            key={document._id}
            onClick={() => onClickHandler(document._id)}
          >
            <span className='flex'>{document.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArchivedBox
