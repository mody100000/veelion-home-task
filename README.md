# VeeLion Frontend Assessment (Next.js)

## Overview

This project is a **Task Management App** built with **Next.js (App Router)** and **TypeScript**.
It includes three main pages:

- **Tasks**: Manage tasks with create, edit, delete, search, and pagination.
- **Activity**: View activity logs with filters, search, and stats.
- **Reports**: See summary statistics and task status insights.

The frontend uses API route handlers under `app/api/*` to proxy requests to the backend.

## Screenshots

## Folder Structure

```bash
frontend/
├── app/
│   ├── activity/
│   ├── reports/
│   ├── tasks/
│   └── api/
├── components/
│   ├── activity/
│   ├── reports/
│   ├── tasks/
│   └── common/
├── hooks/
├── lib/
├── public/
├── types/
├── utils/
├── globals.css
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Tech Stack

### Core

- **Next.js** `14.2.5`
- **React** `18.2.0`
- **TypeScript** `5.5.4`

### UI & Styling

- **Tailwind CSS**
- **lucide-react**
- **react-toastify**

## Installation & Run

### 1) Install frontend dependencies

```bash
cd frontend
npm install
```

### 2) Configure environment

Create/update `.env` in `frontend/` based on `.env.example`.

### 3) Run development server

```bash
npm run dev
```

Open: `http://localhost:3000`

## Notes

- Backend endpoint reference: `frontend/docs/backend-endpoints.md`
- Backend setup notes: `backend/README.md`
- Code review findings: `REVIEW.md`
