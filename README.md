# 🎬 Trackist - Media Tracking Application

A modern, full-stack media tracking application built with React, TypeScript, and Supabase. Track movies, TV shows, books, and games with a beautiful, responsive interface.

## ✨ Features

### 🎯 Novel Feature: Smart Recommendations
- **✨ RecommendMe**: AI-powered content recommendations based on available time
- **Time-based suggestions**: Get perfect recommendations for 30 minutes, 2 hours, or even a week
- **Genre analysis**: Learns from your media library to suggest content you'll love
- **Comprehensive database**: Covers TV shows, movies, books, games, and story-driven experiences
- **Smart categorization**: Automatically suggests the best content type for your time slot

### Core Functionality
- **Multi-media tracking**: Movies, TV shows, books, and games
- **Progress tracking**: Track watching progress, reading progress, and gaming hours
- **Episode tracking**: Detailed TV show episode progress with automatic total episode fetching
- **Status management**: Plan to watch, currently watching, completed, dropped
- **Rating system**: 5-star rating system with detailed reviews
- **Search functionality**: Find new media across all supported APIs
- **Playlist management**: Create and manage custom playlists

### User Experience
- **Modern UI**: Clean, responsive design with smooth animations
- **Dark/Light theme**: Automatic theme switching with system preference detection
- **Dashboard**: Comprehensive stats and progress visualization with charts
- **Lists management**: Organized watchlists, reading lists, and gaming queues
- **Social features**: Follow users, view public profiles, and discover new content
- **User profiles**: Public/private profiles with activity feeds
- **Mobile responsive**: Optimized for all device sizes

### Technical Features
- **Authentication**: Secure user registration and login with Supabase Auth
- **Real-time data**: Live updates with Supabase real-time subscriptions
- **API integrations**: Full TMDB, Google Books, and RAWG API support
- **TypeScript**: Full type safety throughout the application
- **React Query**: Efficient data fetching and caching
- **Toast notifications**: User feedback for all actions
- **Demo mode**: Works without database connection using sample data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (optional for demo mode)

### 🎯 Try the RecommendMe Feature
1. Start the app and create an account
2. Add some media to your library (movies, shows, books, games)
3. Navigate to the **RecommendMe** tab in the sidebar
4. Enter how much time you have (e.g., "2 hours", "30 minutes", "1 day")
5. Get personalized recommendations based on your preferences!

### Installation

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd trackist
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
```

3. **Configure Supabase (Optional)**:
   - Click "Connect to Supabase" in the app interface
   - Or manually add your Supabase credentials to `.env`

4. **Start the development server**:
```bash
npm run dev
```

5. **Open your browser** and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Card, Input, Badge, Toast)
│   ├── Layout/          # Layout components (Sidebar, Header)
│   ├── MediaCard.tsx    # Media display component
│   ├── ProgressTracker.tsx  # Media progress tracking component
│   └── PersonalReview.tsx   # User review component
├── contexts/            # React contexts
│   ├── AuthContext.tsx  # Authentication context
│   └── ThemeContext.tsx # Theme management (light/dark mode)
├── hooks/               # Custom React hooks
│   └── useMedia.ts      # Comprehensive media-related hooks
├── lib/                 # Utilities and configurations
│   ├── supabase.ts      # Supabase client and complete database types
│   └── utils.ts         # Helper functions and utilities
├── pages/               # Application pages
│   ├── Dashboard.tsx    # Main dashboard with stats
│   ├── Search.tsx       # Media search functionality
│   ├── RecommendMe.tsx  # Smart time-based recommendations
│   ├── Trending.tsx     # Trending content across all media types
│   ├── UserLists.tsx    # User's media lists
│   ├── MyLists.tsx      # Personal list management
│   ├── Users.tsx        # User discovery and browsing
│   ├── Profile.tsx      # User profiles (own and others)
│   ├── Settings.tsx     # User settings and preferences
│   └── Auth.tsx         # Login/Register authentication
├── services/            # External API services
│   └── apiServices.ts   # TMDB, Google Books, RAWG API integrations
└── data/                # Sample data for demo mode
    └── sampleData.ts    # Mock media and user data
```

## 🗄️ Database Schema

The application uses Supabase with the following comprehensive table structure:

### Core Tables

**users**
- `id` (uuid, primary key)
- `email` (text, unique)
- `username` (text, unique)
- `avatar_url` (text, optional)
- `bio` (text, optional)
- `is_private` (boolean, default: false)
- `role` (enum: 'user' | 'admin', default: 'user')
- `created_at` (timestamp)
- `updated_at` (timestamp)

