// React JS
import React, { useState } from 'react'

// Next JS
import { useParams } from 'next/navigation'

// Dependencies
import { useMutation } from 'convex/react'

// Components
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'

// Hooks
import { useAddCover } from '@/hooks/use-add-cover'

export const CoverImageModal = () => {
  const addCoverImage = useAddCover()

  return (
    <Dialog open={addCoverImage.isOpen} onOpenChange={addCoverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <div>Upload Image</div>
      </DialogContent>
    </Dialog>
  )
}
