import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useMediaSearch(query: string, type?: string) {
  return useQuery({
    queryKey: ['media', 'search', query, type],
    queryFn: async () => {
      let queryBuilder = supabase
        .from('media')
        .select('*')
        .ilike('title', `%${query}%`)

      if (type && type !== 'all') {
        queryBuilder = queryBuilder.eq('type', type)
      }

      const { data, error } = await queryBuilder.limit(20)
      if (error) throw error
      return data
    },
    enabled: query.length > 2,
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
    mutationFn: async ({ userId, mediaId, status }: {
      userId: string
      mediaId: string
      status: string
    }) => {
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