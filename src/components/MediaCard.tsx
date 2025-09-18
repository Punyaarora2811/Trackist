import { Card, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getMediaTypeIcon, truncateText } from '@/lib/utils'
import { Plus, Star } from 'lucide-react'

interface MediaCardProps {
  media: {
    id: string
    title: string
    type: string
    poster_url?: string
    release_date?: string
    genres?: string[]
    description?: string
    api_id?: string
  }
  onAddToList?: (media: any) => void
  showAddButton?: boolean
}

export function MediaCard({ media, onAddToList, showAddButton = true }: MediaCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02] overflow-hidden">
      <div className="aspect-[2/3] bg-muted relative overflow-hidden">
        {media.poster_url ? (
          <img
            src={media.poster_url}
            alt={media.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {getMediaTypeIcon(media.type)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        {showAddButton && (
          <Button
            size="sm"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={(e) => {
              e.stopPropagation()
              onAddToList?.(media)
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {media.title}
          </h3>
          <Badge variant="secondary" className="ml-2 flex-shrink-0">
            {media.type}
          </Badge>
        </div>

        {media.release_date && (
          <p className="text-sm text-muted-foreground mb-2">
            {new Date(media.release_date).getFullYear()}
          </p>
        )}

        {media.genres && media.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {media.genres.slice(0, 3).map((genre) => (
              <Badge key={genre} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        )}

        {media.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {truncateText(media.description, 120)}
          </p>
        )}
      </CardContent>
    </Card>
  )
}