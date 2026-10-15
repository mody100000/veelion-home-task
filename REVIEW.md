# Code Review Findings

## Performance

### 1) Activity page triggers unnecessary re-renders

- **What is wrong:** `app/activity/page.tsx` updates `tick` every 1.4s and includes `tick` in filtering effects, forcing repeat calculations and list cloning.
- **Why it matters:** Causes avoidable renders and work on every interval, even when data/query did not change.
- **improvement:** Remove `tick`-based state churn and derive `shownActivity` directly from source data + query using `useMemo`.

### 2) Duplicate time formatting

- **What is wrong:** `formatTimeA` and `formatTimeB` do the same operation.
- **Why it matters:** Duplicated logic increases maintenance surface and confusion.
- **improvement:** Keep one formatter utility and call it once per item.

## Maintainability

### 3) Heavy inline styling (before refactor)

- **What is wrong:** UI components previously used many `style={{...}}` objects across pages and task components.
- **Why it matters:** Repeated style objects are hard to maintain, prevent consistent design language, and make visual updates expensive.
- **improvement:** Centralize styling with Tailwind utility classes and shared UI class constants.

### 4) Missing shared design tokens (before refactor)

- **What is wrong:** Colors and spacing were spread between CSS custom properties and inline values.
- **Why it matters:** Visual inconsistency and high risk of drift when adding new pages (like `/reports`).
- **improvement:** Define design system tokens (palette, typography, spacing) and reuse through global CSS variables and constants.

### 5) Duplicate backend request logic in frontend API client

- **What is wrong:** `frontend/lib/backendApi.ts` repeated fetch/error handling in each function and lacked a request timeout and response-shape guards.
- **Why it matters:** Duplication increases bug risk, and absent timeout/validation can lead to hanging requests or brittle runtime failures when backend payloads drift.
- **improvement:** Added a shared request helper with timeout handling, centralized error parsing, and response-shape validation while preserving existing endpoint contracts.

## UX Issues

### 6) Error and loading states were visually inconsistent

- **What is wrong:** Different sections had ad-hoc spacing and text hierarchy.
- **Why it matters:** Inconsistent UI feedback reduces trust and readability.
- **improvement:** Use consistent card, button, and muted text patterns with shared classes.

### 7) Sidebar and breadcrumb improve navigation flow

- **What is improved:** Clear navigation improves user experience by providing context and reducing friction when navigating across different sections of the app.
- **Why it matters:** The application lacked a consistent navigation structure, making it harder for users to understand their current location and move between pages with the basic back button.
- **improvement:** Introduced a shared layout with a sidebar for primary navigation and breadcrumbs for contextual awareness, resulting in a more scalable and user-friendly structure.

## Code Quality / React Best Practices

### 8) Styling concerns mixed into component logic

- **What is wrong:** Layout details were embedded directly in JSX inline style objects.
- **Why it matters:** Blurs logic/presentation boundaries and complicates component reuse.
- **improvement:** Keep components focused on behavior/state while using shared style primitives.

### 9) `useTasks` hook complexity and error-path behavior

- **What is wrong:** `frontend/hooks/useTasks.ts` contained unnecessary guard complexity and request handling details that made the hook harder to follow, plus unconditional JSON headers and brittle non-JSON error parsing.
- **Why it matters:** Extra complexity increases maintenance cost and makes debugging async flows slower.
- **improvement:** Simplified to a single fetch abort ref, kept loading/error state handling straightforward, switched sentinel state to `null`, made `Content-Type` conditional on request body, and improved non-JSON error fallback messaging.

## Task Page

We significantly upgraded the Task Dashboard's functionality and UX with the following core features:

- **Task Stats Cards**: Added real-time summary cards displaying Total, Pending, and Completed task counts.
- **Frontend Search & Pagination**: Implemented client-side search filtering and a reusable pagination component (triggered when exceeding 5 items per page).
- **Full CRUD Capabilities**: Added a unified modal for creating tasks and editing titles, along with a confirmation modal for safe deletions.
- **Overall UX Polish**: Replaced native browser alerts with custom modals, added `react-toastify` for toast notifications, and introduced a `LoadingSkeleton` for smooth data-fetching state transitions.

## Activity Page

We enhanced the Activity Log's functionality and UX with the following core features:

- **Activity Stats Cards**: Added visual summary cards displaying total actions alongside specific counts for creations, updates, and deletions.
- **Search, Filters, & Pagination**: Integrated text search, action-specific dropdown filtering, and our reusable `usePagination` hook to navigate large logs effortlessly.
- **Refactored Logic & UI Polish**: Simplified the activity logging messages in the tasks context, refactored the Activity page to leverage a clean Server Component/Client Component architecture, and delivered a consistent, polished look and feel.
