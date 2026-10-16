# Code Review Findings

## Performance

### 1) Activity page triggers unnecessary re-renders

- **Issue:** `app/activity/page.tsx` updates `tick` every 1.4s and includes it in filtering effects, which repeatedly recalculates and clones the list.
- **Impact:** This creates avoidable renders and wasted work, even when the source data and query are unchanged.
- **Recommendation:** Remove `tick`-driven updates and derive `shownActivity` from source data + query with `useMemo`.

### 2) Duplicate time-formatting logic

- **Issue:** `formatTimeA` and `formatTimeB` perform the same transformation.
- **Impact:** Duplicate utilities increase maintenance overhead and create room for drift.
- **Recommendation:** Keep one shared formatter and call it once per item.

## Maintainability

### 3) Heavy inline styling (before refactor)

- **Issue:** Components previously relied on many `style={{...}}` objects across pages and task views.
- **Impact:** Repeated inline styles are harder to maintain and make visual consistency harder to enforce.
- **Recommendation:** Centralize styling with Tailwind utility classes and shared UI class constants.

### 4) Missing shared design tokens (before refactor)

- **Issue:** Color and spacing values were split across CSS variables and inline values.
- **Impact:** This increases UI inconsistency risk and makes future page additions (such as `/reports`) harder to keep aligned.
- **Recommendation:** Standardize palette, typography, and spacing tokens, then reuse them via global CSS variables and shared constants.

### 5) Duplicated backend request handling in frontend API client

- **Issue:** `frontend/lib/backendApi.ts` repeated fetch/error handling per function and had no timeout or response-shape guards.
- **Impact:** Duplication increases bug risk; missing timeout/validation can cause hanging requests and brittle runtime failures when payloads change.
- **Recommendation:** Use a shared request helper with timeout support, centralized error parsing, and response-shape validation while preserving endpoint contracts.

## UX Consistency

### 6) Inconsistent loading and error states

- **Issue:** Loading/error UI patterns used inconsistent spacing and text hierarchy across sections.
- **Impact:** Inconsistent feedback reduces readability and user trust.
- **Recommendation:** Reuse consistent card, button, and muted-text patterns through shared classes.

### 7) Sidebar and breadcrumb improve navigation flow

- **What improved:** Navigation now provides clear orientation and reduces friction between sections.
- **Impact:** A shared navigation structure helps users understand location and move across pages more efficiently.
- **Recommendation:** Continue using the shared layout with sidebar + breadcrumb as the baseline navigation pattern.

## Code Quality / React Best Practices

### 8) Styling concerns mixed with component logic

- **Issue:** Layout details were embedded directly in JSX via inline style objects.
- **Impact:** Mixing presentation with logic reduces reuse and increases component complexity.
- **Recommendation:** Keep components focused on state/behavior and rely on shared style primitives for presentation.

### 9) `useTasks` hook complexity and error-path behavior

- **Issue:** `frontend/hooks/useTasks.ts` contained unnecessary guard complexity and low-level request details, plus unconditional JSON headers and fragile non-JSON error parsing.
- **Impact:** Extra branching made async flow harder to reason about and debug.
- **Recommendation:** Simplify around a single abort ref, keep loading/error handling straightforward, use `null` sentinel state, set `Content-Type` only when needed, and improve non-JSON error fallback messaging.

## Delivered Improvements

### Task Page

The Task Dashboard was significantly improved in both functionality and UX:

- **Task stats cards:** Real-time summary cards for total, pending, and completed tasks.
- **Search and pagination:** Client-side filtering with reusable pagination (activated above 5 items).
- **Full CRUD flow:** Unified modal for create/edit operations and a confirmation modal for safe delete actions.
- **UX polish:** Replaced browser alerts with custom modals, added `react-toastify` toasts, and introduced `LoadingSkeleton` for smoother loading transitions.

### Activity Page

The Activity Log was improved for clarity, usability, and maintainability:

- **Activity stats cards:** Summary cards for total actions plus create/update/delete counts.
- **Search, filters, and pagination:** Text search, action filters, and reusable `usePagination` support for larger logs.
- **Refactor and polish:** Simplified activity message generation, adopted a cleaner Server/Client Component split, and aligned UI with shared patterns.

### Reports Page

A new Reports page was introduced to centralize app-wide statistics:

- **Reports dashboard:** Stats cards for total tasks, recent activity, completed tasks, and pending tasks, plus a pie chart for completion breakdown.
- **Single source of truth:** Tasks, Activity, and Reports now consume shared stats from `/api/reports` using reusable `StatsCard` components.
- **Real-time data freshness:** Smart cache invalidation/refetch keeps stats synced after create/update/delete operations without a full page refresh.