**media**
- `id` (uuid, primary key)
- `type` (enum: 'movie' | 'tv' | 'book' | 'game')
- `api_id` (text, unique per type)
- `title` (text)
- `description` (text, optional)
- `poster_url` (text, optional)
- `release_date` (date, optional)
- `genres` (text[], array)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**user_media**
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to users)
- `media_id` (uuid, foreign key to media)
- `status` (enum: 'plan_to_watch' | 'watching' | 'completed' | 'dropped')
- `progress` (integer, 0-100)
- `watched_episodes` (integer, optional for TV shows)
- `total_episodes` (integer, optional for TV shows)
- `rating` (integer, 1-5, optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**reviews**
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to users)
- `media_id` (uuid, foreign key to media)
- `rating` (integer, 1-5)
- `content` (text, optional)
- `is_flagged` (boolean, default: false)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**follows**
- `id` (uuid, primary key)
- `follower_id` (uuid, foreign key to users)
- `following_id` (uuid, foreign key to users)
- `created_at` (timestamp)

**playlists**
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to users)
- `name` (text)
- `description` (text, optional)
- `is_public` (boolean, default: true)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**playlist_items**
- `id` (uuid, primary key)
- `playlist_id` (uuid, foreign key to playlists)
- `media_id` (uuid, foreign key to media)
- `created_at` (timestamp)

## 🔧 Configuration

### API Keys (Optional)

The app works perfectly without API keys using sample data. To enable external API features:

1. **TMDB API** (Movies & TV):
   - Get key from [The Movie Database](https://developers.themoviedb.org/3)
   - Add to `.env` as `VITE_TMDB_API_KEY`

2. **Google Books API** (Books):
   - Get key from [Google Cloud Console](https://console.cloud.google.com/)
   - Add to `.env` as `VITE_GOOGLE_BOOKS_API_KEY`

3. **RAWG API** (Games):
   - Get key from [RAWG Video Games Database](https://rawg.io/apidocs)
   - Add to `.env` as `VITE_RAWG_API_KEY`

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Use the provided SQL migration scripts to set up tables
3. Enable Row Level Security (RLS) policies
4. Add your project URL and anon key to `.env`

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (#6366F1) - Main actions and highlights
- **Secondary**: Gray (#6B7280) - Supporting elements
- **Success**: Green (#10B981) - Completed items
- **Warning**: Yellow (#F59E0B) - In progress items
- **Error**: Red (#EF4444) - Dropped/error states

### Typography
- **Headings**: Inter, system font stack
- **Body**: Inter, optimized for readability
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components
- **Cards**: Rounded corners (12px), subtle shadows
- **Buttons**: Smooth hover states, active scaling
- **Inputs**: Clean borders, focus rings
- **Animations**: Subtle transitions, loading states

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Database (Supabase)
- Production database is automatically managed
- Run migrations through Supabase dashboard
- Configure environment variables in hosting platform

## 📱 Mobile Responsive

The application is fully responsive with:
- **Mobile-first design**: Optimized for small screens
- **Touch-friendly**: Large tap targets and gestures
- **Progressive enhancement**: Core features work on all devices
- **Adaptive layouts**: Content reflows based on screen size

## 🔒 Security

- **Authentication**: Supabase Auth with JWT tokens
- **Authorization**: Row Level Security (RLS) policies
- **Data validation**: Client and server-side validation
- **HTTPS**: All communications encrypted in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📦 Dependencies

### Core Dependencies
- **React 18.3.1** - UI framework
- **TypeScript 5.5.3** - Type safety
- **Vite 5.4.2** - Build tool and dev server
- **@supabase/supabase-js 2.57.4** - Backend database and auth
- **@tanstack/react-query 5.17.0** - Data fetching and caching
- **Tailwind CSS 3.4.1** - Styling framework
- **Lucide React 0.344.0** - Icon system
- **Recharts 2.10.0** - Data visualization
- **date-fns 3.0.0** - Date utilities
- **clsx 2.0.0** & **tailwind-merge 2.2.0** - Conditional styling
- **class-variance-authority 0.7.0** - Component variants

### Development Dependencies
- **ESLint 9.9.1** - Code linting
- **TypeScript ESLint 8.3.0** - TypeScript linting rules
- **PostCSS 8.4.35** & **Autoprefixer 10.4.18** - CSS processing

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com) for the styling system
- [Lucide React](https://lucide.dev) for the icon system
- [Recharts](https://recharts.org) for the data visualization
- [Pexels](https://pexels.com) for the sample images
- [TanStack Query](https://tanstack.com/query) for data management

## 🌟 What Makes Trackist Special

**Trackist** stands out with its innovative **RecommendMe** feature - the first media tracking app to offer time-based, AI-powered content recommendations. Whether you have 30 minutes for a quick episode or a whole weekend for an epic gaming session, Trackist intelligently suggests the perfect content based on your preferences and available time.

The app combines the best of traditional media tracking with cutting-edge recommendation algorithms, making it easier than ever to discover your next favorite movie, show, book, or game.

---

Built with ❤️ using React, TypeScript, and Supabase.
