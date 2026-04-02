import { useParams, useNavigate } from "react-router-dom"
import data from "@/data/data.json"
import StatusBadge from "@/components/StatusBadge"
import BudgetBar, { formatCurrency } from "@/components/BudgetBar"
import ProgressBar from "@/components/ProgressBar"
import {
  ArrowLeft,
  Mail,
  Calendar,
  Users,
  CheckCircle2,
  Circle,
  FolderKanban,
  Target,
  ChevronRight,
} from "lucide-react"

const ProjectDetails = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const project = data.company.projects.find((p) => p.projectId === projectId)

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center">
          <FolderKanban className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">Project not found</p>
          <p className="text-sm text-muted-foreground mt-1">
            The project you're looking for doesn't exist.
          </p>
        </div>
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Back nav */}
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Projects
      </button>

      {/* Project header */}
      <div className="stat-card gradient-border">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="page-title break-words">{project.name}</h1>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-sm text-muted-foreground font-mono mb-3">
              {project.projectId}
            </p>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-background shrink-0">
                {project.manager.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">
                  {project.manager.name}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {project.manager.designation}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground w-full md:w-auto md:shrink-0">
            <div className="flex flex-wrap items-center gap-2 bg-muted/40 border border-border/50 px-3 py-2 rounded-lg">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>{project.timeline.startDate}</span>
              <span className="text-primary">→</span>
              <span>{project.timeline.endDate}</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/40 border border-border/50 px-3 py-2 rounded-lg min-w-0">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm truncate">{project.manager.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Budget + Milestones + Teams */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget breakdown */}
        <div className="lg:col-span-2 stat-card">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-6 rounded-lg bg-success/10 flex items-center justify-center">
              <Target className="w-3.5 h-3.5 text-success" />
            </div>
            <h2 className="text-base font-semibold font-display">
              Budget Breakdown
            </h2>
          </div>
          <BudgetBar
            spent={project.budget.spent}
            total={project.budget.total}
          />
          <div className="mt-5 space-y-3">
            {project.budget.categories.map((cat) => (
              <div
                key={cat.name}
                className="p-3 rounded-xl bg-muted/20 border border-border/40"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 mb-2">
                  <span className="font-medium text-sm break-words">
                    {cat.name}
                  </span>
                  <span className="text-sm text-muted-foreground sm:text-right">
                    {formatCurrency(cat.spent)} /{" "}
                    {formatCurrency(cat.allocated)}
                  </span>
                </div>
                <BudgetBar
                  spent={cat.spent}
                  total={cat.allocated}
                  showLabel={false}
                />
                {"subCategories" in cat && (cat as any).subCategories && (
                  <div className="mt-3 ml-2 sm:ml-4 space-y-2 pt-2 border-t border-border/30">
                    {(cat as any).subCategories.map((sub: any) => (
                      <div key={sub.name}>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-muted-foreground mb-1 gap-1">
                          <span className="flex items-center gap-1 break-words">
                            <ChevronRight className="w-2.5 h-2.5" /> {sub.name}
                          </span>
                          <span className="sm:text-right">
                            {formatCurrency(sub.spent)} /{" "}
                            {formatCurrency(sub.allocated)}
                          </span>
                        </div>
                        <BudgetBar
                          spent={sub.spent}
                          total={sub.allocated}
                          showLabel={false}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Milestones + Teams */}
        <div className="space-y-5">
          {/* Milestones */}
          <div className="stat-card">
            <h2 className="text-base font-semibold font-display mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" /> Milestones
            </h2>
            <div className="space-y-2">
              {project.timeline.milestones.map((m, i) => (
                <div
                  key={m.milestoneId}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {m.status === "Completed" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-success" />
                  ) : (
                    <Circle className="w-4 h-4 shrink-0 text-muted-foreground" />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-medium break-words">{m.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teams */}
          <div className="stat-card">
            <h2 className="text-base font-semibold font-display mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" /> Teams
            </h2>
            {project.teams.length === 0 ? (
              <p className="text-sm text-muted-foreground">No teams assigned</p>
            ) : (
              <div className="space-y-3">
                {project.teams.map((team) => (
                  <div
                    key={team.teamId}
                    className="p-3 rounded-xl bg-muted/20 border border-border/40"
                  >
                    <p className="text-sm font-semibold mb-2">{team.name}</p>
                    <div className="space-y-1.5">
                      {team.members.map((member, j) => (
                        <div
                          key={j}
                          className="flex items-start justify-between gap-2 text-sm"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 flex items-center justify-center text-[9px] font-bold text-background">
                              {member.name.charAt(0)}
                            </div>
                            <span className="font-medium truncate">
                              {member.name}
                            </span>
                          </div>
                          <span className="text-muted-foreground text-right break-words">
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
      </div>

      {/* Tasks */}
      <div className="stat-card gradient-border">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-lg bg-info/10 flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-info" />
          </div>
          <h2 className="text-base font-semibold font-display">
            Tasks ({project.tasks.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.tasks.map((task, i) => (
            <div
              key={task.taskId}
              className="p-4 rounded-xl border border-border/50 bg-muted/10 hover:bg-muted/20 transition-all animate-slide-up"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm break-words">
                    {task.title}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    {task.taskId}
                  </p>
                </div>
                <StatusBadge status={task.priority} />
              </div>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1 break-words">
                <Users className="w-3 h-3" /> {task.assignedTeam}
              </p>
              {/* Progress */}
              <div className="mb-2">
                <ProgressBar
                  value={task.progress}
                  gradient={
                    task.progress === 100
                      ? "from-success to-success/70"
                      : "from-info to-primary"
                  }
                  height="h-1.5"
                  delay={i * 70}
                  showPercent
                />
              </div>
              {/* Subtasks */}
              {task.subTasks.length > 0 && (
                <div className="mt-2 pt-2 border-t border-border/30 space-y-1.5">
                  {task.subTasks.map((st) => (
                    <div
                      key={st.subTaskId}
                      className="flex items-center gap-2 text-sm"
                    >
                      {st.status === "Completed" ? (
                        <CheckCircle2 className="w-3 h-3 text-success shrink-0" />
                      ) : (
                        <Circle className="w-3 h-3 text-muted-foreground shrink-0" />
                      )}
                      <span
                        className={`break-words ${st.status === "Completed" ? "line-through text-muted-foreground" : "text-foreground/70"}`}
                      >
                        {st.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
