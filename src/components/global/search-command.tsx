'use client'

// React JS
import React, { useEffect, useState } from 'react'

// Next JS
import { useRouter } from 'next/navigation'

// Dependencies
import { useQuery } from 'convex/react'
import { useUser } from '@clerk/clerk-react'
import { FileIcon } from 'lucide-react'

// Components
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

// Convex
import { api } from '../../../convex/_generated/api'

// Hooks
import { useSearch } from '@/hooks/use-search'

const SearchCommand = () => {
  const [isMounted, setIsMounted] = useState(false)

  const { user } = useUser()

  const router = useRouter()

  const getSearchDoc = useQuery(api.documents.getSearchDocument)

  const isOpen = useSearch((store) => store.isOpen)
  const onClose = useSearch((store) => store.onClose)
  const toggle = useSearch((store) => store.toggle)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'K' || ('k' && (event.metaKey || event.ctrlKey))) {
        event.preventDefault()
        toggle()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [toggle])

  if (!isMounted) {
    return null
  }

  const onSelectHandler = (id: string) => {
    router.push(`/documents/${id}`)
    onClose()
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s Enscribe`} />
      <CommandList>
        <CommandEmpty>
          <span>No result found.</span>
        </CommandEmpty>
        <CommandGroup heading="Documents">
          {getSearchDoc?.map((document) => (
            <CommandItem
              key={document._id}
              title={document.title}
              value={document.title}
              onSelect={onSelectHandler}
            >
              {document.icon ? (
                <span className="mr-2 text-lg">{document.icon}</span>
              ) : (
                <FileIcon className="mr-2 h-4 w-4" />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export default SearchCommand
