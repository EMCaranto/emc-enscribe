'use client'

// React JS
import React from 'react'

// Next JS
import Image from 'next/image'

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
    </div>
  )
}

export default CoverImage
