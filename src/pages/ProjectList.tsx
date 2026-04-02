import { useState } from "react"
import data from "@/data/data.json"
import StatusBadge from "@/components/StatusBadge"
import BudgetBar from "@/components/BudgetBar"
import HelpTooltip from "@/components/HelpTooltip"
import SearchBar from "@/components/SearchBar"
import Breadcrumbs from "@/components/Breadcrumbs"
import { useNavigate } from "react-router-dom"
import {
  Calendar,
  User,
  ArrowUpRight,
  FolderKanban,
  Filter,
  X,
} from "lucide-react"

type StatusFilter = string | "All"

const ProjectList = () => {
  const projects = data.company.projects
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("All")
  const [searchQuery, setSearchQuery] = useState("")

  /* Get unique statuses from data */
  const statuses = Array.from(new Set(projects.map((p) => p.status)))

  /* Apply filters and search */
  let filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.status === activeFilter)

  /* Apply search filter */
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.projectId.toLowerCase().includes(query) ||
        p.manager.name.toLowerCase().includes(query),
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Projects" }]} />

      {/* Header */}
      <div className="page-header">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <FolderKanban className="w-3.5 h-3.5 text-primary" />
          <span>Project Management</span>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="page-title">All Projects</h1>
          <HelpTooltip content="Browse all construction projects. Use filters to find specific projects by status, or use the search box to find projects by name." />
        </div>
        <p className="page-subtitle">
          Browse and manage all construction projects for {data.company.name}
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar
        placeholder="Search by project name, ID, or manager..."
        onSearch={setSearchQuery}
        className="max-w-md"
      />

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter by status:</span>
        </div>

        {/* All pill */}
        <button
          onClick={() => setActiveFilter("All")}
          className={`filter-pill ${activeFilter === "All" ? "active" : ""}`}
        >
          <span>All</span>
          <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
            {projects.length}
          </span>
        </button>

        {/* Status pills */}
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setActiveFilter(s)}
            className={`filter-pill ${activeFilter === s ? "active" : ""}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                s === "In Progress"
                  ? "bg-info"
                  : s === "Completed"
                    ? "bg-success"
                    : s === "Planning"
                      ? "bg-warning"
                      : "bg-muted-foreground"
              }`}
            />
            <span>{s}</span>
            <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
              {projects.filter((p) => p.status === s).length}
            </span>
          </button>
        ))}

        {/* Clear filter (shown when not "All") */}
        {activeFilter !== "All" && (
          <button
            onClick={() => setActiveFilter("All")}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors duration-150 ml-1 animate-pop"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}

        <span className="text-sm text-muted-foreground basis-full sm:basis-auto sm:ml-auto">
          Showing {filtered.length} of {projects.length} project
          {projects.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mb-3">
            <FolderKanban className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="font-semibold text-lg">No projects found</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            {searchQuery
              ? `No projects match "${searchQuery}". Try a different search term.`
              : "No projects match this status filter. Try selecting a different status."}
          </p>
          <button
            onClick={() => {
              setActiveFilter("All")
              setSearchQuery("")
            }}
            className="mt-4 px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Project Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <div
              key={p.projectId}
              className="stat-card gradient-border cursor-pointer group animate-slide-up"
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => navigate(`/projects/${p.projectId}`)}
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0 pr-3">
                  <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200">
                    {p.name}
                  </h3>
                </div>
                <StatusBadge status={p.status} />
              </div>

              {/* Meta info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-md bg-muted/60 flex items-center justify-center shrink-0">
                    <User className="w-3 h-3" />
                  </div>
                  <span className="font-medium text-foreground/70 truncate">
                    {p.manager.name}
                  </span>
                  <span className="text-muted-foreground/50 shrink-0 hidden sm:inline">
                    · {p.manager.designation}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-md bg-muted/60 flex items-center justify-center shrink-0">
                    <Calendar className="w-3 h-3" />
                  </div>
                  <span>{p.timeline.startDate}</span>
                  <span className="text-primary font-bold">→</span>
                  <span>{p.timeline.endDate}</span>
                </div>
              </div>

              {/* Budget bar */}
              <BudgetBar spent={p.budget.spent} total={p.budget.total} />

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-primary/60" />
                    {p.tasks.length} tasks
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-accent/60" />
                    {p.teams.length} teams
                  </span>
                </div>
                <span className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
                  View Details <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectList
