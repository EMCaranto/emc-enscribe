'use client'

// React JS
import { useEffect, useState } from 'react'

// Components
import { CoverImageModal } from '@/components/global/modal/cover-image-modal'
import { SettingModal } from '@/components/global/modal/setting-modal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <SettingModal />
      <CoverImageModal />
    </>
  )
}
