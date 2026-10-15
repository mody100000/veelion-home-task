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

## UX Issues

### 5) Error and loading states were visually inconsistent

- **What is wrong:** Different sections had ad-hoc spacing and text hierarchy.
- **Why it matters:** Inconsistent UI feedback reduces trust and readability.
- **improvement:** Use consistent card, button, and muted text patterns with shared classes.

## Code Quality / React Best Practices

### 7) Styling concerns mixed into component logic

- **What is wrong:** Layout details were embedded directly in JSX inline style objects.
- **Why it matters:** Blurs logic/presentation boundaries and complicates component reuse.
- **improvement:** Keep components focused on behavior/state while using shared style primitives.
