import React from 'react'
import toast, { type ToastPosition, type ToastOptions, type Renderable } from 'react-hot-toast'
import { CheckCircle2, XCircle, AlertTriangle, Info, Loader2 } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading' | 'custom'

export interface ToastConfig {
  message: string
  type?: ToastType
  position?: ToastPosition
  duration?: number
  id?: string
  icon?: Renderable
  style?: React.CSSProperties
  className?: string
  onClose?: () => void
}

const defaultOptions: ToastOptions = {
  duration: 3000,
  position: 'top-right',
}

const typeStyles: Record<ToastType, { icon?: Renderable; style?: React.CSSProperties }> = {
  success: {
    icon: React.createElement(CheckCircle2, { className: 'w-5 h-5 text-success' }),
    style: {
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      color: 'var(--text-heading)',
    },
  },
  error: {
    icon: React.createElement(XCircle, { className: 'w-5 h-5 text-destructive' }),
    style: {
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      color: 'var(--text-heading)',
    },
  },
  warning: {
    icon: React.createElement(AlertTriangle, { className: 'w-5 h-5 text-warning' }),
    style: {
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      color: 'var(--text-heading)',
    },
  },
  info: {
    icon: React.createElement(Info, { className: 'w-5 h-5 text-primary' }),
    style: {
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      color: 'var(--text-heading)',
    },
  },
  loading: {
    icon: React.createElement(Loader2, { className: 'w-5 h-5 text-primary animate-spin' }),
    style: {
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      color: 'var(--text-heading)',
    },
  },
  custom: {},
}

export function showToast({
  message,
  type = 'info',
  position,
  duration,
  id,
  icon,
  style,
  className,
  onClose,
}: ToastConfig): string {
  const config = typeStyles[type]
  
  const options: ToastOptions = {
    ...defaultOptions,
    position: position ?? defaultOptions.position,
    duration: type === 'loading' ? undefined : (duration ?? defaultOptions.duration),
    id,
    icon: icon ?? config.icon,
    style: { ...config.style, ...style },
    className,
  }

  if (onClose) {
    // @ts-expect-error: react-hot-toast's ToastOptions doesn't officially support onDismiss, 
    // but we inject it here in case a custom wrapper or higher-level hook consumes it.
    options.onDismiss = onClose
  }

  let toastId: string

  switch (type) {
    case 'success':
      toastId = toast.success(message, options)
      break
    case 'error':
      toastId = toast.error(message, options)
      break
    case 'warning':
      toastId = toast(message, options)
      break
    case 'loading':
      toastId = toast.loading(message, options)
      break
    case 'custom':
      toastId = toast(message, options)
      break
    default:
      toastId = toast(message, options)
  }

  return toastId
}

export function dismissToast(toastId?: string): void {
  toast.dismiss(toastId)
}

export function updateToast(
  toastId: string,
  config: Omit<ToastConfig, 'message'> & { message: string }
): void {
  const updatedConfig = {
    ...config,
    render: config.message,
  }
  toast.success(config.message, { id: toastId, ...config })
}
