# VeeLion Full-Stack Assessment

## Overview

This project is a full-stack **Task Management App** built with **Next.js (App Router)** on the frontend and **Express (Node.js)** on the backend.

It includes three main modules:

- **Tasks**: Manage tasks with full CRUD operations (create, edit, delete), search, and pagination.
- **Activity**: View audit and activity logs with filters, search, and activity stats.
- **Reports**: Centralized dashboard displaying aggregated metrics, real-time statistics, and task completion breakdown.

The frontend communicates with the backend through Next.js API route handlers (`app/api/*`) as well as direct client/server API utilities.

## Screenshots

1-Home page
<img width="1920" height="1080" alt="2026-10-17-235804_hyprshot" src="https://github.com/user-attachments/assets/1678fcd4-54ad-4d96-843f-a3b6e133c035" />

2-Tasks Page
<img width="1920" height="1080" alt="2026-10-17-235809_hyprshot" src="https://github.com/user-attachments/assets/3219a615-5711-4b40-b327-c78bf911819d" />

3-Activity Page
<img width="1920" height="1080" alt="2026-10-17-235818_hyprshot" src="https://github.com/user-attachments/assets/81777535-8d1a-474c-a7ba-53fd32f3e6d2" />

4-Reports page
<img width="1920" height="1080" alt="2026-10-17-235821_hyprshot" src="https://github.com/user-attachments/assets/7d5561d5-6bd5-4892-986d-0b99c0bcdf0f" />

---

## Folder Structure

```bash
.
├── backend/
│   ├── data/
│   │   ├── tasks.json
│   │   └── activity.json
│   ├── src/
│   │   ├── config/
│   │   │   └── paths.js
│   │   ├── middleware/
│   │   │   ├── asyncHandler.js
│   │   │   └── errorHandler.js
│   │   ├── modules/
│   │   │   ├── activity/
│   │   │   ├── reports/
│   │   │   └── tasks/
│   │   ├── utils/
│   │   │   ├── httpError.js
│   │   │   ├── id.js
│   │   │   └── jsonStore.js
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
└── frontend/
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
    └── package.json
```

---

## Tech Stack

### Frontend

- **Framework:** Next.js `14.2.5` (App Router)
- **Library:** React `18.2.0`
- **Language:** TypeScript `5.5.4`
- **Styling & UI:** Tailwind CSS, Lucide React, React-Toastify

### Backend

- **Runtime:** Node.js (v18+)
- **Framework:** Express `4.x`
- **Key Modules:** CORS, crypto UUIDv4, custom atomic JSON store with sequential mutex queueing

---

## Installation & Running

To run the complete application, start both the backend server and frontend development server.

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the server (runs on http://localhost:4000)
npm start

# Or start in watch mode for development:
npm run dev
```

> **Backend Port:** The server runs on `http://localhost:4000` by default (configurable via `PORT` environment variable).

### 2. Frontend Setup

In a separate terminal window:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Configure environment variables
# Verify or create frontend/.env:
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:4000

# Start the Next.js development server (runs on http://localhost:3000)
npm run dev
```

> **Frontend URL:** Open `http://localhost:3000` in your browser.

---
