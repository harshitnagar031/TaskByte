# TaskByte Setup Guide

## Prerequisites

1. Node.js (v18 or higher)
2. PostgreSQL database
3. npm package manager

## Initial Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/taskbyte.git
cd taskbyte
```

2. Install dependencies:
```bash
npm install
```

3. Configure Environment Variables:
Create a `.env` file in the root directory:
```env
# Required - PostgreSQL database URL
DATABASE_URL=postgresql://username:password@localhost:5432/taskbyte

# Optional - Port configuration (defaults to 5000)
PORT=5000
```

4. Initialize the Database:
```bash
# Create database tables
npm run db:push
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5000

## Project Structure

```
├── client/                 # Frontend React application
│   └── src/
│       ├── components/     # React components
│       │   ├── ui/        # Reusable UI components
│       │   ├── task-*.tsx # Task-related components
│       │   └── category-form.tsx
│       ├── pages/         # Page components
│       └── App.tsx        # Main application component
├── server/                # Backend Express server
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database operations
│   └── index.ts         # Server entry point
└── shared/               # Shared types and schemas
    └── schema.ts        # Database schema and types
```

## Database Schema

The application uses two main tables:

1. Tasks:
- id (Primary Key)
- title (Required)
- description (Optional)
- dueDate (Optional)
- priority (Default: 1)
- status (Default: "pending")
- category (Default: "general")
- completed (Default: false)

2. Categories:
- id (Primary Key)
- name (Required, Unique)
- color (Required)

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run db:push`: Update database schema

## Development Guidelines

1. Follow the existing code structure and patterns
2. Use TypeScript for type safety
3. Follow the ESLint and Prettier configurations
4. Write meaningful commit messages
5. Test all new features before committing

## Common Issues and Solutions

1. Database Connection Issues:
   - Verify DATABASE_URL in .env
   - Ensure PostgreSQL is running
   - Check database user permissions

2. Build Errors:
   - Clear node_modules and reinstall dependencies
   - Verify TypeScript types are correct
   - Check for missing environment variables

3. If encountering "Category not found" errors:
   - Ensure the category exists in the database
   - Check if the category ID is correct
   - Verify that the category wasn't recently deleted

For more detailed information, refer to the main README.md file.