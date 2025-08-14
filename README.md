🎯 Objective

A production-ready single-page application (SPA) built using React + TypeScript that fetches users from a public API, supports search with URL sync, modal-based user details, theme switching, global state management, and responsive design.

🚀 Features
✅ Core Features

Data Fetching: Using React Query for caching, refetching on window focus, and pagination.

Debounced Search: 300ms delay with URL sync (maintains search state on refresh).

User Detail Modal: Opens on card click, deep-linkable via /user/:id, closable on ESC or background click.

Theme Toggle: Light/Dark mode with persistence using localStorage.

Reusable Components:

UserCard

SearchBar

UserModal

Pagination

ThemeToggle

SkeletonLoader

Global State Management: Redux Toolkit for search query, current page, and theme.

Error Handling: Custom ErrorBoundary + Suspense for lazy loading.

Performance Optimization: React.memo, useCallback, useMemo.

Responsive & Accessible: Mobile-first UI, ARIA roles, focus trap, and keyboard navigation.

📂 Project Structure
src/
 ├── components/      # Reusable components
 ├── hooks/           # Custom hooks
 ├── pages/           # Page-level components
 ├── store/           # Redux store & slices
 ├── types/           # TypeScript type definitions
 ├── utils/           # Utility functions
 ├── App.tsx          # Main App component
 └── main.tsx         # Entry point

🔗 API

Data is fetched from:

https://reqres.in/api/users


Supports pagination:
GET /api/users?page=1

🛠️ Tech Stack

React 18 + TypeScript

React Router v6

React Query

Redux Toolkit

Tailwind CSS (for styling)

Jest + React Testing Library (unit tests)

⚡ Installation & Setup
# Clone repo
git clone https://github.com/your-username/react-users-spa.git

# Navigate
cd react-users-spa

# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test

# Build for production
npm run build

🧪 Testing

Includes unit tests for:

Modal open/close

Search filtering

Theme toggle

Run tests:

npm run test

🌐 Deployment

Build: npm run build

Deploy on Vercel or Netlify
Link: https://rk-project2-assignment.netlify.app/users?page=1
