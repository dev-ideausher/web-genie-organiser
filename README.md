# Web Genie Organiser

A comprehensive personal organization and productivity web application built with Next.js. Web Genie Organiser helps users manage their daily tasks, schedule events, maintain journals, track gratitude, view horoscopes, organize contacts, and much more—all in one unified platform.

## 🚀 Features

### Core Features

- **📊 Dashboard** - Centralized overview of tasks, calendar, audios, videos, gratitude quotes, horoscope, and journal entries
- **✅ Task Management** - Create, organize, and track daily tasks with activity monitoring
- **📅 Calendar** - Full-featured calendar with event creation and management using FullCalendar
- **📝 Journal** - Personal journaling with general and AI-powered templates
- **🎵 Audios & Videos** - Organize and manage audio recordings, voice notes, and video content
- **🙏 Gratitude** - Daily gratitude tracking with affirmations and inspirational quotes
- **🔮 Horoscope** - Personalized daily horoscope readings based on zodiac signs
- **👥 Contacts** - Contact management system with detailed contact profiles
- **🎯 Vision Board** - Create and track progress on vision boards with progress tracking
- **💬 Ask Genie** - AI-powered assistant for project management and chat interactions
- **👤 Profile Management** - Comprehensive profile settings including:
  - Profile customization
  - Notification preferences
  - Password reset
  - Subscription management
  - Payment methods
  - Support chat
  - Referral system
  - Review system

### Authentication

- Firebase Authentication integration
- Google Sign-In
- Apple Sign-In
- Email/Password authentication
- Secure session management with cookies

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend & Services
- **Firebase** - Authentication and Firestore database
- **FullCalendar** - Calendar component library
- **React Day Picker** - Date picker component
- **React Phone Number Input** - Phone number input component
- **React Toastify** - Toast notifications
- **js-cookie** - Cookie management

### Development Tools
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm** or **bun**
- **Firebase account** with a project set up

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd web-genie-organiser
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

You can find these values in your Firebase project settings under "Project settings" > "Your apps" > "Web app".

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
web-genie-organiser/
├── public/                 # Static assets
│   ├── icons/             # SVG icon components
│   ├── images/            # Image assets
│   ├── signs/             # Zodiac sign images
│   └── svg/               # SVG files
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── (web)/         # Main application routes
│   │   │   ├── dashboard/ # Dashboard page
│   │   │   ├── task/      # Task management
│   │   │   ├── calender/  # Calendar and events
│   │   │   ├── journal/   # Journaling
│   │   │   ├── audios-and-videos/ # Media management
│   │   │   ├── gratitude/ # Gratitude tracking
│   │   │   ├── horoscope/ # Horoscope readings
│   │   │   ├── contacts/  # Contact management
│   │   │   ├── visionBoard/ # Vision board
│   │   │   ├── ask-genie/ # AI assistant
│   │   │   └── (profile)/ # Profile-related pages
│   │   ├── signup/        # User registration
│   │   ├── forgot-password/ # Password recovery
│   │   └── layout.js      # Root layout
│   ├── components/        # React components
│   │   ├── Login/         # Login components
│   │   ├── signup/        # Signup components
│   │   ├── Tasks/         # Task components
│   │   ├── Journal/       # Journal components
│   │   ├── Gratitude/     # Gratitude components
│   │   ├── Contacts/      # Contact components
│   │   ├── Audios-videos/ # Media components
│   │   ├── Sidebar.js     # Navigation sidebar
│   │   └── Header.js      # Header component
│   ├── services/          # API and service files
│   │   ├── APIs/          # API service files
│   │   └── auth/          # Authentication services
│   └── helper/            # Helper utilities
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies
└── tailwind.config.js     # Tailwind CSS configuration
```

## 🎯 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## 🔐 Authentication

The application uses Firebase Authentication with support for:

- **Email/Password** - Traditional email and password authentication
- **Google Sign-In** - OAuth authentication with Google
- **Apple Sign-In** - OAuth authentication with Apple

User sessions are managed using secure cookies, and authentication state is persisted across page reloads.

## 📱 Features in Detail

### Dashboard
- Overview of pending tasks
- Calendar view with current month
- Quick access to audios and videos
- Daily gratitude quotes
- Horoscope readings
- Recent journal entries

### Task Management
- Create and manage tasks
- Set dates and times
- Track task completion
- Activity history

### Calendar
- Full calendar view with FullCalendar integration
- Create and manage events
- Day, week, and month views
- Event scheduling

### Journal
- General journal templates
- AI-powered journal templates
- Mood tracking
- Journal entry history

### Media Management
- Audio recording and playback
- Video organization
- Voice note management
- Media grouping and categorization

### Profile & Settings
- User profile customization
- Notification preferences
- Subscription management
- Payment method management
- Support chat integration
- Referral program
- Review and feedback system

## 🌐 Deployment

The application is configured for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

### Deploy on Vercel

1. Push your code to a Git repository
2. Import your project on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

The application will automatically build and deploy on every push to your main branch.

## 🔒 Security Notes

- Never commit your `.env.local` file to version control
- Ensure Firebase security rules are properly configured
- Use HTTPS in production
- Regularly update dependencies for security patches

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is private and proprietary.

## 📧 Support

For support, please use the in-app support chat feature or contact the development team.

---

Built with ❤️ using Next.js and Firebase
