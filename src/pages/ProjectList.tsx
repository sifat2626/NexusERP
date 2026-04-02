import { useState } from "react";
import data from "@/data/data.json";
import StatusBadge from "@/components/StatusBadge";
import BudgetBar from "@/components/BudgetBar";
import { useNavigate } from "react-router-dom";
import { Calendar, User, ArrowUpRight, FolderKanban, Filter, X } from "lucide-react";

type StatusFilter = string | "All";

const ProjectList = () => {
  const projects = data.company.projects;
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("All");

  /* Get unique statuses from data */
  const statuses = Array.from(new Set(projects.map((p) => p.status)));

  /* Filtered list */
  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.status === activeFilter);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <FolderKanban className="w-3.5 h-3.5 text-primary" />
          <span>Project Management</span>
        </div>
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">All construction projects managed by {data.company.name}</p>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </div>

        {/* All pill */}
        <button
          onClick={() => setActiveFilter("All")}
          className={`filter-pill ${activeFilter === "All" ? "active" : ""}`}
        >
          <span>All</span>
          <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
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
                s === "In Progress" ? "bg-info"
                : s === "Completed"  ? "bg-success"
                : s === "Planning"   ? "bg-warning"
                : "bg-muted-foreground"
              }`}
            />
            <span>{s}</span>
            <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
              {projects.filter((p) => p.status === s).length}
            </span>
          </button>
        ))}

        {/* Clear filter (shown when not "All") */}
        {activeFilter !== "All" && (
          <button
            onClick={() => setActiveFilter("All")}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors duration-150 ml-1 animate-pop"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}

        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} of {projects.length} projects
        </span>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mb-3">
            <FolderKanban className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="font-semibold">No projects match this filter</p>
          <p className="text-sm text-muted-foreground mt-1">Try selecting a different status.</p>
          <button
            onClick={() => setActiveFilter("All")}
            className="mt-4 text-xs text-primary hover:underline"
          >
            Show all projects
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
                  <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{p.projectId}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>

              {/* Meta info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-5 h-5 rounded-md bg-muted/60 flex items-center justify-center shrink-0">
                    <User className="w-3 h-3" />
                  </div>
                  <span className="font-medium text-foreground/70 truncate">{p.manager.name}</span>
                  <span className="text-muted-foreground/50 shrink-0">· {p.manager.designation}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-primary/60" />
                    {p.tasks.length} tasks
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-accent/60" />
                    {p.teams.length} teams
                  </span>
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
                  Open <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
