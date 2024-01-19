'use client'

// React JS
import React, { useMemo } from 'react'

// Next JS
import dynamic from 'next/dynamic'

// Dependencies
import { useMutation, useQuery } from 'convex/react'

// Components
import CoverImage from '@/components/global/cover-image'
import Toolbar from '@/components/global/toolbar'

import { Skeleton } from '@/components/ui/skeleton'

// Convex
import { Id } from '../../../../../../convex/_generated/dataModel'
import { api } from '../../../../../../convex/_generated/api'

interface DocumentIdPageProps {
  params: {
    documentId: Id<'documents'>
  }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(
    () =>
      dynamic(() => import('@/components/global/editor'), {
        ssr: false,
      }),
    []
  )

  const getDocId = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId,
  })

  const onUpdateDoc = useMutation(api.documents.onUpdateDocument)

  const onChangeHandler = (content: string) => {
    onUpdateDoc({
      id: params.documentId,
      content,
    })
  }

  if (getDocId === null) {
    return <div>Not found</div>
  }

  if (getDocId === undefined) {
    return (
      <div>
        <CoverImage.Skeleton />
        <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-1/2" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-40">
      <CoverImage url={getDocId.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={getDocId} />
        <Editor initialContent={getDocId.content} onChange={onChangeHandler} />
      </div>
    </div>
  )
}

export default DocumentIdPage
