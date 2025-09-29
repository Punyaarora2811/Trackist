# 🎬 Trackist - Media Tracking Application

A modern, full-stack media tracking application built with React, TypeScript, and Supabase. Track movies, TV shows, books, and games with a beautiful, responsive interface.

## ✨ Features

### Core Functionality
- **Multi-media tracking**: Movies, TV shows, books, and games
- **Progress tracking**: Track watching progress, reading progress, and gaming hours
- **Status management**: Plan to watch, currently watching, completed, dropped
- **Rating system**: Rate and review your media
- **Search functionality**: Find new media to add to your lists

### User Experience
- **Modern UI**: Clean, responsive design with smooth animations
- **Dashboard**: Comprehensive stats and progress visualization
- **Lists management**: Organized watchlists, reading lists, and gaming queues
- **Social features**: Follow users and see activity feeds (coming soon)

### Technical Features
- **Authentication**: Secure user registration and login with Supabase Auth
- **Real-time data**: Live updates with Supabase real-time subscriptions
- **API integrations**: Ready for TMDB, Google Books, and RAWG APIs
- **Responsive design**: Works perfectly on desktop, tablet, and mobile
- **TypeScript**: Full type safety throughout the application

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (optional for demo mode)

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
│   ├── ui/              # Base UI components (Button, Card, Input)
│   ├── Layout/          # Layout components (Sidebar, Header)
│   └── MediaCard.tsx    # Media display component
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── hooks/               # Custom React hooks
│   └── useMedia.ts      # Media-related hooks
├── lib/                 # Utilities and configurations
│   ├── supabase.ts      # Supabase client and types
│   └── utils.ts         # Helper functions
├── pages/               # Application pages
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Search.tsx       # Media search
│   └── Auth.tsx         # Login/Register
└── data/                # Sample data for demo mode
    └── sampleData.ts    # Mock media and user data
```

## 🗄️ Database Schema

The application uses the following main tables:

- **users**: User profiles and settings
- **media**: Movies, TV shows, books, and games
- **user_media**: User's tracking data for media items
- **reviews**: User reviews and ratings
- **follows**: User following relationships

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

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com) for the styling system
- [Lucide React](https://lucide.dev) for the icon system
- [Recharts](https://recharts.org) for the data visualization
- [Pexels](https://pexels.com) for the sample images

---

Built with ❤️ using React, TypeScript, and Supabase.
