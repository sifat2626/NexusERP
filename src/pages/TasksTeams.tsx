import data from "@/data/data.json";
import StatusBadge from "@/components/StatusBadge";
import { Users, ListChecks } from "lucide-react";

const TasksTeams = () => {
  const projects = data.company.projects;

  // Collect all tasks with project info
  const allTasks = projects.flatMap((p) =>
    p.tasks.map((t) => ({ ...t, projectName: p.name, projectId: p.projectId }))
  );

  // Group by progress status
  const completed = allTasks.filter((t) => t.progress === 100);
  const inProgress = allTasks.filter((t) => t.progress > 0 && t.progress < 100);
  const notStarted = allTasks.filter((t) => t.progress === 0);

  const groups = [
    { label: "In Progress", tasks: inProgress, color: "border-l-info" },
    { label: "Not Started", tasks: notStarted, color: "border-l-warning" },
    { label: "Completed", tasks: completed, color: "border-l-success" },
  ];

  // All teams
  const allTeams = projects.flatMap((p) =>
    p.teams.map((t) => ({ ...t, projectName: p.name }))
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tasks & Teams</h1>
        <p className="page-subtitle">All tasks grouped by status and team assignments across projects</p>
      </div>

      {/* Tasks grouped by status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {groups.map((group) => (
          <div key={group.label}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
              <ListChecks className="w-4 h-4" />
              {group.label} ({group.tasks.length})
            </h2>
            <div className="space-y-3">
              {group.tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No tasks</p>
              ) : (
                group.tasks.map((task) => (
                  <div key={task.taskId} className={`stat-card border-l-4 ${group.color}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-sm">{task.title}</h3>
                      <StatusBadge status={task.priority} />
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{task.projectName}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Users className="w-3 h-3" />
                      {task.assignedTeam}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${task.progress === 100 ? "bg-success" : "bg-info"}`} style={{ width: `${task.progress}%` }} />
                      </div>
                      <span className="text-xs font-semibold">{task.progress}%</span>
                    </div>
                    {/* Subtasks */}
                    {task.subTasks.length > 0 && (
                      <div className="mt-2 pt-2 border-t space-y-1">
                        {task.subTasks.map((st) => (
                          <div key={st.subTaskId} className="flex justify-between text-xs text-muted-foreground">
                            <span>{st.title}</span>
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

      {/* Teams overview */}
      <div className="stat-card">
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <Users className="w-4 h-4" /> All Teams
        </h2>
        {allTeams.length === 0 ? (
          <p className="text-sm text-muted-foreground">No teams assigned</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTeams.map((team) => (
              <div key={team.teamId} className="p-4 rounded-lg border bg-muted/30">
                <h3 className="font-medium text-sm">{team.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{team.projectName}</p>
                <div className="space-y-2">
                  {team.members.map((member, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="font-medium">{member.name}</span>
                      <span className="text-muted-foreground">{member.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksTeams;
