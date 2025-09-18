import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Sidebar } from '@/components/Layout/Sidebar'
import { Header } from '@/components/Layout/Header'
import { Dashboard } from '@/pages/Dashboard'
import { Search } from '@/pages/Search'
import { Auth } from '@/pages/Auth'
import { supabase } from '@/lib/supabase'
import { sampleMedia, sampleUserMedia } from '@/data/sampleData'

const queryClient = new QueryClient()

function AppContent() {
  const { user, loading } = useAuth()
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dataSeeded, setDataSeeded] = useState(false)

  // Seed sample data if database is connected but empty
  useEffect(() => {
    const seedData = async () => {
      if (!user || dataSeeded) return

      try {
        // Check if data already exists
        const { data: existingMedia } = await supabase
          .from('media')
          .select('id')
          .limit(1)

        if (!existingMedia || existingMedia.length === 0) {
          // Seed media data
          await supabase.from('media').insert(sampleMedia)
        }

        // Check for user media
        const { data: existingUserMedia } = await supabase
          .from('user_media')
          .select('id')
          .eq('user_id', user.id)
          .limit(1)

        if (!existingUserMedia || existingUserMedia.length === 0) {
          // Seed user media with current user ID
          const userMediaWithCorrectId = sampleUserMedia.map(item => ({
            ...item,
            user_id: user.id
          }))

          await supabase.from('user_media').insert(userMediaWithCorrectId)
        }

        setDataSeeded(true)
      } catch (error) {
        // Data seeding skipped - using demo mode
        // In demo mode without database connection
      }
    }

    seedData()
  }, [user, dataSeeded])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Auth />
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'search':
        return <Search />
      case 'lists':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">My Lists</h1>
            <p className="text-muted-foreground">Manage your watchlists, reading lists, and gaming queues here.</p>
          </div>
        )
      case 'trending':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Trending</h1>
            <p className="text-muted-foreground">Discover what's popular across all media types.</p>
          </div>
        )
      case 'profile':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Profile</h1>
            <p className="text-muted-foreground">Manage your profile and account settings.</p>
          </div>
        )
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">Settings</h1>
            <p className="text-muted-foreground">Customize your Trackist experience.</p>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}