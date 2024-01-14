'use client'

// React JS
import React, { useEffect, useState } from 'react'

// Next JS
import { useRouter } from 'next/navigation'

// Dependencies
import { FileIcon } from 'lucide-react'
import { useQuery } from 'convex/react'
import { useUser } from '@clerk/clerk-react'

// Convex
import { api } from '../../../convex/_generated/api'

// Components
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

// Hooks
import { useSearch } from '@/hooks/use-search'

const SearchCommand = () => {
  return <div>SearchCommand</div>
}

export default SearchCommand
