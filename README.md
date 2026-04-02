# NexusERP

A modern, professional Web ERP application designed for construction companies to manage projects, budgets, tasks, and approvals efficiently.

**Live Demo:** https://nexus-erp-omega.vercel.app/

## Overview

NexusERP is built for managers and project leads in the construction industry. The application provides real-time visibility into:

- **Projects** - Monitor active projects with status tracking and budget utilization
- **Budgets** - Track expenses across projects and budget categories
- **Tasks & Teams** - Manage work items organized by status with team assignments
- **Payments & Approvals** - Handle payment requests and approval workflows

## Features

### 📊 Dashboard

- Company overview with project statistics
- Total budget vs. spent aggregation
- Project health overview with quick summary cards
- Risk tracking and mitigation alerts

### 📁 Project Management

- Complete project list with filtering and search
- Detailed project information including timelines and milestones
- Budget breakdown by categories and sub-categories
- Task management with progress tracking
- Team member assignments and roles

### ✅ Task & Team Management

- Tasks organized by status (Not Started, In Progress, Completed)
- Priority-based filtering (High, Medium, Low)
- Team overview with member details and roles
- Progress indicators for all work items

### 💰 Payments & Approvals

- Payment request tracking with approval status
- Invoice and bill management
- Approval workflow details (Requested by, Approved by)
- Amount and date tracking for all transactions

## Design Highlights

- **Light & Dark Mode** - Full theme support for different working conditions
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Data-Driven UI** - Visual indicators, progress bars, and status badges
- **Business-Focused** - Clean, readable interface built for non-technical users
- **Helpful Tooltips** - Contextual help available throughout the application

## Technology Stack

- **React** - Frontend framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Router** - Navigation and routing
- **Lucide React** - Icon library
- **Recharts** - Data visualization

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd NexusERP

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Application Structure

```
src/
├── pages/              # Main application pages
│   ├── Dashboard.tsx
│   ├── ProjectList.tsx
│   ├── ProjectDetails.tsx
│   ├── TasksTeams.tsx
│   └── PaymentsApprovals.tsx
├── components/         # Reusable UI components
├── data/              # Application data
└── index.css          # Global styles with theme variables
```

## Theme Customization

The application supports light and dark modes. Theme preferences are automatically saved to browser localStorage. Customize colors in `src/index.css`:

- Light Mode: Default professional colors optimized for daytime use
- Dark Mode: Eye-friendly colors optimized for evening work

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

All rights reserved.
