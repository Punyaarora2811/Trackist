import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { searchAllMedia, type MediaItem } from '@/services/apiServices'

export function useMediaSearch(query: string, type?: string) {
  return useQuery({
    queryKey: ['media', 'search', query, type],
    queryFn: async (): Promise<MediaItem[]> => {
      // Use external APIs for search instead of local database
      return await searchAllMedia(query, type)
    },
    enabled: query.length > 2,
    staleTime: 5 * 60 * 1000, // Cache results for 5 minutes
  })
}

export function useUserMedia(userId: string) {
  return useQuery({
    queryKey: ['userMedia', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_media')
        .select(`
          *,
          media (*)
        `)
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })

      if (error) throw error
      return data
    },
    enabled: !!userId,
  })
}

export function useUserMediaByStatus(userId: string, status: string) {
  return useQuery({
    queryKey: ['userMedia', userId, status],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_media')
        .select(`
          *,
          media (*)
        `)
        .eq('user_id', userId)
        .eq('status', status)
        .order('updated_at', { ascending: false })

      if (error) throw error
      return data
    },
    enabled: !!userId,
  })
}

export function useMediaDetail(id: string) {
  return useQuery({
    queryKey: ['media', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!id,
  })
}

export function useAddToList() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, mediaItem, status }: {
      userId: string
      mediaItem: MediaItem
      status: string
    }) => {
      // First, ensure the media item exists in our database
      const { data: existingMedia, error: fetchError } = await supabase
        .from('media')
        .select('id')
        .eq('api_id', mediaItem.api_id)
        .eq('type', mediaItem.type)
        .single()

      let mediaId: string

      if (fetchError || !existingMedia) {
        // Media doesn't exist, create it
        const { data: newMedia, error: insertError } = await supabase
          .from('media')
          .insert({
            api_id: mediaItem.api_id,
            type: mediaItem.type,
            title: mediaItem.title,
            description: mediaItem.description,
            poster_url: mediaItem.poster_url,
            release_date: mediaItem.release_date,
            genres: mediaItem.genres,
          })
          .select('id')
          .single()

        if (insertError) throw insertError
        mediaId = newMedia.id
      } else {
        mediaId = existingMedia.id
      }

      // Now create the user_media relationship
      const { data, error } = await supabase
        .from('user_media')
        .upsert({
          user_id: userId,
          media_id: mediaId,
          status,
          progress: 0,
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userMedia'] })
    },
  })
}

export function useUpdateProgress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, progress, status }: {
      id: string
      progress: number
      status?: string
    }) => {
      const updates: any = {
        progress,
        updated_at: new Date().toISOString()
      }

      // Auto-update status based on progress
      if (progress >= 100 && status !== 'dropped') {
        updates.status = 'completed'
      } else if (progress > 0 && status === 'plan_to_watch') {
        updates.status = 'watching'
      } else if (status) {
        updates.status = status
      }

      const { data, error } = await supabase
        .from('user_media')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userMedia'] })
    },
  })
}

export function useUpdateEpisodes() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      watchedEpisodes,
      totalEpisodes,
      status
    }: {
      id: string;
      watchedEpisodes: number;
      totalEpisodes: number;
      status?: string
    }) => {
      // Calculate progress percentage
      const progress = totalEpisodes > 0 ? Math.round((watchedEpisodes / totalEpisodes) * 100) : 0

      const updates: any = {
        watched_episodes: watchedEpisodes,
        total_episodes: totalEpisodes,
        progress,
        updated_at: new Date().toISOString()
      }

      // Auto-update status based on progress
      if (progress >= 100 && status !== 'dropped') {
        updates.status = 'completed'
      } else if (progress > 0 && status === 'plan_to_watch') {
        updates.status = 'watching'
      } else if (status) {
        updates.status = status
      }

      const { data, error } = await supabase
        .from('user_media')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw error
      }

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userMedia'] })
    },
    onError: (error) => {
      // Episode update failed - error will be handled by UI
    }
  })
}

export function useUpdateStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, status }: {
      id: string
      status: 'plan_to_watch' | 'watching' | 'completed' | 'dropped'
    }) => {
      const updates: any = {
        status,
        updated_at: new Date().toISOString()
      }

      // Reset progress if dropping or planning to watch
      if (status === 'dropped' || status === 'plan_to_watch') {
        updates.progress = 0
      }

      const { data, error } = await supabase
        .from('user_media')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userMedia'] })
    },
  })
}

export function useUpdateRating() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, rating }: {
      id: string
      rating: number
    }) => {
      const { data, error } = await supabase
        .from('user_media')
        .update({
          rating,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userMedia'] })
    },
  })
}

export function useRemoveFromList() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const { error } = await supabase
        .from('user_media')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userMedia'] })
    },
  })
}

export function useUserStats(userId: string) {
  return useQuery({
    queryKey: ['userStats', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_media')
        .select('status, rating, media(type)')
        .eq('user_id', userId)

      if (error) throw error

      const stats = {
        total: data.length,
        completed: data.filter(item => item.status === 'completed').length,
        watching: data.filter(item => item.status === 'watching').length,
        planned: data.filter(item => item.status === 'plan_to_watch').length,
        dropped: data.filter(item => item.status === 'dropped').length,
        averageRating: 0,
        byType: {
          movie: 0,
          tv: 0,
          book: 0,
          game: 0
        }
      }

      // Calculate average rating
      const ratedItems = data.filter(item => item.rating && item.rating > 0)
      if (ratedItems.length > 0) {
        stats.averageRating = ratedItems.reduce((sum, item) => sum + (item.rating || 0), 0) / ratedItems.length
      }

      // Count by type
      data.forEach(item => {
        if (item.media && typeof item.media === 'object' && 'type' in item.media) {
          const type = item.media.type as keyof typeof stats.byType
          if (type in stats.byType) {
            stats.byType[type]++
          }
        }
      })

      return stats
    },
    enabled: !!userId,
  })
}