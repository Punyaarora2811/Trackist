import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useAuth } from '@/contexts/AuthContext'
import { useUserMedia } from '@/hooks/useMedia'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { MediaCard } from '@/components/MediaCard'

export function Dashboard() {
  const { userProfile } = useAuth()
  const { data: userMedia } = useUserMedia(userProfile?.id)

  // Calculate stats
  const stats = userMedia?.reduce((acc, item) => {
    const mediaType = item.media.type
    const status = item.status

    if (!acc[mediaType]) {
      acc[mediaType] = { total: 0, completed: 0, watching: 0, planned: 0 }
    }

    acc[mediaType].total++
    if (status === 'completed') acc[mediaType].completed++
    if (status === 'watching') acc[mediaType].watching++
    if (status === 'plan_to_watch') acc[mediaType].planned++

    return acc
  }, {} as any) || {}

  const chartData = Object.entries(stats).map(([type, data]: [string, any]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    completed: data.completed,
    watching: data.watching,
    planned: data.planned,
  }))

  const pieData = Object.entries(stats).map(([type, data]: [string, any]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: data.total,
  }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  // Recent activity (mock data for demo)
  const recentActivity = [
    { type: 'completed', media: 'Inception', date: '2024-01-15' },
    { type: 'started', media: 'The Witcher 3', date: '2024-01-14' },
    { type: 'rated', media: 'Dune', date: '2024-01-13' },
  ]

  return (
    <div className="p-6 space-y-6">
             <div>
               <h1 className="text-3xl font-bold text-gray-900">
                 Welcome back{userProfile?.username ? `, ${userProfile.username}` : ''}!
               </h1>
               <p className="text-gray-600 mt-1">
                 Here's what's happening with your media tracking
               </p>
             </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(stats).map(([type, data]: [string, any]) => (
          <Card key={type}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium capitalize">
                {type}s
              </CardTitle>
              <span className="text-2xl">
                {type === 'movie' ? '🎬' : type === 'tv' ? '📺' : type === 'book' ? '📚' : '🎮'}
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.total}</div>
              <p className="text-xs text-muted-foreground">
                {data.completed} completed
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Media Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#10B981" name="Completed" />
                  <Bar dataKey="watching" fill="#F59E0B" name="In Progress" />
                  <Bar dataKey="planned" fill="#3B82F6" name="Planned" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Media Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Media Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'completed' && '✅'}
                  {activity.type === 'started' && '▶️'}
                  {activity.type === 'rated' && '⭐'}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium capitalize">{activity.type}</span>{' '}
                    <span className="text-gray-900">{activity.media}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}