// React JS
import React from 'react'

// Dependencies
import { type VariantProps, cva } from 'class-variance-authority'

import { Loader2Icon } from 'lucide-react'

// Libraries
import { cn } from '@/lib/utils'

const spinnerVariants = cva('text-muted-foreground animate-spin', {
  variants: {
    size: {
      default: 'h-4 w-4',
      sm: 'h-2 w-2',
      lg: 'h-6 w-6',
      icon: 'h-10 w-10',
    },
    defaultVariants: {
      size: 'default',
    },
  },
})

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

const Spinner = ({ size }: SpinnerProps) => {
  return <Loader2Icon className={cn(spinnerVariants({ size }))} />
}

export default Spinner
