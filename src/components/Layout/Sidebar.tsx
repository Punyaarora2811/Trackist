import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Home, 
  Search, 
  Bookmark, 
  TrendingUp, 
  User, 
  Settings,
  Film,
  Tv,
  Book,
  Gamepad2,
  BarChart3,
  Users
} from 'lucide-react'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const { userProfile } = useAuth()

  const navigation = [
    { name: 'Dashboard', icon: Home, id: 'dashboard' },
    { name: 'Search', icon: Search, id: 'search' },
    { name: 'My Lists', icon: Bookmark, id: 'lists' },
    { name: 'Trending', icon: TrendingUp, id: 'trending' },
  ]

  const mediaTypes = [
    { name: 'Movies', icon: Film, id: 'movies' },
    { name: 'TV Shows', icon: Tv, id: 'tv' },
    { name: 'Books', icon: Book, id: 'books' },
    { name: 'Games', icon: Gamepad2, id: 'games' },
  ]

  const userNav = [
    { name: 'Profile', icon: User, id: 'profile' },
    { name: 'Settings', icon: Settings, id: 'settings' },
  ]

  const adminNav = userProfile?.role === 'admin' ? [
    { name: 'Analytics', icon: BarChart3, id: 'analytics' },
    { name: 'Users', icon: Users, id: 'admin-users' },
  ] : []

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r border-gray-200">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="text-2xl font-bold text-gray-900">
            🎬 Trackist
          </div>
        </div>

        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => onPageChange(item.id)}
                className={cn(
                  'w-full group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all',
                  currentPage === item.id
                    ? 'bg-indigo-100 text-indigo-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5',
                    currentPage === item.id
                      ? 'text-indigo-500'
                      : 'text-gray-400'
                  )}
                />
                {item.name}
              </button>
            ))}

            <div className="mt-6">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Media Types
              </div>
              {mediaTypes.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onPageChange(item.id)}
                  className={cn(
                    'w-full group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all',
                    currentPage === item.id
                      ? 'bg-indigo-100 text-indigo-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5',
                      currentPage === item.id
                        ? 'text-indigo-500'
                        : 'text-gray-400'
                    )}
                  />
                  {item.name}
                </button>
              ))}
            </div>

            {adminNav.length > 0 && (
              <div className="mt-6">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Admin
                </div>
                {adminNav.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => onPageChange(item.id)}
                    className={cn(
                      'w-full group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all',
                      currentPage === item.id
                        ? 'bg-indigo-100 text-indigo-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'mr-3 h-5 w-5',
                        currentPage === item.id
                          ? 'text-indigo-500'
                          : 'text-gray-400'
                      )}
                    />
                    {item.name}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-auto">
              {userNav.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onPageChange(item.id)}
                  className={cn(
                    'w-full group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all',
                    currentPage === item.id
                      ? 'bg-indigo-100 text-indigo-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5',
                      currentPage === item.id
                        ? 'text-indigo-500'
                        : 'text-gray-400'
                    )}
                  />
                  {item.name}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}