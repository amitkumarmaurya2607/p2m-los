import toast, { type ToastPosition, type ToastOptions } from 'react-hot-toast'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading' | 'custom'

export interface ToastConfig {
  message: string
  type?: ToastType
  position?: ToastPosition
  duration?: number
  id?: string
  icon?: string
  style?: React.CSSProperties
  className?: string
  onClose?: () => void
}

const defaultOptions: ToastOptions = {
  duration: 3000,
  position: 'top-right',
}

const typeStyles: Record<ToastType, { icon?: string; style?: React.CSSProperties }> = {
  success: {
    icon: '✅',
    style: {
      border: '1px solid #16a34a',
      background: '#f0fdf4',
      color: '#166534',
    },
  },
  error: {
    icon: '❌',
    style: {
      border: '1px solid #dc2626',
      background: '#fef2f2',
      color: '#991b1b',
    },
  },
  warning: {
    icon: '⚠️',
    style: {
      border: '1px solid #ca8a04',
      background: '#fefce8',
      color: '#854d0e',
    },
  },
  info: {
    icon: 'ℹ️',
    style: {
      border: '1px solid #2563eb',
      background: '#eff6ff',
      color: '#1e40af',
    },
  },
  loading: {
    style: {
      border: '1px solid #6b7280',
      background: '#f9fafb',
      color: '#374151',
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
