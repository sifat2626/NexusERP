# NexusERP Page Builder

React frontend assessment project for Tanvir Constructions Limited.

## Assessment Context

This repository contains the Round 1 engineering assessment submission for the Junior Frontend Engineer role.

Assessment window:

- Start: 02 April, 2026, 1:00 PM
- Deadline: 02 April, 2026, 11:59 PM

Key constraints followed:

- Built with ReactJS
- Data-driven UI using the provided JSON only
- 5 ERP pages implemented
- Business-friendly layout and navigation

## Project Overview

NexusERP is a multi-page ERP interface designed for construction operations.

The app provides:

- Cross-page navigation with a sidebar
- Dashboard KPIs and project health visibility
- Project list with filtering
- Project details with budgets, milestones, teams, and tasks
- Task and team management views
- Payment and approvals workflow views
- Dark mode by default
- Responsive behavior across mobile, tablet, laptop, and desktop

## Technology Stack

- React 18
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Lucide Icons
- TanStack Query (provider-ready)

## Data Source

All UI is rendered from:

- src/data/data.json

No external or additional JSON datasets are used.

## Pages Delivered

1. Dashboard
2. Project List
3. Project Details
4. Tasks and Teams
5. Payments and Approvals

## Routing

- /
- /projects
- /projects/:projectId
- /tasks
- /payments

## Responsive Coverage

The interface was tested and optimized for major widths:

- 320px to 374px: Small mobile
- 375px to 767px: Standard mobile
- 768px to 1023px: Tablet
- 1024px to 1279px: Laptop
- 1280px and above: Desktop and large desktop

Responsive decisions implemented:

- Mobile drawer sidebar with overlay and route-auto-close
- Desktop fixed sidebar from medium breakpoints and above
- Adaptive content paddings for small, medium, and large screens
- Wrapped filter bars and status summaries on narrow widths
- Horizontal scroll containers for dense tables
- Card section rows converted to stacked layouts on mobile where needed
- Truncation and word wrapping for long values such as emails and titles

## Dark Mode

- Dark mode is the default on first load
- Theme choice is persisted in local storage
- Theme toggle is available in the app header

## Getting Started

Prerequisites:

- Node.js 18+
- npm

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Run tests:

```bash
npm run test
```

## Deployment

This project is configured for SPA deployment on Vercel.

Files involved:

- vercel.json
- vite.config.ts

Deployment notes:

- Static files are resolved first
- Non-file routes are redirected to index.html for client routing

## Project Structure

High-level folders:

- src/components: reusable UI and layout building blocks
- src/pages: page-level screens
- src/data: assessment JSON data source
- src/hooks: custom hooks including theme handling
- src/test: test setup and examples

## Quality Notes

- Production build passes successfully
- Layout behavior validated for key breakpoints
- SPA route handling configured for live deployment parity

## Manual Visual QA Checklist

Run this checklist before final submission:

1. Open DevTools device mode and test widths: 320, 375, 768, 1024, 1280, 1440.
2. On 320 and 375:
   - Open and close sidebar drawer from header menu.
   - Confirm overlay appears and background does not scroll.
   - Navigate all 5 pages and confirm drawer auto-closes after route change.
3. On all pages:
   - Check that no text is clipped unexpectedly.
   - Verify there is no horizontal page overflow.
4. On table sections:
   - Confirm table containers scroll horizontally where needed.
   - Ensure key values remain readable at smallest width.
5. On cards and badges:
   - Verify status badges, long names, and dates wrap or truncate without overlap.
6. Theme behavior:
   - Confirm dark mode is default on first load.
   - Toggle theme and refresh to verify persistence.
7. Deployment check:
   - Open deep links directly (for example /projects, /tasks, /payments) to confirm SPA routing works in live environment.

## Submission Checklist

- 5 required pages delivered
- Uses provided JSON data source
- Public GitHub repository with detailed README
- Optional live hosting can be added
- Optional short demo video and screenshots can be added to the repository

## Contact Note

If this project is reviewed after deadline, please rely on commit timestamps to validate submission-time compliance.
