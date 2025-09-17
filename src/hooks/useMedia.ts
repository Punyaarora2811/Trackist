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
      const updates: any = { progress, updated_at: new Date().toISOString() }
      if (status) updates.status = status

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