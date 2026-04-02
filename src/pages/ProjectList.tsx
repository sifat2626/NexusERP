import data from "@/data/data.json";
import StatusBadge from "@/components/StatusBadge";
import BudgetBar from "@/components/BudgetBar";
import { useNavigate } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

const ProjectList = () => {
  const projects = data.company.projects;
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">All construction projects managed by {data.company.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map((p) => (
          <div
            key={p.projectId}
            className="stat-card cursor-pointer group hover:border-primary/20"
            onClick={() => navigate(`/projects/${p.projectId}`)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-base">{p.name}</h3>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{p.projectId}</p>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-3.5 h-3.5" />
                <span>{p.manager.name}</span>
                <span className="text-xs">• {p.manager.designation}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                <span>{p.timeline.startDate} → {p.timeline.endDate}</span>
              </div>
            </div>

            <BudgetBar spent={p.budget.spent} total={p.budget.total} />

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{p.tasks.length} task(s) · {p.teams.length} team(s)</span>
              <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all font-medium">
                View Details <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
