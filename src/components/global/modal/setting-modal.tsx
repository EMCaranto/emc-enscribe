'use client'

// React JS
import React from 'react'

// Components
import ThemeToggler from '@/components/global/theme-toggler'

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

// Hooks
import { useSettings } from '@/hooks/use-settings'

export const SettingModal = () => {
  const settings = useSettings()

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <Label>Appearance</Label>
            <span className="text-sm text-muted-foreground">
              Customize how Enscribe looks on your device
            </span>
          </div>
          <ThemeToggler />
        </div>
      </DialogContent>
    </Dialog>
  )
}
