# VeeLion Frontend Assessment (Next.js)

## Overview

This project is a **Task Management App** built with **Next.js (App Router)** and **TypeScript**.
It includes three main pages:

- **Tasks**: Manage tasks with create, edit, delete, search, and pagination.
- **Activity**: View activity logs with filters, search, and stats.
- **Reports**: See summary statistics and task status insights.

The frontend uses API route handlers under `app/api/*` to proxy requests to the backend.

## Screenshots

1-Home page
<img width="1920" height="1080" alt="2026-10-15-232207_hyprshot" src="https://github.com/user-attachments/assets/1f104c7c-7935-4360-9858-83b4f9f7c4d2" />

2-Tasks Page
<img width="1920" height="1080" alt="2026-10-15-232215_hyprshot" src="https://github.com/user-attachments/assets/744bdff9-983f-42aa-9d9b-2192a33d5586" />

3-Activity Page
<img width="1920" height="1080" alt="2026-10-15-232226_hyprshot" src="https://github.com/user-attachments/assets/7998ffb2-3e93-420e-a2b3-ef27693e8125" />

4-Reports page
<img width="1920" height="1080" alt="2026-10-15-232231_hyprshot" src="https://github.com/user-attachments/assets/10f7d1da-cb72-414d-afd6-f41c07e6fada" />


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
