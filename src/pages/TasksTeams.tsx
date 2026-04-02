import { useState } from "react"
import data from "@/data/data.json"
import StatusBadge from "@/components/StatusBadge"
import ProgressBar from "@/components/ProgressBar"
import {
  Users,
  ListChecks,
  CheckCircle2,
  Clock,
  Circle,
  ChevronRight,
  Filter,
  X,
} from "lucide-react"

type PriorityFilter = "All" | string

const TasksTeams = () => {
  const projects = data.company.projects
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("All")

  const allTasks = projects.flatMap((p) =>
    p.tasks.map((t) => ({ ...t, projectName: p.name, projectId: p.projectId })),
  )

  /* Unique priorities */
  const priorities = Array.from(new Set(allTasks.map((t) => t.priority)))

  /* Apply priority filter first */
  const filteredTasks =
    priorityFilter === "All"
      ? allTasks
      : allTasks.filter((t) => t.priority === priorityFilter)

  const completed = filteredTasks.filter((t) => t.progress === 100)
  const inProgress = filteredTasks.filter(
    (t) => t.progress > 0 && t.progress < 100,
  )
  const notStarted = filteredTasks.filter((t) => t.progress === 0)

  const groups = [
    {
      label: "In Progress",
      tasks: inProgress,
      accentColor: "text-info",
      barColor: "from-info to-info/60",
      borderLeft: "border-l-info",
      icon: Clock,
      iconBg: "bg-info/10",
      headerBg: "from-info/10 to-transparent",
    },
    {
      label: "Not Started",
      tasks: notStarted,
      accentColor: "text-muted-foreground",
      barColor: "from-muted-foreground to-muted-foreground/60",
      borderLeft: "border-l-border",
      icon: Circle,
      iconBg: "bg-muted/50",
      headerBg: "from-muted/30 to-transparent",
    },
    {
      label: "Completed",
      tasks: completed,
      accentColor: "text-success",
      barColor: "from-success to-success/60",
      borderLeft: "border-l-success",
      icon: CheckCircle2,
      iconBg: "bg-success/10",
      headerBg: "from-success/10 to-transparent",
    },
  ]

  const allTeams = projects.flatMap((p) =>
    p.teams.map((t) => ({ ...t, projectName: p.name })),
  )

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <ListChecks className="w-3.5 h-3.5 text-primary" />
          <span>Work Management</span>
        </div>
        <h1 className="page-title">Tasks & Teams</h1>
        <p className="page-subtitle">
          All tasks grouped by status and team assignments across projects
        </p>
      </div>

      {/* Priority filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Priority:</span>
        </div>

        <button
          onClick={() => setPriorityFilter("All")}
          className={`filter-pill ${priorityFilter === "All" ? "active" : ""}`}
        >
          All
          <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
            {allTasks.length}
          </span>
        </button>

        {priorities.map((pr) => {
          const dotColor =
            pr === "High"
              ? "bg-destructive"
              : pr === "Medium"
                ? "bg-warning"
                : pr === "Low"
                  ? "bg-info"
                  : "bg-muted-foreground"
          return (
            <button
              key={pr}
              onClick={() => setPriorityFilter(pr)}
              className={`filter-pill ${priorityFilter === pr ? "active" : ""}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
              {pr}
              <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                {allTasks.filter((t) => t.priority === pr).length}
              </span>
            </button>
          )
        })}

        {priorityFilter !== "All" && (
          <button
            onClick={() => setPriorityFilter("All")}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors duration-150 ml-1 animate-pop"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}

        <span className="basis-full sm:basis-auto sm:ml-auto text-xs text-muted-foreground">
          {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up stagger-1">
        {groups.map((g) => (
          <div
            key={g.label}
            className="stat-card text-center group cursor-default"
          >
            <div
              className={`w-10 h-10 rounded-xl ${g.iconBg} flex items-center justify-center mx-auto mb-2 transition-transform duration-300 group-hover:scale-110`}
            >
              <g.icon className={`w-5 h-5 ${g.accentColor}`} />
            </div>
            <p className="text-2xl font-bold font-display">{g.tasks.length}</p>
            <p className="text-xs text-muted-foreground">{g.label}</p>
          </div>
        ))}
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-3">
            {/* Column header */}
            <div
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r ${group.headerBg} border border-border/50`}
            >
              <group.icon className={`w-4 h-4 ${group.accentColor}`} />
              <h2
                className={`text-sm font-semibold font-display ${group.accentColor}`}
              >
                {group.label}
              </h2>
              <span className="ml-auto text-xs bg-card border border-border rounded-full px-2 py-0.5 font-bold text-muted-foreground">
                {group.tasks.length}
              </span>
            </div>

            {/* Task cards */}
            <div className="space-y-3">
              {group.tasks.length === 0 ? (
                <div className="text-center py-10 rounded-xl border border-dashed border-border/60 bg-muted/10 animate-fade-in">
                  <p className="text-xs text-muted-foreground italic">
                    No tasks here
                  </p>
                </div>
              ) : (
                group.tasks.map((task, i) => (
                  <div
                    key={task.taskId}
                    className={`stat-card border-l-[3px] ${group.borderLeft} animate-slide-up hover:translate-x-0.5 transition-transform duration-200`}
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    {/* Task header */}
                    <div className="flex items-start justify-between mb-1.5">
                      <h3 className="font-semibold text-sm leading-snug flex-1 pr-2">
                        {task.title}
                      </h3>
                      <StatusBadge status={task.priority} />
                    </div>
                    <p className="text-[10px] text-muted-foreground mb-2 font-mono">
                      {task.projectName}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-3">
                      <Users className="w-3 h-3 shrink-0" />
                      <span>{task.assignedTeam}</span>
                    </div>

                    {/* Progress bar */}
                    <ProgressBar
                      value={task.progress}
                      gradient={group.barColor}
                      height="h-1.5"
                      delay={i * 60}
                      showPercent
                    />

                    {/* Subtasks */}
                    {task.subTasks.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-border/40 space-y-1.5">
                        {task.subTasks.map((st) => (
                          <div
                            key={st.subTaskId}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-1.5">
                              <ChevronRight className="w-2.5 h-2.5 text-muted-foreground/50 shrink-0" />
                              <span className="text-[10px] text-muted-foreground">
                                {st.title}
                              </span>
                            </div>
                            <StatusBadge status={st.status} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Teams Section */}
      <div className="stat-card gradient-border animate-slide-up stagger-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h2 className="text-base font-semibold font-display">All Teams</h2>
            <p className="text-xs text-muted-foreground">
              {allTeams.length} teams across {projects.length} projects
            </p>
          </div>
        </div>

        {allTeams.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No teams assigned
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allTeams.map((team, i) => (
              <div
                key={team.teamId}
                className="p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm truncate">
                      {team.name}
                    </h3>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {team.projectName}
                    </p>
                  </div>
                </div>
                <div className="space-y-1.5 pt-2.5 border-t border-border/40">
                  {team.members.map((member, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[9px] font-bold text-primary-foreground shrink-0">
                          {member.name.charAt(0)}
                        </div>
                        <span className="text-[11px] font-medium">
                          {member.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TasksTeams
