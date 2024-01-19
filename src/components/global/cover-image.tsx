'use client'

// React JS
import React from 'react'

// Next JS
import Image from 'next/image'

// Dependencies
import { ImageIcon, XCircleIcon } from 'lucide-react'

// Components
import { Button } from '@/components/ui/button'

// Libraries
import { cn } from '@/lib/utils'

interface CoverImageProps {
  url?: string
  preview?: boolean
}

const CoverImage = ({ url, preview }: CoverImageProps) => {
  return (
    <div
      className={cn(
        'group relative h-[35vh] w-full',
        !url && 'h-[12vh]',
        url && 'bg-muted'
      )}
    >
      {!!url && (
        <Image className="object-cover" src={url} alt="cover image" fill />
      )}
      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <Button
            className="text-xs text-muted-foreground"
            variant={'outline'}
            size={'sm'}
            onClick={() => {}}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Change Cover
          </Button>
          <Button
            className="text-xs text-muted-foreground"
            variant={'outline'}
            size={'sm'}
            onClick={() => {}}
          >
            <XCircleIcon className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

export default CoverImage
