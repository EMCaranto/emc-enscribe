'use client'

// React JS
import React from 'react'

// Next JS
import Image from 'next/image'

// Dependencies
import { PlusCircleIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { useUser } from '@clerk/clerk-react'

// Components
import { Button } from '@/components/ui/button'

// Convex
import { api } from '../../../../../convex/_generated/api'

// Public
import imageOne from '../../../../../public/images/empty.png'
import imageDarkOne from '../../../../../public/images/empty-dark.png'

const DocumentsPage = () => {
  const { user } = useUser()
  const create = useMutation(api.documents.create)

  const onCreateHandler = () => {
    const promise = create({ title: 'Untitled' })

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created!',
      error: 'Failed to create a new note.',
    })
  }

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        className="dark:hidden"
        src={imageOne}
        alt="empty"
        height={300}
        width={300}
      />
      <Image
        className="hidden dark:block"
        src={imageDarkOne}
        alt="empty-dark"
        height={300}
        width={300}
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Enscribe
      </h2>
      <Button onClick={onCreateHandler}>
        <PlusCircleIcon className="mr-2 h-4 w-4" />
        Create a note
      </Button>
    </div>
  )
}

export default DocumentsPage
