// React JS
import React from 'react'

// Next JS
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// Global Styles
import '@/styles/globals.css'

// Providers
import { ConvexClientProvider } from '@/providers/convex-provider'
import { ThemeProvider } from '@/providers/theme-provider'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Enscribe : Notion Clone',
  description: 'A notion clone created with Next JS',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/svgs/logo.svg',
        href: '/svgs/logo.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/svgs/logo-dark.svg',
        href: '/svgs/logo-dark.svg',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ConvexClientProvider>
          <ThemeProvider
            defaultTheme="system"
            attribute="class"
            enableSystem
            disableTransitionOnChange
            storageKey="enscribe-theme"
          >
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
