export default function Card({ children, className = '', padding = 'normal', shadow = true }) {
  const paddings = {
    none: '',
    small: 'p-3',
    normal: 'p-5',
    large: 'p-8',
  }

  return (
    <div className={`bg-white rounded-xl border border-gray-100 ${shadow ? 'shadow-card' : ''} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  )
}