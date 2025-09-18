import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { MediaCard } from '@/components/MediaCard'
import { useMediaSearch, useAddToList } from '@/hooks/useMedia'
import { useAuth } from '@/contexts/AuthContext'
import { Search as SearchIcon, Filter } from 'lucide-react'

export function Search() {
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const { userProfile } = useAuth()

  const { data: searchResults, isLoading } = useMediaSearch(query, selectedType)
  const addToListMutation = useAddToList()

  const handleAddToList = (media: any) => {
    if (userProfile?.id) {
      addToListMutation.mutate({
        userId: userProfile.id,
        mediaItem: media,
        status: 'plan_to_watch'
      })
    }
  }

  const mediaTypes = [
    { id: 'all', label: 'All Media' },
    { id: 'movie', label: 'Movies' },
    { id: 'tv', label: 'TV Shows' },
    { id: 'book', label: 'Books' },
    { id: 'game', label: 'Games' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Search Media</h1>
        <p className="text-muted-foreground mt-1">
          Discover movies, TV shows, books, and games to add to your lists
        </p>
      </div>

      {/* Search Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for movies, shows, books, games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex space-x-1">
            {mediaTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(type.id)}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        {isLoading && query.length > 2 && (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {query.length <= 2 && (
          <div className="text-center py-12">
            <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Start searching</h3>
            <p className="mt-1 text-sm text-gray-500">
              Type at least 3 characters to search for media
            </p>
          </div>
        )}

        {searchResults && searchResults.length === 0 && query.length > 2 && (
          <div className="text-center py-12">
            <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {searchResults && searchResults.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Search Results ({searchResults.length})
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {searchResults.map((media) => (
                <MediaCard
                  key={media.id}
                  media={media}
                  onAddToList={handleAddToList}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}