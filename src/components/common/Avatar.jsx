import { User } from 'lucide-react'

export default function Avatar({ src, name, size = 'md', className = '' }) {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  }

  const initials = name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || ''

  const bgColors = [
    'bg-primary-100 text-primary-700',
    'bg-blue-100 text-blue-700',
    'bg-emerald-100 text-emerald-700',
    'bg-violet-100 text-violet-700',
    'bg-amber-100 text-amber-700',
  ]

  // Deterministic color based on name
  const colorIndex = name ? name.charCodeAt(0) % bgColors.length : 0
  const colorClass = bgColors[colorIndex]

  return (
    <div className={`${sizes[size]} ${colorClass} rounded-full flex items-center justify-center font-semibold overflow-hidden flex-shrink-0 ${className}`}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : initials ? (
        <span>{initials}</span>
      ) : (
        <User className="w-1/2 h-1/2" />
      )}
    </div>
  )
}