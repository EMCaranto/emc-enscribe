// React JS
import React from 'react'

// Next JS
import { useRouter } from 'next/navigation'

// Dependencies
import { MoreHorizontalIcon, Trash2Icon } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'

// Components
import { Button } from '@/components/ui/button'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

// Convex
import { Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'
import { useMutation } from 'convex/react'
import { toast } from 'sonner'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'

interface MenuProps {
  documentId: Id<'documents'>
}

const Menu = ({ documentId }: MenuProps) => {
  const { user } = useUser()

  const router = useRouter()

  const onArchivedDoc = useMutation(api.documents.onArchiveDocument)

  const onArchivedHandler = () => {
    const promise = onArchivedDoc({ id: documentId })

    toast.promise(promise, {
      loading: 'Archiving note...',
      success: 'Note has been archived!',
      error: 'Failed to archive note.',
    })

    router.push('/documents')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'sm'}>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={onArchivedHandler}>
        <DropdownMenuItem>
          <Trash2Icon className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-2 text-xs text-muted-foreground">
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />
}
