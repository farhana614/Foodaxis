import { format } from 'date-fns'

export const formatCurrency = (amount, currency = 'BDT') => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export const formatDate = (date, pattern = 'MMM dd, yyyy') => {
  return format(new Date(date), pattern)
}

export const formatDateTime = (date) => {
  return format(new Date(date), 'MMM dd, yyyy hh:mm a')
}

export const formatRelativeTime = (date) => {
  const now = new Date()
  const diff = Math.floor((now - new Date(date)) / 1000 / 60)
  if (diff < 1) return 'Just now'
  if (diff < 60) return `${diff} min ago`
  if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`
  return `${Math.floor(diff / 1440)} days ago`
}