# 🎵 RetroVinyls - Premium Music Gallery (Frontend)

A sophisticated Next.js frontend application for vintage vinyl record enthusiasts, featuring modern design patterns, real-time authentication, and responsive user experience.

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![NextAuth](https://img.shields.io/badge/NextAuth-4.24.13-purple?style=for-the-badge)

## ✨ Core Features

### 🎨 Aesthetic Landing Page

- **7 Comprehensive Sections**: Hero, Featured Collection, Curated Categories, Artisan Choice, About Passion, Testimonials, and Join Community
- **Modern Design**: Clean, minimalist interface with premium aesthetics
- **Interactive Elements**: Smooth animations and hover effects
- **Call-to-Action**: Strategic placement for user engagement

### 🔐 Real-time Authentication

- **NextAuth.js Integration**: Secure authentication with multiple providers
- **Session Management**: Persistent login state across pages
- **Protected Routes**: Role-based access control for admin features
- **User Experience**: Seamless login/logout flow with visual feedback

### 📱 Dynamic Product Experience

- **Product Listing**: Grid layout with filtering and search capabilities
- **Product Details**: Individual vinyl record pages with comprehensive information
- **Server-Side Rendering**: SEO-optimized pages with fast loading times
- **Image Optimization**: Next.js Image component for performance

### 🛡️ Protected Admin Features

- **Add Item Form**: Comprehensive form for adding new vinyl records
- **Toast Notifications**: Real-time feedback using React Hot Toast
- **Form Validation**: Client-side validation with error handling
- **Admin Dashboard**: Secure access to management features

### 📱 Responsive Design

- **Mobile-First Approach**: Optimized for all device sizes
- **Touch-Friendly**: Swiper.js integration for mobile interactions
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive designs
- **Performance Optimized**: Lazy loading and code splitting

## 🛠️ Tech Stack

| Technology          | Version | Purpose                         |
| ------------------- | ------- | ------------------------------- |
| **Next.js**         | 16.1.3  | React framework with App Router |
| **React**           | 19.2.3  | UI library with latest features |
| **Tailwind CSS**    | 4.0     | Utility-first CSS framework     |
| **NextAuth.js**     | 4.24.13 | Authentication solution         |
| **Framer Motion**   | 12.27.0 | Animation library               |
| **Swiper.js**       | 12.0.3  | Touch slider component          |
| **Lucide React**    | 0.562.0 | Beautiful icon library          |
| **React Hot Toast** | 2.6.0   | Notification system             |

## 🔧 Environment Variables

Create a `.env.local` file in the project root:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-nextauth-secret-key-here-make-it-long-and-random

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Production Environment Variables

```env
# NextAuth Configuration
NEXTAUTH_URL=https://your-frontend-domain.vercel.app
NEXTAUTH_SECRET=your-super-secret-nextauth-secret-key-here-make-it-long-and-random

# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-domain.vercel.app
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see server README)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd retro-vinyls-client

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📍 Routes Summary

| Route         | Type      | Description                            | Authentication |
| ------------- | --------- | -------------------------------------- | -------------- |
| `/`           | Public    | Landing page with featured collections | None           |
| `/items`      | Public    | Browse all vinyl records               | None           |
| `/items/[id]` | Public    | Individual vinyl record details        | None           |
| `/login`      | Public    | User authentication page               | None           |
| `/items/add`  | Protected | Add new vinyl records form             | Required       |
| `/api/auth/*` | API       | NextAuth authentication endpoints      | Varies         |

## 🎨 Component Architecture

### Landing Page Components

```
src/components/landing/
├── Hero.jsx              # Main hero section with CTA
├── FeaturedCollection.jsx # Showcase featured vinyl records
├── CuratedCategories.jsx  # Browse by music genres
├── ArtisanChoice.jsx      # Curated selections
├── AboutPassion.jsx       # About section
├── Testimonials.jsx       # Customer reviews
├── JoinCommunity.jsx      # Newsletter signup
├── Footer.jsx             # Site footer with links
└── Navbar.jsx             # Navigation with authentication
```

### Core Components

```
src/
├── app/                   # Next.js App Router pages
│   ├── items/            # Product-related pages
│   ├── login/            # Authentication page
│   └── api/auth/         # NextAuth configuration
├── components/           # Reusable components
├── providers/            # Context providers
└── middleware.js         # Route protection middleware
```

## 🔑 Demo Credentials

For testing authentication features:

- **Email**: `admin@retro.com`
- **Password**: `admin123`

## 📦 Deployment

### Vercel Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
vercel --prod
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build test
npm run build
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ for vinyl enthusiasts worldwide**
