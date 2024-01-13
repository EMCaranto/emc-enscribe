'use client'

// React JS
import React from 'react'

// Next JS
import { useParams, useRouter } from 'next/navigation'

// Dependencies
import { SearchIcon, Trash2Icon, Undo2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQuery } from 'convex/react'

// Components
import Spinner from '@/components/shared/spinner'
import { ConfirmModal } from '@/components/shared/modal/confirm-modal'

import { Input } from '@/components/ui/input'

// Convex
import { Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'

const ArchivedBox = () => {
  return <div>ArchivedBox</div>
}

export default ArchivedBox
