// React JS
import React from 'react'

// Next JS
import { useRouter } from 'next/navigation'

// Dependencies
import { toast } from 'sonner'
import { useMutation } from 'convex/react'

// Components
import { ConfirmModal } from '@/components/global/modal/confirm-modal'

import { Button } from '@/components/ui/button'

// Convex
import { Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'

interface ArchiveBannerProps {
  documentId: Id<'documents'>
}

const ArchiveBanner = ({ documentId }: ArchiveBannerProps) => {
  const router = useRouter()

  const onDeleteDoc = useMutation(api.documents.onDeleteDocument)
  const onRestoreDoc = useMutation(api.documents.onRestoreDocument)

  const onDeleteHandler = () => {
    const promise = onDeleteDoc({ id: documentId })

    toast.promise(promise, {
      loading: 'Deleting note...',
      success: 'Note deleted!',
      error: 'Failed to delete note.',
    })

    router.push('/documents')
  }

  const onRestoreHandler = () => {
    const promise = onRestoreDoc({ id: documentId })

    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored!',
      error: 'Failed to restored note.',
    })
  }

  return (
    <div className="flex w-full items-center justify-center gap-x-2 bg-red-500 p-2 text-center text-sm text-white">
      <p>This document is archived.</p>
      <Button
        className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
        variant={'outline'}
        size={'sm'}
        onClick={onRestoreHandler}
      >
        Restore
      </Button>
      <ConfirmModal onConfirm={onDeleteHandler}>
        <Button
          className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
          variant={'outline'}
          size={'sm'}
        >
          Delete
        </Button>
      </ConfirmModal>
    </div>
  )
}

export default ArchiveBanner
