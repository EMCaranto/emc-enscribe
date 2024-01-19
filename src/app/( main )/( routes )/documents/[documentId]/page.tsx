'use client'

// React JS
import React from 'react'

// Dependencies
import { useQuery } from 'convex/react'

// Components
import CoverImage from '@/components/global/cover-image'
import Toolbar from '@/components/global/toolbar'

// Convex
import { Id } from '../../../../../../convex/_generated/dataModel'
import { api } from '../../../../../../convex/_generated/api'

interface DocumentIdPageProps {
  params: {
    documentId: Id<'documents'>
  }
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const getDocId = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId,
  })

  if (getDocId === null) {
    return <div>Not found</div>
  }

  if (getDocId === undefined) {
    return <div>Loading...</div>
  }

  return (
    <div className="pb-40">
      <CoverImage url={getDocId.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={getDocId} />
      </div>
    </div>
  )
}

export default DocumentIdPage
