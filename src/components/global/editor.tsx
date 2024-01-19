'use client'

// React JS
import React from 'react'

// Dependencies
import { BlockNoteEditor, PartialBlock } from '@blocknote/core'
import { BlockNoteView, useBlockNote } from '@blocknote/react'
import { useTheme } from 'next-themes'

// Libraries
import { useEdgeStore } from '@/lib/edgestore'

// Styles
import '@blocknote/core/style.css'

interface EditorProps {
  editable?: boolean
  initialContent?: string
  onChange: (value: string) => void
}

const Editor = ({ editable, initialContent, onChange }: EditorProps) => {
  const { edgestore } = useEdgeStore()
  const { resolvedTheme } = useTheme()

  const onUploadHandler = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file,
    })

    return res.url
  }

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
    },
    uploadFile: onUploadHandler,
  })

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  )
}

export default Editor
