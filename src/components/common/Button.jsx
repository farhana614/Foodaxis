import { Loader2 } from 'lucide-react'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  ...props 
}) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    ghost: 'text-gray-600 hover:bg-gray-100 px-4 py-2.5 rounded-lg font-medium transition-all',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all ${
        variant === 'primary' ? 'bg-primary-600 text-white hover:bg-primary-700' :
        variant === 'secondary' ? 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50' :
        variant === 'danger' ? 'bg-red-600 text-white hover:bg-red-700' :
        'text-gray-600 hover:bg-gray-100'
      } ${sizes[size]} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}