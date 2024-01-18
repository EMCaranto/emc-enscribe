'use client'

// React JS
import React from 'react'
import { Doc } from '../../../convex/_generated/dataModel'

// Dependencies
import { ImagePlusIcon, SmilePlusIcon, XCircleIcon } from 'lucide-react'

// Components
import IconPicker from './icon-picker'

import { Button } from '@/components/ui/button'

interface ToolbarProps {
  initialData: Doc<'documents'>
  preview?: boolean
}

const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  return (
    <div className="group relative pl-14">
      {!!initialData.icon && !preview && (
        <div className="group/icon flex items-center gap-x-2 pt-6">
          <IconPicker onChange={() => {}}>
            <p className="text-6xl transition hover:opacity-75">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            className=" rounded-full text-xs text-muted-foreground opacity-0 transition group-hover/icon:opacity-100"
            variant={'outline'}
            size={'icon'}
            onClick={() => {}}
          >
            <XCircleIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="pt-6 text-6xl">{initialData.icon}</p>
      )}
      <div className="flex items-center gap-x-1 py-4 opacity-0 group-hover:opacity-100">
        {!initialData.icon && !preview && (
          <IconPicker onChange={() => {}} asChild>
            <Button
              className="text-xs text-muted-foreground"
              variant={'outline'}
              size={'sm'}
            >
              <SmilePlusIcon className="mr-2 h-4 w-4" />
              Add Icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            className="text-xs text-muted-foreground"
            variant={'outline'}
            size={'sm'}
            onClick={() => {}}
          >
            <ImagePlusIcon className="mr-2 h-4 w-4" />
            Add Cover Image
          </Button>
        )}
      </div>
    </div>
  )
}

export default Toolbar
