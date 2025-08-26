# Streaver App

A modern web application built with NextJS, TypeScript, and TailwindCSS for browsing and filtering posts. Designed specifically for users with unstable internet connections, featuring robust error handling and connection resilience.

## Features

- **Post Listing**: Browse all posts with a clean, card-based interface
- **Smart Search**: Filter posts by user ID with debounced search functionality
- **Connection Resilient**: Optimized for users with unstable internet connections
- **Real-time Updates**: Automatic revalidation and error recovery using SWR
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Slow Connection Detection**: Notifies users when requests take longer than expected

## Tech Stack

- **Framework**: NextJS 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Data Fetching**: SWR (React Hooks for Data Fetching)
- **Deployment**: Vercel (recommended)

## Prerequisites

- Node.js 18+ 
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/streaver-app.git
cd streaver-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
streaver-app/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and TailwindCSS
│   │   ├── layout.tsx           # Root layout component
│   │   ├── page.tsx             # Home page
│   │   └── posts/
│   │       └── page.tsx         # Posts listing page
│   ├── components/
│   │   ├── PostCard.tsx         # Individual post display component
│   │   ├── SearchInput.tsx      # Debounced search input
│   │   └── SlowConnectionNotification.tsx # Slow connection alert
│   ├── hooks/
│   │   └── usePosts.ts          # SWR hook for posts data
│   └── types/
│       └── post.ts              # TypeScript interfaces
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## API Integration

The app integrates with the JSONPlaceholder API:
- **Base URL**: `https://jsonplaceholder.typicode.com/posts`
- **Filtering**: `https://jsonplaceholder.typicode.com/posts?userId=X`

### Post Structure
```typescript
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
```

## Key Features Implementation

### 1. SWR Configuration
- Automatic revalidation on focus and reconnect
- Error retry with exponential backoff
- Deduplication of requests
- Optimistic updates

### 2. Debounced Search
- 500ms delay to prevent excessive API calls
- Real-time filtering by user ID
- Clear search functionality

### 3. Connection Resilience
- Automatic retry on network failures
- Slow connection detection (3+ seconds)
- User-friendly error messages
- Loading states and progress indicators

### 4. Responsive Design
- Mobile-first approach
- Grid layout that adapts to screen size
- Touch-friendly interface elements

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure automatic deployment from the main branch
4. Optionally enable preview deployments for pull requests

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Environment Variables

No environment variables are required for basic functionality. The app uses the public JSONPlaceholder API.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue on GitHub or contact the development team.

## Acknowledgments

- [NextJS](https://nextjs.org/) - React framework
- [SWR](https://swr.vercel.app/) - Data fetching library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Fake API for testing
