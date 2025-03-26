# DoggyDeals - Modern Dog Selling Platform

A modern web application for buying and selling dogs, built with Next.js 14, TypeScript, Tailwind CSS, and Firebase.

## Features

- User authentication (sign up, login, logout)
- CRUD operations for dog listings
- Responsive design with dark/light theme
- Real-time updates using Firebase
- Modern UI components with Radix UI
- Server-side rendering with Next.js

## Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Firebase account

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd dog-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a Firebase project and add your configuration:
- Create a new project in Firebase Console
- Enable Authentication and Firestore
- Create a `.env` file in the root directory with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKETyour_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

1. Run the development server:
```bash
npm run dev
# or
yarn dev
```

1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                # Next.js app directory
│   ├── api/           # API routes
│   ├── auth/          # Authentication pages
│   ├── dogs/          # Dog listing pages
│   └── ...
├── components/        # Reusable components
│   ├── ui/           # UI components
│   └── ...
├── lib/              # Utility functions and configurations
└── public/           # Static files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 