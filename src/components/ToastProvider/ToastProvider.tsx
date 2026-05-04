// components/ui/ToastProvider.tsx
'use client'
import { Toaster } from 'react-hot-toast'

function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        className:
          'rounded-xl shadow-lg border border-gray-200 text-sm px-4 py-3',
        style: {
          background: '#ffffff',
          color: '#0f172a',
        },
        success: {
          iconTheme: {
            primary: '#16a34a',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#dc2626',
            secondary: '#fff',
          },
        },
      }}
    />
  )
}

export default ToastProvider