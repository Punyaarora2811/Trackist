import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function getMediaTypeIcon(type: string) {
  switch (type) {
    case 'movie':
      return '🎬'
    case 'tv':
      return '📺'
    case 'book':
      return '📚'
    case 'game':
      return '🎮'
    default:
      return '📱'
  }
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'plan_to_watch':
      return 'bg-blue-100 text-blue-800'
    case 'watching':
      return 'bg-yellow-100 text-yellow-800'
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'dropped':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}