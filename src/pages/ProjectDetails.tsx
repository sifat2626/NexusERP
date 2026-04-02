import { useParams, useNavigate } from "react-router-dom";
import data from "@/data/data.json";
import StatusBadge from "@/components/StatusBadge";
import BudgetBar, { formatCurrency } from "@/components/BudgetBar";
import { ArrowLeft, Mail, Calendar, Users, CheckCircle2 } from "lucide-react";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = data.company.projects.find((p) => p.projectId === projectId);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg font-semibold">Project not found</p>
        <button onClick={() => navigate("/projects")} className="text-primary mt-2 text-sm">
          ← Back to projects
        </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate("/projects")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </button>

      {/* Header */}
      <div className="stat-card mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="page-title">{project.name}</h1>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-sm text-muted-foreground font-mono">{project.projectId}</p>
          </div>
          <div className="flex flex-col items-end text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {project.timeline.startDate} → {project.timeline.endDate}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Mail className="w-4 h-4" />
              {project.manager.email}
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="font-medium">Manager:</span>
          <span>{project.manager.name}</span>
          <span className="text-muted-foreground">({project.manager.designation})</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Budget breakdown */}
        <div className="lg:col-span-2 stat-card">
          <h2 className="text-base font-semibold mb-4">Budget Breakdown</h2>
          <BudgetBar spent={project.budget.spent} total={project.budget.total} />
          <div className="mt-5 space-y-4">
            {project.budget.categories.map((cat) => (
              <div key={cat.name} className="p-3 rounded-lg bg-muted/40 border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">{cat.name}</span>
                  <span className="text-xs text-muted-foreground">{formatCurrency(cat.spent)} / {formatCurrency(cat.allocated)}</span>
                </div>
                <BudgetBar spent={cat.spent} total={cat.allocated} showLabel={false} />
                {"subCategories" in cat && (cat as any).subCategories && (
                  <div className="mt-3 ml-4 space-y-2">
                    {(cat as any).subCategories.map((sub: any) => (
                      <div key={sub.name}>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>{sub.name}</span>
                          <span>{formatCurrency(sub.spent)} / {formatCurrency(sub.allocated)}</span>
                        </div>
                        <BudgetBar spent={sub.spent} total={sub.allocated} showLabel={false} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="stat-card">
          <h2 className="text-base font-semibold mb-4">Milestones</h2>
          <div className="space-y-3">
            {project.timeline.milestones.map((m) => (
              <div key={m.milestoneId} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border">
                <CheckCircle2 className={`w-5 h-5 shrink-0 ${m.status === "Completed" ? "text-success" : "text-muted-foreground"}`} />
                <div>
                  <p className="text-sm font-medium">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.status}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Teams */}
          <h2 className="text-base font-semibold mt-6 mb-4 flex items-center gap-2"><Users className="w-4 h-4" /> Teams</h2>
          {project.teams.length === 0 ? (
            <p className="text-sm text-muted-foreground">No teams assigned yet</p>
          ) : (
            <div className="space-y-3">
              {project.teams.map((team) => (
                <div key={team.teamId} className="p-3 rounded-lg bg-muted/40 border">
                  <p className="text-sm font-medium mb-2">{team.name}</p>
                  <div className="space-y-1">
                    {team.members.map((member, i) => (
                      <div key={i} className="flex justify-between text-xs text-muted-foreground">
                        <span>{member.name}</span>
                        <span>{member.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tasks */}
      <div className="stat-card">
        <h2 className="text-base font-semibold mb-4">Tasks</h2>
        <div className="space-y-4">
          {project.tasks.map((task) => (
            <div key={task.taskId} className="p-4 rounded-lg border bg-muted/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-sm">{task.title}</h3>
                  <StatusBadge status={task.priority} />
                </div>
                <span className="text-xs text-muted-foreground font-mono">{task.taskId}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                <span>Team: {task.assignedTeam}</span>
              </div>
              {/* Progress */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${task.progress === 100 ? "bg-success" : "bg-info"}`} style={{ width: `${task.progress}%` }} />
                </div>
                <span className="text-xs font-semibold">{task.progress}%</span>
              </div>
              {/* Subtasks */}
              {task.subTasks.length > 0 && (
                <div className="mt-3 ml-4 space-y-1">
                  {task.subTasks.map((st) => (
                    <div key={st.subTaskId} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${st.status === "Completed" ? "text-success" : "text-muted-foreground"}`} />
                      <span>{st.title}</span>
                      <span className="ml-auto">{st.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
