# Sunflower Parisian Landing Page

This project consists of a Next.js frontend and a Strapi backend.

## Project Structure

```
/
├── frontend/           # Next.js frontend
│   ├── src/
│   ├── public/
│   └── ...
└── backend/           # Strapi backend
    ├── src/
    ├── config/
    └── ...
```

## Getting Started

### Frontend (Next.js)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

### Backend (Strapi)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Run the development server:
```bash
npm run develop
```

The Strapi admin panel will be available at [http://localhost:1337/admin](http://localhost:1337/admin)

## Development

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:1337](http://localhost:1337)
- Strapi Admin: [http://localhost:1337/admin](http://localhost:1337/admin)

## Deployment

### Frontend
The frontend can be deployed to Vercel or any other static hosting service.

### Backend
The backend can be deployed to any Node.js hosting service that supports SQLite or PostgreSQL.

## Environment Variables

### Frontend
Create a `.env.local` file in the frontend directory:
```
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
```

### Backend
The backend already has a `.env` file with necessary configurations.

## Database
The project uses SQLite by default. For production, you may want to switch to PostgreSQL.

To switch to PostgreSQL:
1. Install PostgreSQL
2. Create a database
3. Update the database configuration in `backend/config/database.ts`
