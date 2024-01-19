// React JS
import React, { useState } from 'react'

// Next JS
import { useParams } from 'next/navigation'

// Dependencies
import { useMutation } from 'convex/react'

// Components
import { SingleImageDropzone } from '@/components/edgestore/single-image-dropzone'

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'

// Convex
import { Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'

// Hooks
import { useAddCover } from '@/hooks/use-add-cover'

// Libraries
import { useEdgeStore } from '@/lib/edgestore'

export const CoverImageModal = () => {
  const [file, setFile] = useState<File>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { edgestore } = useEdgeStore()

  const params = useParams()

  const addCoverImage = useAddCover()

  const onUpdateDoc = useMutation(api.documents.onUpdateDocument)

  const onCloseHandler = () => {
    setFile(undefined)
    setIsSubmitting(false)
    addCoverImage.onClose()
  }

  const onChangeHandler = async (file?: File) => {
    if (file) {
      setIsSubmitting(true)
      setFile(file)

      const res = await edgestore.publicFiles.upload({
        file,
      })

      await onUpdateDoc({
        id: params.documentId as Id<'documents'>,
        coverImage: res.url,
      })

      onCloseHandler()
    }
  }

  return (
    <Dialog open={addCoverImage.isOpen} onOpenChange={addCoverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          value={file}
          disabled={isSubmitting}
          onChange={onChangeHandler}
        />
      </DialogContent>
    </Dialog>
  )
}
